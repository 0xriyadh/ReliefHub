import {
  fetchDonationItemsFromCampaignStocksNotInReliefStocks,
  fetchReliefById,
  fetchTeamsToAssignToRelief,
} from '@/app/lib/data';
import CreateReliefStockForm from '@/app/ui/relief/relief-stocks-create-form';
import ReliefTeamsAssignForm from '@/app/ui/relief/relief-teams-assign-form';

export default async function Page({
  params,
}: {
  params: { reliefId: string };
}) {
  const reliefId = params.reliefId;
  const campaignId = (await fetchReliefById(reliefId)).campaign_id;
  const teams = await fetchTeamsToAssignToRelief(campaignId, reliefId);
  return (
    <div className="mt-6">
      <ReliefTeamsAssignForm reliefId={reliefId} teams={teams} />
    </div>
  );
}
