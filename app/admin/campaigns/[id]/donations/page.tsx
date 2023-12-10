import { fetchDonationsPages } from '@/app/lib/data';
import DonationsTable from '@/app/ui/campaign/donations-table';
import { CreateTeam } from '@/app/ui/campaign/teams-buttons';
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
  const totalPages = await fetchDonationsPages(id);

  return (
    <div>
      <Suspense key={id} fallback={<TableSkeleton />}>
        <DonationsTable id={id} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}

export default Page;
