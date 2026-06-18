import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "EcoSphere AI — AI-Powered Carbon Footprint Awareness",
    template: "%s | EcoSphere AI",
  },
  description:
    "Track, understand, and reduce your carbon footprint with AI-powered insights, gamification, personalized sustainability coaching, and community engagement.",
  keywords: [
    "carbon footprint",
    "sustainability",
    "AI",
    "eco-friendly",
    "climate change",
    "green living",
    "carbon calculator",
  ],
  authors: [{ name: "EcoSphere AI Team" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "EcoSphere AI",
    title: "EcoSphere AI — AI-Powered Carbon Footprint Awareness",
    description:
      "Track, understand, and reduce your carbon footprint with AI-powered insights.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0e1117",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  );
}
