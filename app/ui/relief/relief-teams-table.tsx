import { fetchFilteredTeams, fetchReliefTeams } from '@/app/lib/data';
import Status from '../campaigns/status';
import { FaceFrownIcon } from '@heroicons/react/24/outline';
// import { DeleteTeam } from './teams-buttons';

export default async function ReliefTeamsTable({ reliefId }: { reliefId: string }) {
  const teams = await fetchReliefTeams(reliefId);
    if (teams.length <= 0) {
      return (
        <>
          <div className="flex h-60 items-center justify-center space-x-2 text-2xl">
            <FaceFrownIcon className="h-10 w-10 text-gray-400" />
            <p className="text-gray-500">No team has been assigned to this relief yet</p>
          </div>
        </>
      );
    }
  
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            Kindly view this table on a larger screen.
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Team Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Team Leader
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  District
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Team Status
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {teams?.map((team) => (
                <tr
                  key={team.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{team.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {team.team_leader_name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {team.district}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <Status status={team.status} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center justify-end gap-3">
                      {/* <UpdateStockItem
                                                donationId={
                                                    stock.donation_item_id
                                                }
                                                campaignId={stock.campaign_id}
                                            /> */}
                      {/* <DeleteTeam teamId={team.id} /> */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
