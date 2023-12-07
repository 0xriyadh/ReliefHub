import { ArrowPathIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { fetchLatestDonations } from "@/app/lib/data";
export default async function LatestDonations() {
    const latestDonations = await fetchLatestDonations();
    return (
        <div className="flex w-full flex-col md:col-span-4">
            <h2 className="mb-4 text-xl md:text-2xl">Latest Donations</h2>
            <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
                <div className="bg-white px-6">
                    {latestDonations.map((donation, i) => {
                        return (
                            <div
                                key={donation.id}
                                className={clsx(
                                    "flex flex-row items-center justify-between py-4",
                                    {
                                        "border-t": i !== 0,
                                    }
                                )}
                            >
                                <div className="flex items-center">
                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-semibold md:text-base">
                                            {donation.donor_name}
                                        </p>
                                        <p className="hidden text-sm text-gray-500 sm:block">
                                            {donation.campaign_name}
                                        </p>
                                    </div>
                                </div>
                                <p className="truncate text-sm font-medium md:text-base">
                                    {donation.quantity.toLocaleString()}{" "}
                                    {donation.donation_item_unit}{" "}
                                    {donation.donation_item_name !==
                                        "Money" && (
                                        <span>
                                            of {donation.donation_item_name}
                                        </span>
                                    )}
                                </p>
                            </div>
                        );
                    })}
                </div>
                <div className="flex items-center pb-2 pt-6">
                    <ArrowPathIcon className="h-5 w-5 text-gray-500" />
                    <h3 className="ml-2 text-sm text-gray-500 ">
                        Updated just now
                    </h3>
                </div>
            </div>
        </div>
    );
}
