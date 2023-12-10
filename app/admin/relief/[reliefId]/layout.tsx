import { Metadata } from 'next';
import NestedNav from '@/app/ui/campaign/nested-nav';
import { fetchCampaignById, fetchReliefById } from '@/app/lib/data';
import Breadcrumbs from '@/app/ui/campaigns/breadcrumbs';
import ReliefNestedNav from '@/app/ui/relief/relief-nested-nav';

export const metadata: Metadata = {
  title: 'Relief Hub: Relief',
  description: 'Relief Management',
};

async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { reliefId: string };
}) {
  const reliefId = params.reliefId;
  const relief = await fetchReliefById(reliefId);
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          {
            label: 'Reliefs',
            href: `/admin/campaigns/${relief?.campaign_id}/reliefs`,
          },
          {
            label: `${relief?.name}`,
            href: `/admin/relief/${reliefId}`,
            active: true,
          },
        ]}
      />
      <div>
        <p className="text-lg">
          <span className="font-bold">Location: </span> {relief.location}
        </p>
      </div>
      <div className="mt-8">
        <ReliefNestedNav reliefId={reliefId} />
      </div>
      <div>{children}</div>
    </main>
  );
}

export default Layout;
