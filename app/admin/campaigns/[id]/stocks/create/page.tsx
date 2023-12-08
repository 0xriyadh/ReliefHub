import { fetchDonationItems } from "@/app/lib/data";
import CreateStockForm from "@/app/ui/campaign/stock-create-form";

export default async function Page({ params }: { params: { id: string } }) {
    const campaignId = params.id;
    const donationItems = await fetchDonationItems(campaignId);
    console.log(donationItems);
    return (
        <div className="mt-6">
            <CreateStockForm campaign_id={campaignId} donationItems={donationItems} />
        </div>
    );
}
