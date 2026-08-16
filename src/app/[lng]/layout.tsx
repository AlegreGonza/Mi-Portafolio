import { Geist, Geist_Mono } from "next/font/google";
import { getDictionary } from "@/i18n/dictionaries/get-dictionary";
import ClientTitle from "@/components/ClientTitle";
import PageTransition from "@/components/PageTransition";
import Starfield from "./Starfield";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lng: string }>;
}

export async function generateMetadata({ params }: { params: Promise<{ lng: string }> }) {
  const { lng } = await params;
  const dict = await getDictionary(lng as "en" | "es");

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    icons: {
      icon: "/favicon.ico",
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { lng } = await params;
  const dict = await getDictionary(lng as "en" | "es");

  return (
    <html lang={lng} className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen relative bg-transparent`}>
        <Starfield />
        <ClientTitle title={dict.meta.title} />
        <PageTransition>
          {children}
        </PageTransition>
        <SpeedInsights />
      </body>
    </html>
  );
}