'use client';

import {
  AtSymbolIcon,
  KeyIcon,
  UserIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from './button';
import { useFormStatus } from 'react-dom';
import { createUser } from '@/app/lib/actions';
import Link from 'next/link';

export default function RegisterForm() {
  const registerUser = createUser.bind(null, null);

  return (
    <form action={registerUser} className="space-y-1">
      <div className="flex-1 bg-gray-50 px-6 pb-4 pt-8">
        <h1 className="mb-3 text-2xl">Please Sign Up to continue.</h1>
        <div className="w-full">
          {/* name */}
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="name"
            >
              Full Name
            </label>
            <div className="relative">
              <input
                className="peer block w-full border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="name"
                type="text"
                name="name"
                placeholder="Enter your full name"
                required
              />
              <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>

          {/* email */}
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>

          {/* phone */}
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="phone"
            >
              Phone
            </label>
            <div className="relative">
              <input
                className="peer block w-full border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="phone"
                type="text"
                name="phone"
                placeholder="Enter your phone number"
                required
              />
              <PhoneIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          {/* select between 'donor' and recipient */}
          {/* use radio selection */}
          {/* use user icon */}
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="role"
            >
              Donor or Recipient?
            </label>
            <div className="relative">
              <select
                className="peer block w-full border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="type"
                name="type"
                placeholder="Donor or Recipient?"
                required
              >
                <option value="donor">Donor</option>
                <option value="recipient">Recipient</option>
              </select>
              <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          {/* pasword */}
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <RegisterButton />
        <p className="mt-1">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-primary-gray-700 underline">
            Login Here
          </Link>
        </p>
      </div>
    </form>
  );
}

function RegisterButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="mt-4 w-full" aria-disabled={pending}>
      Register <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}
