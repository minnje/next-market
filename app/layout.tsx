import type { Metadata } from "next";
// import { Roboto, Rubik_Scribble } from "next/font/google";
// import localFont from "next/font/local";
import "./globals.css";

export const metadata: Metadata = {
     title: {
          template: "%s | Next Market",
          default: "Next Market",
     },
     description: "by create next app",
};

export default function RootLayout({
     children,
}: Readonly<{
     children: React.ReactNode;
}>) {
     return (
          <html lang="en">
               <body
                    suppressHydrationWarning
                    className={` bg-neutral-900 text-white max-w-screen-sm mx-auto`}
               >
                    {children}
               </body>
          </html>
     );
}
