// import RevenueChart from "@/app/ui/dashboard/revenue-chart";
// import LatestInvoices from "@/app/ui/dashboard/latest-invoices";
import { Suspense } from "react";
import {
    CardsSkeleton,
    LatestInvoicesSkeleton,
    RevenueChartSkeleton,
} from "@/app/ui/skeletons";
import CardWrapper from "@/app/ui/dashboard/cards";

export default async function Page() {
    return (
        <main>
            <h1 className="mb-4 text-xl md:text-2xls">Dashboard</h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <Suspense fallback={<CardsSkeleton />}>
                    <CardWrapper />
                </Suspense>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                {/* <RevenueChart revenue={data[0]} /> */}
                <Suspense fallback={<LatestInvoicesSkeleton />}>
                    {/* <LatestInvoices /> */}
                </Suspense>
                <Suspense fallback={<LatestInvoicesSkeleton />}>
                    {/* <LatestInvoices /> */}
                </Suspense>
            </div>
        </main>
    );
}
