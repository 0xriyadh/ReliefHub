// import RevenueChart from "@/app/ui/dashboard/revenue-chart";
import { Suspense } from 'react';
import { CardsSkeleton, LatestTableSkeleton } from '@/app/ui/skeletons';
import CardWrapper from '@/app/ui/dashboard/cards';
import LatestDonations from '@/app/ui/dashboard/latest-donations';
import LatestReliefs from '@/app/ui/dashboard/latest-reliefs';
import { auth } from '@/auth';
import { fetchUser, fetchUserById } from '@/app/lib/data';

export default async function Page() {
//   const { user }: any = await auth();
//   const email = user?.email;
//   const userFullData = await fetchUser(email);
//   console.log('from main page', userFullData);
//   if (userFullData.role == 'president') {
//     return (
//       <>
//         <p>Hi I am President {userFullData.name}</p>
//       </>
//     );
//   }
  return (
    <main>
      <h1 className="md:text-2xls mb-4 text-xl">Admin Dashboard</h1>
      <Suspense fallback={<CardsSkeleton />}>
        <CardWrapper />
      </Suspense>

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
