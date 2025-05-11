import type { Metadata } from "next";
import { Hahmlet } from 'next/font/google';
import "./globals.css";

const inter = Hahmlet({
  subsets: ['latin'],
  variable: '--hahmlet-text',
  weight: "400",
  style:"normal"
})

export const metadata: Metadata = {
  title:{
    template:"%s | Karrot Market",
    default:"Karrot Market",
  },
  description: "Sell and buy all the things",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="h-full" lang="ko">
     <body
        className={`${inter.className} bg-gray-900 text-white antialiased h-full `}
        >
          <main className="max-w-md mx-auto min-h-screen bg-black">
        {children}
        </main>
      </body>
    </html>
  );
}
