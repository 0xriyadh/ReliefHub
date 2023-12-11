import { AssignTeamToRelief } from '@/app/ui/relief/relief-teams-buttons';
import ReliefTeamsTable from '@/app/ui/relief/relief-teams-table';
import { TableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';

async function Page({ params }: { params: { reliefId: string } }) {
  const reliefId = params.reliefId;

  return (
    <div>
      <div className="mt-4 flex">
        <AssignTeamToRelief reliefId={reliefId} />
      </div>
      <Suspense key={reliefId} fallback={<TableSkeleton />}>
        <ReliefTeamsTable reliefId={reliefId} />
      </Suspense>
    </div>
  );
}

export default Page;
