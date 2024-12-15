import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/navbar";
import { ReactLenis} from "lenis/react";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const branch = localFont({
  src: "./fonts/66aa096afd7b6afca076f7cf_Branch.otf",
  variable: "--font-branch",
  weight: "100 900",
});
const degular = localFont({
  src: "./fonts/Degular/Degular-Semibold.otf",
  variable: "--font-Degular-Semibold",
  weight: "100 900",
});
const degularRegular = localFont({
  src: "./fonts/Degular/fonnts.com-DegularDemo-Regular.otf",
  variable: "--font-Degular-Meduim",
  weight: "100 900",
});
const degularLight = localFont({
  src: "./fonts/Degular/fonnts.com-DegularDemo-Light.otf",
  variable: "--font-Degular-Meduim",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Rakibul Islam | Brand & Web Designer",
  description:
    "I am a digital-first branding frontend designer, enabling companies to connect with their audience, extend their reach and enjoy greater commercial success.",
  icons: [{ rel: "icon", url: "/metadata.png" }],  
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${branch.variable} ${degular.variable} ${degularRegular} ${degularLight} antialiased`}
      >
        <Navbar />

        <ReactLenis root options={{ autoRaf: true }}>
          {children}
          
        </ReactLenis>
      </body>
    </html>
  );
}
