import { Metadata } from "next";
import NestedNav from "@/app/ui/campaign/nested-nav";
import { fetchCampaignById, fetchUserById } from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/campaigns/breadcrumbs";

export const metadata: Metadata = {
    title: "Relief Hub: Admin Panel",
    description: "Admin Panel for Relief Hub App",
};

async function Layout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { id: string };
}) {
    const id = params.id;
    const campaign = await fetchCampaignById(id);
    // const campaignLeader = await fetchUserById(campaign.campaign_leader_id);
    return (
        <main className="">
            <Breadcrumbs
                breadcrumbs={[
                    { label: "Campaigns", href: `/admin/campaigns` },
                    {
                        label: `${campaign?.name}`,
                        href: `/`,
                        active: true,
                    },
                ]}
            />
            <div>
                {/* <p className="text-lg">
                    <span className="font-bold">Leader: </span>{" "}
                    {campaignLeader.name}
                </p> */}
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
