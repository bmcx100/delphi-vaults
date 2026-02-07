import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const dmSans = DM_Sans({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-body",
});

const dmSansDisplay = DM_Sans({
  weight: ['500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "DELPHI - Sustainable Yield, Simplified",
  description: "Earn competitive returns on your digital assets through transparent, institutional-grade yield strategies.",
  icons: {
    icon: [
      { url: '/images/Delphi Logo Icon.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/Delphi Logo Icon.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: { url: '/images/Delphi Logo Icon.png', sizes: '180x180', type: 'image/png' },
    shortcut: { url: '/images/Delphi Logo Icon.png', type: 'image/png' },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSansDisplay.variable} ${dmSans.variable} antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
