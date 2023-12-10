import Pagination from "@/app/ui/campaigns/pagination";
import Search from "@/app/ui/search";
import Table from "@/app/ui/campaigns/table";
import { CreateCampaign } from "@/app/ui/campaigns/buttons";
import { TableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import { fetchCampaignsPages, fetchUsersPages } from "@/app/lib/data";
import MembersTable from "@/app/ui/members/table";

export default async function Page({
    searchParams,
}: {
    searchParams?: {
        query?: string;
        page?: string;
    };
}) {
    const query = searchParams?.query || "";
    const currentPage = Number(searchParams?.page) || 1;

    const totalPages = await fetchUsersPages(query);

    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className="text-2xl">Members</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search for members..." />
            </div>
            <Suspense
                key={query + currentPage}
                fallback={<TableSkeleton />}
            >
                <MembersTable query={query} currentPage={currentPage} />
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    );
}
