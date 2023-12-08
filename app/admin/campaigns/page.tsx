import Pagination from "@/app/ui/campaigns/pagination";
import Search from "@/app/ui/search";
import Table from "@/app/ui/campaigns/table";
import { CreateCampaign } from "@/app/ui/campaigns/buttons";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import { fetchFilteredCampaigns, fetchCampaignsPages } from "@/app/lib/data";

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

    const totalPages = await fetchCampaignsPages(query);

    return (
        <div className="w-full">
            <p>Campaigns main page</p>
            <div className="flex w-full items-center justify-between">
                <h1 className="text-2xl">Campaigns</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search for campaigns..." />
                <CreateCampaign />
            </div>
            <Suspense
                key={query + currentPage}
                fallback={<InvoicesTableSkeleton />}
            >
                <Table query={query} currentPage={currentPage} />
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    );
}
