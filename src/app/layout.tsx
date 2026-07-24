import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/global/Navbar";
import { Footer } from "@/components/global/Footer";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alexander Tolosa | Full-Stack Software Engineer Portfolio",
  description:
    "Explore Alexander Tolosa's developer portfolio showcasing premium full-stack web applications, robust backends, and responsive user experiences.",
  keywords: [
    "Alexander Tolosa",
    "Software Engineer",
    "Full-Stack Developer",
    "Iloilo Philippines",
    "Portfolio",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} scroll-smooth`}>
      <body className="bg-brand-dark text-foreground min-h-screen flex flex-col justify-between selection:bg-white/20 selection:text-white antialiased">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
