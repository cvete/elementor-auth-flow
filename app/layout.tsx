import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/lib/contexts/LanguageContext";
import { Providers } from "@/components/Providers";
import CookieConsent from "@/components/CookieConsent";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "tvstanici.net - Stream TV Channels Online",
  description: "Watch live TV channels and your favorite shows on tvstanici.net. Access premium streaming content anytime, anywhere.",
  keywords: ["TV streaming", "live TV", "online TV", "TV channels", "tvstanici"],
  authors: [{ name: "tvstanici.net" }],
  creator: "tvstanici.net",
  publisher: "tvstanici.net",
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'https://webtv.tvstanici.net'),
  openGraph: {
    title: "tvstanici.net - Stream TV Channels Online",
    description: "Watch live TV channels and your favorite shows online",
    url: "https://webtv.tvstanici.net",
    siteName: "tvstanici.net",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "tvstanici.net - Stream TV Channels Online",
    description: "Watch live TV channels and your favorite shows online",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/clappr@latest/dist/clappr.min.js" async></script>
        <script type="text/javascript" src="https://cdn.jsdelivr.net/clappr.level-selector/latest/level-selector.min.js" async></script>
      </head>
      <body className={inter.className}>
        <Providers>
          <LanguageProvider>
            <TooltipProvider>
              {children}
              <Toaster />
              <Sonner />
              <CookieConsent />
            </TooltipProvider>
          </LanguageProvider>
        </Providers>
      </body>
    </html>
  );
}
