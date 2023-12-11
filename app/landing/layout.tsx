import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/app/ui/globals.css';
import { quicksand } from '../ui/fonts';
import Header from '../ui/landingPage/header';
import Footer from '../ui/landingPage/footer';

export const metadata: Metadata = {
  title: 'Relief Hub: Home',
  description: 'Relief Hub: Natural Disaster Recovery Management App',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="main relative overflow-hidden bg-blue-50">
        <Header />
        {children}
        {/* <Footer /> */}
      </div>
    </>
  );
}
