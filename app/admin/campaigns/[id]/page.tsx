import { fetchCampaignById, fetchTeamsWithCampaignId } from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/campaigns/breadcrumbs";

async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const campaign = await fetchCampaignById(id);
    const teams = await fetchTeamsWithCampaignId(id);
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: "Campaigns", href: `/admin/campaigns` },
                    {
                        label: "Edit Campaign",
                        href: `/admin/campaigns/${id}/edit`,
                        active: true,
                    },
                ]}
            />
            <p>I am from {id}</p>
        </main>
    );
}

export default Page;
