import {
  fetchDonationItemsFromCampaignStocksNotInReliefStocks,
  fetchReliefById,
} from '@/app/lib/data';
import DonationForm from '@/app/ui/userDashboard/donation-form';

export default async function Page({
  params,
}: {
  params: { donorId: string };
}) {
  const donorId = params.donorId;
  // const campaignId = (await fetchReliefById(reliefId)).campaign_id;
  // const donationItemsFromCampaignStocksNotInReliefStocks =
  //   await fetchDonationItemsFromCampaignStocksNotInReliefStocks(
  //     campaignId,
  //     reliefId,
  //   );
  return (
    <div className="mt-6">
      <p>welcome {donorId}</p>
      {/* <DonationForm
        reliefId={reliefId}
        campaignId={campaignId}
        donationItemsFromCampaignStocksNotInReliefStocks={
          donationItemsFromCampaignStocksNotInReliefStocks
        }
      /> */}
    </div>
  );
}
