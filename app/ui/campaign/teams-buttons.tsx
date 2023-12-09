import { deleteCampaignStock, deleteCampaignTeam } from '@/app/lib/actions';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export function CreateTeam({ campaignId }: { campaignId: string }) {
  return (
    <Link
      href={`/admin/campaigns/${campaignId}/teams/create`}
      className="flex h-10 items-center bg-gray-700 px-4 text-sm font-medium text-white transition-colors hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
    >
      <span className="hidden md:block">Create Team</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateTeam({
  campaignId,
  donationId,
}: {
  campaignId: string;
  donationId: string;
}) {
  return (
    <Link
      href={`/admin/campaigns/${campaignId}/stocks/edit`}
      className="hover:text-primary-color-600 p-2"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export async function DeleteTeam({ teamId }: { teamId: string }) {
  const deleteTeamWithId = deleteCampaignTeam.bind(null, teamId);
  return (
    <>
      <form action={deleteTeamWithId}>
        <button className="p-2 text-red-500 hover:text-red-200">
          <span className="sr-only">Delete</span>
          <TrashIcon className="w-5" />
        </button>
      </form>
    </>
  );
}
