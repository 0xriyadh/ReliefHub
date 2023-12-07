import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { quicksand } from "./ui/fonts";

const inter = Inter({ subsets: ['latin'] })

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
              className={`${quicksand.className} font-medium antialiased secondary-color-700`}
          >
              {children}
          </body>
      </html>
  );
}
