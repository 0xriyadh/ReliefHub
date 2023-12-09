import { deleteCampaignStock } from "@/app/lib/actions";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export function CreateStockItem({ campaignId }: { campaignId: string }) {
    return (
        <Link
            href={`/admin/campaigns/${campaignId}/stocks/create`}
            className="flex h-10 items-center bg-gray-700 px-4 text-sm font-medium text-white transition-colors hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
        >
            <span className="hidden md:block">Create Stock Item</span>{" "}
            <PlusIcon className="h-5 md:ml-4" />
        </Link>
    );
}

export function UpdateStockItem({
    campaignId,
    donationId,
}: {
    campaignId: string;
    donationId: string;
}) {
    return (
        <Link
            href={`/admin/campaigns/${campaignId}/stocks/edit`}
            className="p-2 hover:text-primary-color-600"
        >
            <PencilIcon className="w-5" />
        </Link>
    );
}

export async function DeleteStockItem({
    campaignId,
    donationItemId,
}: {
    campaignId: string;
    donationItemId: string;
}) {
    const deleteCampaignStockWithCampaignIdItemId = deleteCampaignStock.bind(
        null,
        campaignId,
        donationItemId
    );
    return (
        <>
            <form action={deleteCampaignStockWithCampaignIdItemId}>
                <button className="p-2 text-red-500 hover:text-red-200">
                    <span className="sr-only">Delete</span>
                    <TrashIcon className="w-5" />
                </button>
            </form>
        </>
    );
}
