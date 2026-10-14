import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Outfit, Tiro_Devanagari_Marathi } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";

const tiro = Tiro_Devanagari_Marathi({
  subsets: ["devanagari", "latin"],
  weight: "400",
  variable: "--font-tiro",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "अपूर्वाच्या डोहाळे जेवण | Apoorva Baby Shower",
  description:
    "अपूर्वा आणि विवेक यांच्या डोहाळे जेवण सोहळ्याचे स्नेहपूर्वक निमंत्रण. गुरुवार, २९ ऑक्टोबर २०२६.",
  applicationName: "apurwa-babyshower",
  authors: [{ name: "APPVIK" }],
  openGraph: {
    title: "अपूर्वाच्या डोहाळे जेवण सोहळ्याचे निमंत्रण",
    description: "दोन हृदयांच्या सुंदर प्रवासात आता एका छोट्या जीवाच्या आगमनाची चाहूल…",
    images: ["/images/couple.png"],
    locale: "mr_IN",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#F4EADC",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mr" suppressHydrationWarning>
      <body className={`${tiro.variable} ${cormorant.variable} ${outfit.variable} antialiased`}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
