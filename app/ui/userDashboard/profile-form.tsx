'use client';

import {
  AtSymbolIcon,
  KeyIcon,
  UserIcon,
  PhoneIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '@/app/ui/button';
import { useFormStatus } from 'react-dom';
import { createUser, updateUser } from '@/app/lib/actions';
import Link from 'next/link';
import { User } from '@/app/lib/definitions';

export default function ProfileForm({ user }: { user: User }) {
  const updateProfile = updateUser.bind(null, user.id);

  return (
    <form action={updateProfile} className="space-y-1">
      <div className="flex-1 bg-gray-50 px-6 pb-4 pt-8">
        <h1 className="mb-3 text-2xl">Update your profile</h1>
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
                defaultValue={user.name}
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
                className="peer block w-full border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 disabled:text-gray-300"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                defaultValue={user.email}
                disabled
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
                defaultValue={user.phone}
                required
              />
              <PhoneIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          {/* address */}
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="address"
            >
              Address
            </label>
            <div className="relative">
              <input
                className="peer block w-full border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="address"
                type="text"
                name="address"
                placeholder="Enter your address"
                defaultValue={user.address}
              />
              <MapPinIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <div className="mt-8">
          <UpdateProfile />
        </div>
      </div>
    </form>
  );
}

function UpdateProfile() {
  const { pending } = useFormStatus();

  return (
    <Button className="mt-4 w-1/5" aria-disabled={pending}>
      Update <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}
