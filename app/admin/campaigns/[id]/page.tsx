import { fetchCampaignStocksPages } from "@/app/lib/data";
import { CreateStockItem } from "@/app/ui/campaign/stock-buttons";
import StocksTable from "@/app/ui/campaign/stock-table";
import Pagination from "@/app/ui/campaigns/pagination";
import { TableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";

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
    const totalPages = await fetchCampaignStocksPages(id);

    return (
        <div>
            <div className="flex mt-4">
                <CreateStockItem campaignId={id} />
            </div>
            <Suspense key={id} fallback={<TableSkeleton />}>
                <StocksTable id={id} currentPage={currentPage} />
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    );
}

export default Page;
