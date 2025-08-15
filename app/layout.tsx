import type { Metadata } from "next";
// import { Roboto, Rubik_Scribble } from "next/font/google";
// import localFont from "next/font/local";
import "./globals.css";

export default function RootLayout({
     children,
}: Readonly<{
     children: React.ReactNode;
}>) {
     return (
          <html lang="en">
               <body
                    className={` bg-neutral-900 text-white max-w-screen-sm mx-auto`}
               >
                    {children}
               </body>
          </html>
     );
}
