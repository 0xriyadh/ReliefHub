import { fetchTeamsPages } from '@/app/lib/data';
import { CreateTeam } from '@/app/ui/campaign/teams-buttons';
import TeamsTable from '@/app/ui/campaign/teams-table';
import Pagination from '@/app/ui/campaigns/pagination';
import { TableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';

async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: {
    page?: string;
  };
}) {
  const id = params.id;
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchTeamsPages(id);

  return (
    <div>
      <div className="mt-4 flex">
        <CreateTeam campaignId={id} />
      </div>
      <Suspense key={id} fallback={<TableSkeleton />}>
        <TeamsTable id={id} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}

export default Page;
