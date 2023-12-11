import { CreateStockItem } from "@/app/ui/campaign/stock-buttons";
import StocksTable from "@/app/ui/campaign/stock-table";
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

    return (
        <div>
            <div className="flex mt-4">
                <CreateStockItem campaignId={id} />
            </div>
            <Suspense key={id} fallback={<TableSkeleton />}>
                <StocksTable id={id} />
            </Suspense>
        </div>
    );
}

export default Page;
