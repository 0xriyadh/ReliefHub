import ReliefStocksShowcase from '@/app/ui/relief/relief-stocks-showcase';
import { CardsSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';

async function Page({ params }: { params: { reliefId: string } }) {
  const reliefId = params.reliefId;

  return (
    <div className="mt-8">
        <Suspense fallback={<CardsSkeleton />}>
          <ReliefStocksShowcase reliefId={reliefId} />
        </Suspense>
    </div>
  );
}

export default Page;
