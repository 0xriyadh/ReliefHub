import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import ReliefHubLogo from './ui/relief-hub-logo';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-gray-700 p-4 md:h-52">
        <ReliefHubLogo />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <p className="text-xl text-gray-800 antialiased md:text-3xl md:leading-normal">
            <strong>Welcome to Relief Hub.</strong> A place where you can change
            lives of the people in need.
          </p>
          <div className="space-y-2">
            <Link
              href="/login"
              className="flex items-center justify-center gap-5 self-start bg-gray-700 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-600 md:text-base"
            >
              <span>Donor/Recipient</span>{' '}
              <ArrowRightIcon className="w-5 md:w-6" />
            </Link>
            <Link
              href="/login"
              className="flex items-center justify-center gap-5 self-start px-6 py-3 text-sm font-medium transition-colors hover:bg-gray-100 md:text-base border border-gray-700"
            >
              <span>Join the Team</span>{' '}
              <ArrowRightIcon className="w-5 md:w-6" />
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          <Image
            src="/hero-desktop.png"
            width={1000}
            height={760}
            className="hidden border-2 border-gray-700 p-2  md:block"
            alt="Screenshots of the dashboard project showing desktop version"
          />
          <Image
            src="/hero-mobile.png"
            width={560}
            height={620}
            className="block md:hidden"
            alt="Screenshots of the dashboard project showing mobile version"
          />
        </div>
      </div>
    </main>
  );
}
