import prisma from "../../../prismaClient";


export async function GET() {
    const users = await prisma.user.findMany()
   
    return Response.json({ users })
  }