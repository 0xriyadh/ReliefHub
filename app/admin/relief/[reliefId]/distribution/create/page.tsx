import {
  fetchRecipientsForDistribution,
  fetchReliefStocks,
} from '@/app/lib/data';
import CreateDistributionForm from '@/app/ui/relief/distribution-create-form';

export default async function Page({
  params,
}: {
  params: { reliefId: string };
}) {
  const reliefId = params.reliefId;
  const recipients = await fetchRecipientsForDistribution(reliefId);
  const reliefStocks = await fetchReliefStocks(reliefId);
  return (
    <div className="mt-6">
      <CreateDistributionForm
        reliefId={reliefId}
        recipients={recipients}
        reliefStocks={reliefStocks}
      />
    </div>
  );
}
