'use client';

import Link from 'next/link';
import {
  QuestionMarkCircleIcon,
  MegaphoneIcon,
  UserIcon,
  UserGroupIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { ModeratorsField } from '@/app/lib/definitions';
import { createCampaignStock, createCampaignTeam } from '@/app/lib/actions';

export default function CreateTeamForm({
  campaign_id,
  moderators,
}: {
  campaign_id: string;
  moderators: ModeratorsField[];
}) {
  return (
    <form action={createCampaignTeam}>
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

        {/* Select Team Leader */}
        <div className="mb-4">
          <label
            htmlFor="team-leader"
            className="mb-2 block text-sm font-medium"
          >
            Team Leader
          </label>
          <div className="relative">
            <select
              id="team-leader"
              name="teamLeaderId"
              className="peer block w-full cursor-pointer border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="team-leader-error"
              required
            >
              <option value="" disabled>
                Choose a leader for the team
              </option>
              {moderators.map((moderator) => (
                <option key={moderator.id} value={moderator.id}>
                  {moderator.name}
                </option>
              ))}
            </select>
            <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Team Name */}
        <div className="mb-4">
          <label htmlFor="team-name" className="mb-2 block text-sm font-medium">
            Team Name
          </label>
          <div className="relative mt-2">
            <div className="relative">
              <input
                id="team-name"
                name="name"
                type="text"
                placeholder="Give your team a unique name"
                className="peer block w-full border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="team-name-error"
                required
              />
              <UserGroupIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Team District */}
        <div className="mb-4">
          <label
            htmlFor="team-location"
            className="mb-2 block text-sm font-medium"
          >
            District
          </label>
          <div className="relative mt-2">
            <div className="relative">
              <input
                id="team-location"
                name="location"
                type="text"
                placeholder="From which district is the team?"
                className="peer block w-full border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="team-location-error"
                required
              />
              <MapPinIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href={`/admin/campaigns/${campaign_id}/teams`}
          className="flex h-10 items-center bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Team</Button>
      </div>
    </form>
  );
}
