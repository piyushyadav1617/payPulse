import "@repo/ui/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { RecoilProvider } from "../providers";
import AuthProvider from "./auth/provider";
import { ThemeProvider } from "./_components/theme-provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PayPulse",
  description: "A money wallet for fast and secure payments",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <AuthProvider>
        <RecoilProvider>
          <body className={inter.className}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </body>
        </RecoilProvider>
      </AuthProvider>
    </html>
  );
}
