// import RevenueChart from "@/app/ui/dashboard/revenue-chart";
import { Suspense } from "react";
import {
    CardsSkeleton,
    LatestTableSkeleton,
} from "@/app/ui/skeletons";
import CardWrapper from "@/app/ui/dashboard/cards";
import LatestDonations from "@/app/ui/dashboard/latest-donations";
import LatestReliefs from "@/app/ui/dashboard/latest-reliefs";

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
                <Suspense fallback={<LatestTableSkeleton />}>
                    <LatestDonations />
                </Suspense>
                <Suspense fallback={<LatestTableSkeleton />}>
                    <LatestReliefs />
                </Suspense>
            </div>
        </main>
    );
}
