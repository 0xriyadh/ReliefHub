import { deleteRelief } from '@/app/lib/actions';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export function AssignVolunteerToTeam({ teamId }: { teamId: string }) {
  return (
    <Link
      href={`/admin/team/${teamId}/volunteers/assign`}
      className="flex h-10 items-center bg-gray-700 px-4 text-sm font-medium text-white transition-colors hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
    >
      <span className="hidden md:block">Assign Volunteers to Team</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export async function RemoveVolunteerFromTeam({
  reliefId,
  recipientId,
}: {
  reliefId: string;
  recipientId: string;
}) {
  const deleteTeamWithId = deleteRelief.bind(null, reliefId);
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
