import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import { userCredentialsSchema } from "@/zod/validationSchema";
import prisma from "../../prismaClient";
import bcrypt from "bcrypt";
const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "username",
      credentials: {
        phone: {
          label: "Phone number",
          type: "text",
          placeholder: "123123123",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "*******",
        },
      },
      //TODO: USER CREDENTIAL TYPE FROM NEXT-AUTH
      async authorize(credentials: any) {
        // Do zod validation, OTP validation here
        // const validation = userCredentialsSchema.safeParse(credentials);
        const hashedPassword = await bcrypt.hash(credentials.password, 10);
        // if (!validation.success) return null;
        try {
          const existingUser = await prisma.user.findFirst({
            where: {
              number: credentials.phone,
            },
          });
          if (existingUser) {
            const passwordValidation = await bcrypt.compare(
              credentials.password,
              existingUser.password
            );
            if (passwordValidation) {
              console.log({
                id: existingUser.id.toString(),
                name: existingUser.name,
                email: existingUser.number,
              });
              return {
                id: existingUser.id.toString(),
                name: existingUser.name,
                email: existingUser.number,
              };
            }
            return null;
          } else {
            const user = await prisma.user.create({
              data: {
                number: credentials.phone,
                password: hashedPassword,
                balance: {
                  create: {
                    locked: 0,
                    amount: 0,
                  },
                },
              },
            });
            console.log({
              id: user.id.toString(),
              name: user.name,
              email: user.number,
            });
            return {
              id: user.id.toString(),
              name: user.name,
              email: user.number,
            };
          }
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    // TODO: can u fix the type here? Using any is bad
    async session({ token, session }: any) {
      session.user.id = token.sub;

      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    //error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
};
export default authOptions;
