"use client";

import Link from "next/link";
import { UserCircleIcon, MegaphoneIcon } from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/button";
import { ModeratorsField } from "@/app/lib/definitions";
import { createCampaign } from "@/app/lib/actions";

export default function CreateForm({
    moderators,
}: {
    moderators: ModeratorsField[];
}) {
    return (
        <form action={createCampaign}>
            <div className="bg-gray-50 p-4 md:p-6">
                {/* Select Campaign Leader */}
                <div className="mb-4">
                    <label
                        htmlFor="leader"
                        className="mb-2 block text-sm font-medium"
                    >
                        Campaign Leader
                    </label>
                    <div className="relative">
                        <select
                            id="leader"
                            name="leaderId"
                            className="peer block w-full cursor-pointer border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            defaultValue=""
                            aria-describedby="leader-error"
                            required
                        >
                            <option value="" disabled>
                                Choose the Campaign Leader
                            </option>
                            {moderators.map((moderator) => (
                                <option key={moderator.id} value={moderator.id}>
                                    {moderator.name}
                                </option>
                            ))}
                        </select>
                        <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                    </div>
                </div>

                {/* Name of the Campaign */}
                <div className="mb-4">
                    <label
                        htmlFor="campaign-name"
                        className="mb-2 block text-sm font-medium"
                    >
                        Campaign Name
                    </label>
                    <div className="relative mt-2">
                        <div className="relative">
                            <input
                                id="campaign-name"
                                name="campaignName"
                                type="text"
                                step="0.01"
                                placeholder="Give your campaign a unique name"
                                className="peer block w-full border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                aria-describedby="campaign-name-error"
                                required
                            />
                            <MegaphoneIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-6 flex justify-end gap-4">
                <Link
                    href="/admin/campaigns"
                    className="flex h-10 items-center bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    Cancel
                </Link>
                <Button type="submit">Create Campaign</Button>
            </div>
        </form>
    );
}
