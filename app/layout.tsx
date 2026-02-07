import type { Metadata } from "next";
import { Crimson_Text, DM_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const crimsonText = Crimson_Text({
  weight: ['400', '600', '700'],
  subsets: ["latin"],
  variable: "--font-display",
});

const dmSans = DM_Sans({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "DELPHI - Sustainable Yield, Simplified",
  description: "Earn competitive returns on your digital assets through transparent, institutional-grade yield strategies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${crimsonText.variable} ${dmSans.variable} antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
