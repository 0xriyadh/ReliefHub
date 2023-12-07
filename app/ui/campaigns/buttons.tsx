// import { deleteInvoice } from '@/app/lib/actions';
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export function CreateCampaign() {
    return (
        <Link
            href="/admin/campaigns/create"
            className="flex h-10 items-center bg-gray-700 px-4 text-sm font-medium text-white transition-colors hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
        >
            <span className="hidden md:block">Create Campaign</span>{" "}
            <PlusIcon className="h-5 md:ml-4" />
        </Link>
    );
}

export function UpdateInvoice({ id }: { id: string }) {
    return (
        <Link
            href={`/admin/campaigns/${id}/edit`}
            className="border p-2 hover:bg-gray-100"
        >
            <PencilIcon className="w-5" />
        </Link>
    );
}

export function DeleteInvoice({ id }: { id: string }) {
    // const deleteInvoiceWithId = deleteInvoice.bind(null, id);
    return (
        <>
            {/* <form action={deleteInvoiceWithId}> */}
            <form>
                <button className="border p-2 hover:bg-gray-100">
                    <span className="sr-only">Delete</span>
                    <TrashIcon className="w-5" />
                </button>
            </form>
        </>
    );
}
