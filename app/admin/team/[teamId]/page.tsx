import Pagination from '@/app/ui/campaigns/pagination';
import { TableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchUsersPages } from '@/app/lib/data';
import MembersTable from '@/app/ui/members/table';
import VolunteersTable from '@/app/ui/team/volunteers-table';

export default async function Page({ params }: { params: { teamId: string } }) {
  const teamId = params.teamId;

  return (
    <div className="mt-8 w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl">Manage Volunteers</h1>
      </div>
      <Suspense key={teamId} fallback={<TableSkeleton />}>
        <VolunteersTable teamId={teamId} />
      </Suspense>
    </div>
  );
}
