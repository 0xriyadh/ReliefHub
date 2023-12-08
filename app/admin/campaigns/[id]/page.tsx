import {
    fetchCampaignById,
    fetchTeamsWithCampaignId,
    fetchUserById,
} from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/campaigns/breadcrumbs";

async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const teams = await fetchTeamsWithCampaignId(id);
    return (
        <div>
            <p>I am from main page with Stooooooocks</p>
        </div>
    );
}

export default Page;
