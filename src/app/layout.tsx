import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Professional, clean font matching design
import { MainSidebar } from "@/components/layout/MainSidebar";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LeadsCRM",
  description: "Professional CRM & Chat",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased bg-zinc-50 dark:bg-zinc-950 flex flex-row min-h-screen`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <MainSidebar />
          <main className="flex-1 ml-[60px] h-screen overflow-hidden">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
