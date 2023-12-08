import { UpdateCampaign, DeleteCampaign } from "@/app/ui/campaigns/buttons";
import InvoiceStatus from "@/app/ui/campaigns/status";
import { formatDateToLocal } from "@/app/lib/utils";
import {
    fetchFilteredCampaigns,
    fetchFilteredStocks,
    fetchModerators,
} from "@/app/lib/data";
import Link from "next/link";
import { DeleteStockItem, UpdateStockItem } from "./stock-buttons";

export default async function StocksTable({
    id,
    currentPage,
}: {
    id: string;
    currentPage: number;
}) {
    const stocks = await fetchFilteredStocks(id, currentPage);

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
                                <th
                                    scope="col"
                                    className="px-4 py-5 font-medium sm:pl-6"
                                >
                                    Item Name
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-5 font-medium"
                                >
                                    Quantity
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-5 font-medium"
                                >
                                    Unit
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
                            {stocks?.map((stock) => (
                                <tr
                                    key={stock.donation_item_id}
                                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                                >
                                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                        <div className="flex items-center gap-3">
                                            <Link
                                                href={`/admin/campaigns/${stock.donation_item_id}`}
                                            >
                                                <p className="hover:text-primary-color-600">
                                                    {stock.item_name}
                                                </p>
                                            </Link>
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {stock.item_quantity.toLocaleString()}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {stock.item_unit}
                                    </td>
                                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                        <div className="flex justify-end items-center gap-3">
                                            <UpdateStockItem
                                                donationId={
                                                    stock.donation_item_id
                                                }
                                                campaignId={stock.campaign_id}
                                            />
                                            <DeleteStockItem
                                                donationId={
                                                    stock.donation_item_id
                                                }
                                                campaignId={stock.campaign_id}
                                            />
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
