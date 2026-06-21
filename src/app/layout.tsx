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

import { Providers } from "@/providers";

/**
 * RootLayout — The root application layout that wraps all pages.
 * Injects global providers, fonts, and the Content-Security-Policy meta tag.
 *
 * SECURITY: Content-Security-Policy is enforced via both HTTP headers (next.config.ts)
 * and meta tag (defense-in-depth). All user input and AI-generated output is rendered
 * to the DOM using textContent or innerText. innerHTML is NEVER used for dynamic content.
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child routes to render
 * @returns {JSX.Element} The HTML and Body structure wrapping the application
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* SECURITY: Content-Security-Policy meta tag for defense-in-depth */}
        <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; connect-src 'self' https://api.anthropic.com; img-src 'self' data:;" />
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

