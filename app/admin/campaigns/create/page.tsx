import { fetchModeratorsWithoutActiveCampaign } from '@/app/lib/data';
import Breadcrumbs from '@/app/ui/campaigns/breadcrumbs';
import CreateForm from '@/app/ui/campaigns/create-form';

export default async function Page() {
  const moderators = await fetchModeratorsWithoutActiveCampaign();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Campaigns', href: '/admin/campaigns' },
          {
            label: 'Create Campaign',
            href: '/admin/campaigns/create',
            active: true,
          },
        ]}
      />

      <CreateForm moderators={moderators} />
    </main>
  );
}
