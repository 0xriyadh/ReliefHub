import { fetchCampaignById, fetchModerators } from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/campaigns/breadcrumbs";
import EditForm from "@/app/ui/campaigns/edit-form";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [campaign, moderators] = await Promise.all([
        fetchCampaignById(id),
        fetchModerators(),
    ]);
    if (!campaign) {
        return notFound();
    }
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: "Campaigns", href: "/admin/campaigns" },
                    {
                        label: "Edit Campaign",
                        href: `/admin/campaigns/${id}/edit`,
                        active: true,
                    },
                ]}
            />
            <EditForm campaign={campaign} moderators={moderators} />
        </main>
    );
}
