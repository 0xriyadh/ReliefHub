import { fetchReliefDistributionPages, fetchReliefsPages } from '@/app/lib/data';
import { CreateRelief } from '@/app/ui/campaign/reliefs-buttons';
import Pagination from '@/app/ui/campaigns/pagination';
import { DistributeRelief } from '@/app/ui/relief/relief-distributions-buttons';
import ReliefDistributionTable from '@/app/ui/relief/relief-distribution-table';
import { TableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';

async function Page({
  params,
  searchParams,
}: {
  params: { reliefId: string };
  searchParams?: {
    page?: string;
  };
}) {
  const reliefId = params.reliefId;
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchReliefDistributionPages(reliefId);
  return (
    <div>
      <div className="mt-4 flex">
        <DistributeRelief reliefId={reliefId} />
      </div>
      <Suspense key={reliefId} fallback={<TableSkeleton />}>
        <ReliefDistributionTable
          reliefId={reliefId}
          currentPage={currentPage}
        />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}

export default Page;
