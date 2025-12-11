import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./../styles/globals.css";
import ThemeWrapper from "../components/ThemeWrapper"; // Import the new ThemeWrapper

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Todo App MVP",
  description: "A Next.js Todo App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeWrapper>
          {children}
        </ThemeWrapper>
      </body>
    </html>
  );
}

