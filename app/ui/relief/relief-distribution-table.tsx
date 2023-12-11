import { fetchFilteredDonations, fetchReliefDistribution } from '@/app/lib/data';
import Status from '../campaigns/status';
import { formatDateToLocal } from '@/app/lib/utils';

export default async function ReliefDistributionTable({
  reliefId,
  currentPage,
}: {
  reliefId: string;
  currentPage: number;
}) {
  const distributions = await fetchReliefDistribution(reliefId, currentPage);

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
                  Recipient
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Item
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Quantity
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {distributions?.map((distribution) => (
                <tr
                  key={distribution.relief_id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{distribution.recipient_name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {distribution.item_name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {distribution.quantity.toLocaleString()}{' '}
                    {distribution.item_unit}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(distribution.timestamp)}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center justify-end gap-3">
                      {/* <UpdateStockItem
                                                donationId={
                                                    stock.donation_item_id
                                                }
                                                campaignId={stock.campaign_id}
                                            /> */}
                      {/* <DeleteDonation donationId={donation.id} /> */}
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
