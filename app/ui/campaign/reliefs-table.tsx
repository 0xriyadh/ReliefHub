import { fetchFilteredReliefs } from '@/app/lib/data';
import { DeleteTeam } from './teams-buttons';
import { formatDateToLocal } from '@/app/lib/utils';
import { DeleteRelief } from './reliefs-buttons';

export default async function ReliefsTable({
  id,
  currentPage,
}: {
  id: string;
  currentPage: number;
}) {
  const reliefs = await fetchFilteredReliefs(id, currentPage);

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
                  Relief Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Relief Location
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Creation Date
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {reliefs?.map((relief) => (
                <tr
                  key={relief.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{relief.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {relief.location}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(relief.timestamp)}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center justify-end gap-3">
                      {/* <UpdateStockItem
                            donationId={
                                stock.donation_item_id
                            }
                            campaignId={stock.campaign_id}
                        /> */}
                      <DeleteRelief reliefId={relief.id} />
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
