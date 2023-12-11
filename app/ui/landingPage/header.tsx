import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from './button';

export default function Header() {
  return (
    <header
      id="header"
      className="header fixed left-0 top-0 z-30 w-full bg-white bg-opacity-50 p-4 px-12 backdrop-blur-md backdrop-filter"
    >
      <div className="flex flex-row justify-between align-middle">
        <Image src="/logo.png" alt="Logo" height="40" width="40"></Image>
        <div className="flex flex-row items-center space-x-5 text-lg font-bold">
          <Link href="/landing" className="hover:underline">
            Home
          </Link>
          <Link href="/landing" className="hover:underline">
            About
          </Link>
          <Link href="/landing" className="hover:underline">
            Contact
          </Link>
          {/* <button className="rounded bg-orange-400 px-4 py-1 text-white hover:bg-orange-500">
            Login
          </button> */}
          <Button text="Login" isActive={true} />
        </div>
      </div>
    </header>
  );
}
