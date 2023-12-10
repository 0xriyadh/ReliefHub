import { Metadata } from "next";
import NestedNav from "@/app/ui/campaign/nested-nav";
import { fetchCampaignById } from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/campaigns/breadcrumbs";

export const metadata: Metadata = {
    title: "Relief Hub: Campaign",
    description: "Campaign for Relief Hub App",
};

async function Layout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { id: string, reliefId: string };
}) {
    const id = params.id;
    const reliefId = params.reliefId;
    const campaign = await fetchCampaignById(id);
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: "Campaigns", href: `/admin/campaigns` },
                    {
                        label: `${campaign?.name}`,
                        href: `/admin/campaigns/${id}`,
                        active: true,
                    },
                ]}
            />
            <div>
                <p className="text-lg">
                    <span className="font-bold">Status: </span>{" "}
                    {campaign?.status == "active" ? "Active ✅" : "Archived ❌"}
                </p>
            </div>
            <div className="mt-8">
                <NestedNav id={id} />
            </div>
            <div>{children}</div>
        </main>
    );
}

export default Layout;
