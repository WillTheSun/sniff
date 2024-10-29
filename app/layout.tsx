import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientProvider from './components/ClientProvider'
import { OnboardingProvider } from "./context/OnboardingContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sniff",
  description: "Keep your dog safe. Scan food to check if it's safe for your furry friend to eat.",
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
