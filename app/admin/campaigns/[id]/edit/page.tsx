import {
  fetchCampaignById,
  fetchModeratorsWithoutActiveCampaign,
} from '@/app/lib/data';
import EditForm from '@/app/ui/campaigns/edit-form';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [campaign, moderators] = await Promise.all([
    fetchCampaignById(id),
    fetchModeratorsWithoutActiveCampaign(),
  ]);
  if (!campaign) {
    return notFound();
  }
  return (
    <main>
      <EditForm campaign={campaign} moderators={moderators} />
    </main>
  );
}
