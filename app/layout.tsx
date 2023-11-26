import Providers from "@/components/providers";
import "./globals.css";
import Header from "@/components/shared/header/Header";
import LeftBar from "@/components/shared/left-bar";
import { Inter } from "next/font/google";
import RealtimeUpdates from "@/components/realtime-updates";
import { RecordButton } from "@/components/specific/audio-recorder";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Audio Journal - Share your stories through your voice",
  description: "Share your stories through your voice",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-background text-foreground tracking-tight">
        <Providers>
          <RealtimeUpdates />
          <Header />
          <main className="max-w-screen-2xl mx-auto min-h-screen w-full flex">
            <LeftBar />
            <div className="w-full">{children}</div>
          </main>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
