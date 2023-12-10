import { fetchReliefsPages } from '@/app/lib/data';
import { CreateRelief } from '@/app/ui/campaign/reliefs-buttons';
import ReliefsTable from '@/app/ui/campaign/reliefs-table';
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
  const totalPages = await fetchReliefsPages(id);

  return (
    <div>
      <div className="mt-4 flex">
        <CreateRelief campaignId={id} />
      </div>
      <Suspense key={id} fallback={<TableSkeleton />}>
        <ReliefsTable id={id} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}

export default Page;
