import type { Metadata } from "next";
import SessionWrapper from "@/components/sessionWrapper";
import "./globals.css";
import Header from "@/components/header";

export const metadata: Metadata = {
  title: "News Butler",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="en" className="h-full">
        <body
          className="h-full flex flex-col relative gradient-background"
        >
          <Header/>
          {children}
        </body>
      </html>
    </SessionWrapper>
  );
}
