import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientProvider from './components/ClientProvider'
import { OnboardingProvider } from "./context/OnboardingContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "vibe check mate",
  description: "Date smarter and safer. Find out sus vibes and red flags before you ever meet.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <OnboardingProvider>
          <ClientProvider>
            {children}
          </ClientProvider>
        </OnboardingProvider>
      </body>
    </html>
  );
}
