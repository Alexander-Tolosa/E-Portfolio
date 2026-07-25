import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/global/Navbar";
import { Footer } from "@/components/global/Footer";
import { ThemeProvider } from "@/context/ThemeContext";

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

const themeScript = `
  (function() {
    try {
      var storedTheme = localStorage.getItem('theme');
      var supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (storedTheme === 'dark' || (!storedTheme && supportDarkMode)) {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      } else if (storedTheme === 'light') {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
      } else {
        document.documentElement.classList.add('dark');
      }
    } catch (e) {}
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} scroll-smooth dark`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="bg-brand-dark text-foreground min-h-screen flex flex-col justify-between selection:bg-black/20 dark:selection:bg-white/20 antialiased transition-colors duration-300">
        <ThemeProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
