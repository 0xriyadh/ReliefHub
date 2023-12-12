import {
  fetchActiveCampaigns,
  fetchDonationItems,
} from '@/app/lib/data';
import DonationForm from '@/app/ui/userDashboard/donation-form';

export default async function Page({
  params,
}: {
  params: { donorId: string };
}) {
  const donorId = params.donorId;
  const campaigns = await fetchActiveCampaigns();
  const donationItems = await fetchDonationItems();
  return (
    <div className="mt-6">
      <h3 className="mb-4 text-2xl">Donate and Help Us Save Lives</h3>
      <DonationForm
        donorId={donorId}
        campaigns={campaigns}
        donationItems={donationItems}
      />
    </div>
  );
}
