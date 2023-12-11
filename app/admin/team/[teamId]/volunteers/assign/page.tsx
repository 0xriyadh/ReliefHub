import { fetchAvailableVolunteers } from '@/app/lib/data';
import VolunteersAssignForm from '@/app/ui/team/volunteers-assign-form';

export default async function Page({ params }: { params: { teamId: string } }) {
  const teamId = params.teamId;
  const availableVolunteers = await fetchAvailableVolunteers();
  return (
    <div className="mt-6">
      <VolunteersAssignForm
        teamId={teamId}
        availableVolunteers={availableVolunteers}
      />
    </div>
  );
}
