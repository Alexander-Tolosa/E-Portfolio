import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/global/Navbar";
import { Footer } from "@/components/global/Footer";
import { ThemeProvider } from "@/context/ThemeContext";
import { SoundProvider } from "@/context/SoundContext";
import { HoverSoundProvider } from "@/components/providers/HoverSoundProvider";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alexander Tolosa | Front-End Developer Portfolio",
  description:
    "Explore Alexander Tolosa's developer portfolio showcasing premium full-stack web applications, robust backends, and responsive user experiences.",
  keywords: [
    "Alexander Tolosa",
    "Software Engineer",
    "Front-End Developer",
    "Iloilo Philippines",
    "Portfolio",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico?v=2", sizes: "any" },
      { url: "/icon.png?v=2", type: "image/png" },
    ],
    shortcut: "/favicon.ico?v=2",
    apple: "/apple-touch-icon.png?v=2",
  },
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
    <html lang="en" className={`${outfit.variable} scroll-smooth dark`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico?v=2" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=2" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=2" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=2" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="bg-brand-dark text-foreground min-h-screen flex flex-col justify-between selection:bg-black/20 dark:selection:bg-white/20 antialiased transition-colors duration-300">
        <ThemeProvider>
          <SoundProvider>
            <HoverSoundProvider>
              <Navbar />
              <main className="flex-grow">{children}</main>
              <Footer />
            </HoverSoundProvider>
          </SoundProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
