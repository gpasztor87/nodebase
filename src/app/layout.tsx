import { Geist, Geist_Mono } from "next/font/google";

import { Provider } from "jotai";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import appConfig from "@/config/app.config";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";

import { rootMetadata } from "@/lib/root-meta";

import { TRPCReactProvider } from "@/trpc/client";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = rootMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={appConfig.language} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme={appConfig.theme}
          enableSystem
          disableTransitionOnChange
        >
          <TRPCReactProvider>
            <Provider>
              <NuqsAdapter>{children}</NuqsAdapter>
              <Toaster />
            </Provider>
          </TRPCReactProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
