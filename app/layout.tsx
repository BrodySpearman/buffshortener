import type { Metadata } from "next";
import { Inconsolata, Duru_Sans } from "next/font/google";
import "./globals.css";
import SessionInit from "./components/session/session-init";

const inconsolata = Inconsolata({
  variable: "--font-inconsolata",
  subsets: ["latin"],
});

const duruSans = Duru_Sans({
  variable: "--font-duru-sans",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "B.U.F.F.",
  description: "A simple URL shortening tool.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={`${inconsolata.variable} ${duruSans.variable} antialiased`}>
        <SessionInit />
        {children}
      </body>
    </html>
  );
}
