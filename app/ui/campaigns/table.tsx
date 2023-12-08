import { UpdateCampaign, DeleteCampaign } from "@/app/ui/campaigns/buttons";
import InvoiceStatus from "@/app/ui/campaigns/status";
import { formatDateToLocal } from "@/app/lib/utils";
import { fetchFilteredCampaigns, fetchModerators } from "@/app/lib/data";
import Link from "next/link";


export default async function CampaignsTable({
    query,
    currentPage,
}: {
    query: string;
    currentPage: number;
}) {
    const campaigns = await fetchFilteredCampaigns(query, currentPage);

    return (
        <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle">
                <div className="bg-gray-50 p-2 md:pt-0">
                    <div className="md:hidden">
                        {campaigns?.map((campaign) => (
                            <div
                                key={campaign.id}
                                className="mb-2 w-full bg-white p-4"
                            >
                                <div className="flex items-center justify-between border-b pb-4">
                                    <div>
                                        <div className="mb-2 flex items-center">
                                            <p>{campaign.name}</p>
                                        </div>
                                        <p className="text-sm text-gray-500">
                                            {campaign.campaign_leader_name}
                                        </p>
                                    </div>
                                    <InvoiceStatus status={campaign.status} />
                                </div>
                                <div className="flex w-full items-center justify-between pt-4">
                                    <div>
                                        <p>
                                            {formatDateToLocal(
                                                campaign.timestamp
                                            )}
                                        </p>
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <UpdateCampaign id={campaign.id} />
                                        <DeleteCampaign id={campaign.id} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <table className="hidden min-w-full text-gray-900 md:table">
                        <thead className="text-left text-sm font-normal">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-4 py-5 font-medium sm:pl-6"
                                >
                                    Campaign Name
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-5 font-medium"
                                >
                                    Leader
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-5 font-medium"
                                >
                                    Date
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-5 font-medium"
                                >
                                    Status
                                </th>
                                <th
                                    scope="col"
                                    className="relative py-3 pl-6 pr-3"
                                >
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
                                            <Link
                                                href={`/admin/campaigns/${campaign.id}`}
                                            >
                                                <p className="hover:text-primary-color-600">{campaign.name}</p>
                                            </Link>
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {campaign.campaign_leader_name}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {formatDateToLocal(campaign.timestamp)}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        <InvoiceStatus
                                            status={campaign.status}
                                        />
                                    </td>
                                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                        <div className="flex justify-end gap-3">
                                            <UpdateCampaign id={campaign.id} />
                                            <DeleteCampaign id={campaign.id} />
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
