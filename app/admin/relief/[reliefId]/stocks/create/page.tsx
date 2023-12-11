import {
  fetchDonationItemsFromCampaignStocksNotInReliefStocks,
  fetchRecipientsForDistribution,
  fetchReliefById,
  fetchReliefStocks,
} from '@/app/lib/data';
import CreateReliefStockForm from '@/app/ui/relief/relief-stocks-create-form';

export default async function Page({
  params,
}: {
  params: { reliefId: string };
}) {
  const reliefId = params.reliefId;
  const recipients = await fetchRecipientsForDistribution(reliefId);
  const reliefStocks = await fetchReliefStocks(reliefId);
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
        recipients={recipients}
        reliefStocks={reliefStocks}
        campaignId={campaignId}
        donationItemsFromCampaignStocksNotInReliefStocks={
          donationItemsFromCampaignStocksNotInReliefStocks
        }
      />
    </div>
  );
}
