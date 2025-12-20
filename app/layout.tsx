import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lucas-Adebayo Daniel | Full-Stack Developer & AI Engineer",
  description: "Building intelligent solutions for real-world problems. Full-Stack Developer and AI Engineer specializing in Next.js, TypeScript, and LLM integration.",
  keywords: ["Full-Stack Developer", "AI Engineer", "Next.js", "TypeScript", "LangGraph", "Nigeria"],
  authors: [{ name: "Lucas-Adebayo Daniel" }],
  creator: "Lucas-Adebayo Daniel",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://lucasadebayo.dev",
    title: "Lucas-Adebayo Daniel | Full-Stack Developer & AI Engineer",
    description: "Building intelligent solutions for real-world problems",
    siteName: "Lucas-Adebayo Daniel",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lucas-Adebayo Daniel | Full-Stack Developer & AI Engineer",
    description: "Building intelligent solutions for real-world problems",
    creator: "@LucasAdebayoDa2",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" sizes="any" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
