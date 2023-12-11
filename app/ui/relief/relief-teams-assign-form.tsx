'use client';

import Link from 'next/link';
import {
  MegaphoneIcon,
  UserIcon,
  UserGroupIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { TeamForm } from '@/app/lib/definitions';
import { assignTeamToRelief } from '@/app/lib/actions';

export default function ReliefTeamsAssignForm({
  reliefId,
  teams,
}: {
  reliefId: string;
  teams: TeamForm[];
  }) {
  const assignTeam = assignTeamToRelief.bind(null, reliefId);
  return (
    <form action={assignTeam}>
      <div className="bg-gray-50 p-4 md:p-6">
        {/* Select Team to Assign */}
        <div className="mb-4">
          <label htmlFor="team" className="mb-2 block text-sm font-medium">
            Team
          </label>
          <div className="relative">
            <select
              id="team"
              name="teamId"
              className="peer block w-full cursor-pointer border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="team-error"
              required
            >
              <option value="" disabled>
                Choose a team to assign
              </option>
              {teams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>
            <UserGroupIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href={`/admin/relief/${reliefId}/teams`}
          className="flex h-10 items-center bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Assign This Team</Button>
      </div>
    </form>
  );
}
