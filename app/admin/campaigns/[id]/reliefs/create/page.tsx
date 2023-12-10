import { fetchModeratorsWithoutActiveTeam } from "@/app/lib/data";
import CreateReliefForm from "@/app/ui/campaign/reliefs-create-form";

export default async function Page({ params }: { params: { id: string } }) {
    const campaignId = params.id;
    return (
      <div className="mt-6">
        <CreateReliefForm campaign_id={campaignId} />
      </div>
    );
}
