import type { Metadata } from "next";
import { Orbitron, Chakra_Petch, JetBrains_Mono } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { APP_NAME, APP_URL } from "@/lib/constants";
import "./globals.css";

const brand = Orbitron({
  variable: "--font-brand",
  subsets: ["latin"],
  weight: ["500", "700"],
});

const body = Chakra_Petch({
  variable: "--font-body",
  subsets: ["latin", "thai"],
  weight: ["400", "500", "600", "700"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: `${APP_NAME} — API สร้าง PromptPay Fix QR ฟรี`,
    template: `%s · ${APP_NAME}`,
  },
  description:
    "API ฟรีสำหรับสร้าง PromptPay QR ที่ล็อกจำนวนเงิน จากเบอร์โทรหรือเลขบัตรประชาชน ไม่ต้องมี API key",
  openGraph: {
    title: `${APP_NAME} — API สร้าง PromptPay Fix QR ฟรี`,
    description:
      "สร้าง PromptPay Fix QR ผ่าน GET API ง่ายๆ ด้วยเบอร์หรือเลขบัตร + จำนวนเงิน",
    url: APP_URL,
    siteName: APP_NAME,
    type: "website",
    locale: "th_TH",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={`${brand.variable} ${body.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
