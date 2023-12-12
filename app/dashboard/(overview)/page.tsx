import { Suspense } from 'react';
import { LatestTableSkeleton } from '@/app/ui/skeletons';
import { auth } from '@/auth';
import { fetchUser } from '@/app/lib/data';
import UserLatestDonations from '@/app/ui/userDashboard/latest-donations';
import { CreateDonation } from '@/app/ui/userDashboard/donation-buttons';
import LatestReliefReceived from '@/app/ui/userDashboard/latest-reliefs-received';

export default async function Page() {
  const { user }: any = await auth();
  const email = user?.email;
  const userFullData = await fetchUser(email);
  if (userFullData.role == 'president') {
    return (
      <>
        <p>Hi I am President {userFullData.name}</p>
      </>
    );
  }
  return (
    <main>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-4">
        {userFullData.type == 'donor' ? (
          <>
            <div className="mb-6 mt-4 flex">
              <CreateDonation donorId={userFullData.id} />
            </div>
            <Suspense fallback={<LatestTableSkeleton />}>
              <UserLatestDonations donorId={userFullData.id} />
            </Suspense>
          </>
        ) : (
          <Suspense fallback={<LatestTableSkeleton />}>
            <LatestReliefReceived recipientId={userFullData.id} />
          </Suspense>
        )}
      </div>
    </main>
  );
}
