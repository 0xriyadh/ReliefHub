import {
  fetchDonationItemsFromCampaignStocksNotInReliefStocks,
  fetchReliefById,
} from '@/app/lib/data';
import CreateReliefStockForm from '@/app/ui/relief/relief-stocks-create-form';

export default async function Page({
  params,
}: {
  params: { reliefId: string };
}) {
  const reliefId = params.reliefId;
  const campaignId = (await fetchReliefById(reliefId)).campaign_id;
  const donationItemsFromCampaignStocksNotInReliefStocks =
    await fetchDonationItemsFromCampaignStocksNotInReliefStocks(
      campaignId,
      reliefId,
    );
  return (
    <div className="mt-6">
      <CreateReliefStockForm
        reliefId={reliefId}
        campaignId={campaignId}
        donationItemsFromCampaignStocksNotInReliefStocks={
          donationItemsFromCampaignStocksNotInReliefStocks
        }
      />
    </div>
  );
}
