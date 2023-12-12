import { UpdateCampaign, DeleteCampaign } from '@/app/ui/campaigns/buttons';
import Status from '@/app/ui/campaigns/status';
import { formatDateToLocal } from '@/app/lib/utils';
import { fetchFilteredCampaigns } from '@/app/lib/data';
import Link from 'next/link';
import { User } from '@/app/lib/definitions';

export default async function CampaignsTable({
  user,
  query,
  currentPage,
}: {
  user: User;
  query: string;
  currentPage: number;
}) {
  const campaigns = await fetchFilteredCampaigns(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            Mobile view is not supported yet. Please use a desktop browser.
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Campaign Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Leader
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {campaigns?.map((campaign) => (
                <tr
                  key={campaign.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      {user.role === 'president' ||
                      user.role === 'moderator' ? (
                        <Link href={`/admin/campaigns/${campaign.id}`}>
                          <p className="hover:text-green-500">
                            {campaign.name}
                          </p>
                        </Link>
                      ) : (
                        <p className="hover:text-green-500">{campaign.name}</p>
                      )}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {campaign.campaign_leader_name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(campaign.timestamp)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <Status status={campaign.status} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateCampaign id={campaign.id} />
                      <DeleteCampaign id={campaign.id} role={user.role || ''} />
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
