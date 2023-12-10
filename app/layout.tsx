import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/app/ui/globals.css'
import { quicksand } from "./ui/fonts";

export const metadata: Metadata = {
  title: 'Relief Hub: Home',
  description: 'Relief Hub: Natural Disaster Recovery Management App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <html lang="en">
          <body
              className={`${quicksand.className} font-medium antialiased text-gray-700`}
          >
              {children}
          </body>
      </html>
  );
}
