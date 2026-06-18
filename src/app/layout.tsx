import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/layout/Navbar";

import type { Metadata } from "next";

import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
    title: "Second Brain",
    description: "",
};

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={cn("h-full", "antialiased", "font-sans", geist.variable)}
        >
            <body className="min-h-full flex flex-col">
                <ClerkProvider>
                    <Navbar />
                    {children}
                </ClerkProvider>
            </body>
        </html>
    );
}
