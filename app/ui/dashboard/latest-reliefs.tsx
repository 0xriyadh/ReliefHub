import { ArrowPathIcon, MapPinIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { fetchLatestReliefs } from "@/app/lib/data";
export default async function LatestReliefs() {
    const latestReliefs = await fetchLatestReliefs();
    return (
        <div className="flex w-full flex-col md:col-span-4">
            <h2 className="mb-4 text-xl md:text-2xl">Latest Reliefs</h2>
            <div className="flex grow flex-col justify-between bg-gray-50 p-4">
                <div className="bg-white px-6">
                    {latestReliefs.map((relief, i) => {
                        return (
                            <div
                                key={relief.id}
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
                                            {relief.relief_name}
                                        </p>
                                        <p className="hidden text-sm text-gray-500 sm:block">
                                            {relief.campaign_name}
                                        </p>
                                    </div>
                                </div>
                                <p className="truncate text-sm font-medium md:text-base flex items-center space-x-2">
                                    <span>{relief.relief_location}</span>{" "}
                                    <MapPinIcon className="h-4 w-4 text-primary-color-600" />
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
