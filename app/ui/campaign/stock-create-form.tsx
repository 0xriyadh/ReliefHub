"use client";

import Link from "next/link";
import { QuestionMarkCircleIcon, MegaphoneIcon, GiftIcon } from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/button";
import { DonationItemForm } from "@/app/lib/definitions";
import { createCampaignStock } from "@/app/lib/actions";

export default function CreateStockForm({
    campaign_id,
    donationItems,
}: {
    campaign_id: string;
    donationItems: DonationItemForm[];
}) {
    return (
        <form action={createCampaignStock}>
            <div className="bg-gray-50 p-4 md:p-6">
                {/* Campaign */}
                <div className="mb-4 hidden">
                    <label
                        htmlFor="campaign-name"
                        className="mb-2 block text-sm font-medium"
                    >
                        Campaign ID
                    </label>
                    <div className="relative mt-2">
                        <div className="relative">
                            <input
                                id="campaign"
                                name="campaignId"
                                type="text"
                                step="0.01"
                                placeholder="Give your campaign a unique name"
                                className="peer block w-full border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                aria-describedby="campaignId-error"
                                value={campaign_id}
                                // disabled
                            />
                            <MegaphoneIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>
                </div>

                {/* Select Donation Item */}
                <div className="mb-4">
                    <label
                        htmlFor="stock-item"
                        className="mb-2 block text-sm font-medium"
                    >
                        Stock Item
                    </label>
                    <div className="relative">
                        <select
                            id="stock-item"
                            name="donationItemId"
                            className="peer block w-full cursor-pointer border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            defaultValue=""
                            aria-describedby="stock-item-error"
                            required
                        >
                            <option value="" disabled>
                                Choose the item you want to add to the stock ...
                            </option>
                            {donationItems.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name} {`(${item.unit})`}
                                </option>
                            ))}
                        </select>
                        <GiftIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                    </div>
                </div>

                {/* Item Quantity */}
                <div className="mb-4">
                    <label
                        htmlFor="item-quantity"
                        className="mb-2 block text-sm font-medium"
                    >
                        Initial Quantity
                    </label>
                    <div className="relative mt-2">
                        <div className="relative">
                            <input
                                id="item-quantity"
                                name="quantity"
                                type="number"
                                step="0.01"
                                placeholder="Set the initial quantity of the item"
                                className="peer block w-full border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                aria-describedby="item-quantity-error"
                                required
                            />
                            <QuestionMarkCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-6 flex justify-end gap-4">
                <Link
                    href="/dashboard/invoices"
                    className="flex h-10 items-center bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    Cancel
                </Link>
                <Button type="submit">Create Campaign</Button>
            </div>
        </form>
    );
}
