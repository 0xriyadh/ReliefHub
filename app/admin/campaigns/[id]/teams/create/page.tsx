import { fetchModeratorsWithoutActiveTeam } from "@/app/lib/data";
import CreateTeamForm from "@/app/ui/campaign/teams-create-form";

export default async function Page({ params }: { params: { id: string } }) {
    const campaignId = params.id;
    const moderators = await fetchModeratorsWithoutActiveTeam();
    return (
      <div className="mt-6">
        <CreateTeamForm campaign_id={campaignId} moderators={moderators} />
      </div>
    );
}
