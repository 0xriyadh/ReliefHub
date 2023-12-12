import Link from 'next/link';
import { PowerIcon } from '@heroicons/react/24/outline';
import ReliefHubLogo from '../relief-hub-logo';
import NavLinks from '@/app/ui/userDashboard/nav-links';
import { signOut } from '@/auth';

export default function SideNavUserDashboard() {
  return (
    <div className="flex h-full flex-col bg-white px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start  bg-gray-700 p-4 md:h-40"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          <ReliefHubLogo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow  md:block"></div>
        <form
          action={async () => {
            'use server';
            await signOut();
          }}
        >
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2  bg-gray-50 p-3 text-sm font-medium hover:bg-red-50 hover:text-red-500 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
