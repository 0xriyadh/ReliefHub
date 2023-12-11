import { Metadata } from 'next';
import { fetchReliefById, fetchTeamById } from '@/app/lib/data';
import Breadcrumbs from '@/app/ui/campaigns/breadcrumbs';
import ReliefNestedNav from '@/app/ui/relief/relief-nested-nav';
import TeamfNestedNav from '@/app/ui/team/team-nested-nav';

export const metadata: Metadata = {
  title: 'Relief Hub: Relief',
  description: 'Relief Management',
};

async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { teamId: string };
}) {
  const teamId = params.teamId;
  const team = await fetchTeamById(teamId);
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          {
            label: 'Teams',
            href: `/admin/campaigns/${team?.campaign_id}/teams`,
          },
          {
            label: `${team?.name}`,
            href: `/admin/team/${teamId}`,
            active: true,
          },
        ]}
      />
      <div>
        <p className="text-lg">
          <span className="font-bold">Location: </span> {team.district}
        </p>
        <p className="text-lg">
          <span className="font-bold">Team Leader: </span> {team.team_leader_name}
        </p>
      </div>
      <div>{children}</div>
    </main>
  );
}

export default Layout;
