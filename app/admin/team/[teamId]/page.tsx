import Pagination from '@/app/ui/campaigns/pagination';
import { TableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchUsersPages } from '@/app/lib/data';
import MembersTable from '@/app/ui/members/table';

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchUsersPages(query);

  return (
    <div className="w-full mt-8">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl">Manage Volunteers</h1>
      </div>
      <Suspense key={query + currentPage} fallback={<TableSkeleton />}>
        <MembersTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
