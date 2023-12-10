'use client';

import Link from 'next/link';
import {
  MegaphoneIcon,
  MapPinIcon,
  LifebuoyIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createRelief } from '@/app/lib/actions';

export default function CreateReliefForm({
  campaign_id,
}: {
  campaign_id: string;
}) {
  return (
    <form action={createRelief}>
      <div className="bg-gray-50 p-4 md:p-6">
        {/* Campaign */}
        <div className="mb-4 hidden">
          <label
            htmlFor="campaign-name"
            className="mb-2 block text-sm font-medium"
          >
            Campaign ID
          </label>
          <div className="relative mt-2">
            <div className="relative">
              <input
                id="campaign"
                name="campaignId"
                type="text"
                step="0.01"
                placeholder="Give your campaign a unique name"
                className="peer block w-full border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="campaignId-error"
                value={campaign_id}
                // disabled
              />
              <MegaphoneIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Relief Name */}
        <div className="mb-4">
          <label
            htmlFor="relief-name"
            className="mb-2 block text-sm font-medium"
          >
            Relief Name
          </label>
          <div className="relative mt-2">
            <div className="relative">
              <input
                id="relief-name"
                name="name"
                type="text"
                placeholder="Give this relief a unique name"
                className="peer block w-full border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="relief-name-error"
                required
              />
              <LifebuoyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Relief Location */}
        <div className="mb-4">
          <label
            htmlFor="relief-location"
            className="mb-2 block text-sm font-medium"
          >
            Relief Location
          </label>
          <div className="relative mt-2">
            <div className="relative">
              <input
                id="relief-location"
                name="location"
                type="text"
                placeholder="Where will this relief be distributed?"
                className="peer block w-full border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="relief-location-error"
                required
              />
              <MapPinIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href={`/admin/campaigns/${campaign_id}/reliefs`}
          className="flex h-10 items-center bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Relief</Button>
      </div>
    </form>
  );
}
