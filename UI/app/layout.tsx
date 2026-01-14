import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LayoutProps } from "@/types/layout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_TITLE || "App Title",
  description: process.env.NEXT_PUBLIC_APP_DESCRIPTION || "App Description",
};

export default function RootLayout({
  children,
}: LayoutProps) {

  return (
    <html lang="en">
      <body
        className={`
          ${geistSans.variable} ${geistMono.variable} antialiased`
        }
      >
        {children} 
      </body>
    </html>
  );
}
