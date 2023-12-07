"use client";

import Link from "next/link";
import {
    CheckIcon,
    ClockIcon,
    CurrencyDollarIcon,
    UserCircleIcon,
    MegaphoneIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/button";
// import { createInvoice } from "@/app/lib/actions";
import { useFormState } from "react-dom";
import { ModeratorsField } from "@/app/lib/definitions";

export default function CreateForm({
    moderators,
}: {
    moderators: ModeratorsField[];
}) {
    const initialState = { message: null, errors: {} };
    // const [state, formAction] = useFormState(fn, initialState);
    // const [state, dispatch] = useFormState(createInvoice, initialState);
    return (
        // <form action={dispatch}>
        <form>
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
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
                            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            defaultValue=""
                            aria-describedby="leader-error"
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
                    {/* <div
                        id="leader-error"
                        aria-live="polite"
                        aria-atomic="true"
                    >
                        {state.errors?.leaderId &&
                            state.errors.leaderId.map((error: string) => (
                                <p
                                    className="mt-2 text-sm text-red-500"
                                    key={error}
                                >
                                    {error.toLowerCase() === "required"
                                        ? "Please select a customer"
                                        : error}
                                </p>
                            ))}
                    </div> */}
                </div>

                {/* Name of the Campaign */}
                <div className="mb-4">
                    <label
                        htmlFor="campaign-name"
                        className="mb-2 block text-sm font-medium"
                    >
                        Campaign Name
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="campaign-name"
                                name="campaign-name"
                                type="text"
                                step="0.01"
                                placeholder="Give your campaign a unique name"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                aria-describedby="campaign-name-error"
                            />
                            <MegaphoneIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>
                    {/* <div
                        id="campaign-name-error"
                        aria-live="polite"
                        aria-atomic="true"
                    >
                        {state.errors?.amount &&
                            state.errors.amount.map((error: string) => (
                                <p
                                    className="mt-2 text-sm text-red-500"
                                    key={error}
                                >
                                    {error}
                                </p>
                            ))}
                    </div> */}
                </div>

                {/* Invoice Status */}
                <fieldset>
                    <legend className="mb-2 block text-sm font-medium">
                        Set the invoice status
                    </legend>
                    <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
                        <div className="flex gap-4">
                            <div className="flex items-center">
                                <input
                                    id="pending"
                                    name="status"
                                    type="radio"
                                    value="pending"
                                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                                    aria-describedby="status-error"
                                />
                                <label
                                    htmlFor="pending"
                                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                                >
                                    Pending <ClockIcon className="h-4 w-4" />
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    id="paid"
                                    name="status"
                                    type="radio"
                                    value="paid"
                                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                                />
                                <label
                                    htmlFor="paid"
                                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                                >
                                    Paid <CheckIcon className="h-4 w-4" />
                                </label>
                            </div>
                        </div>
                    </div>
                </fieldset>
                {/* <div id="customer-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.status &&
                        state.errors.status.map((error: string) => (
                            <p
                                className="mt-2 text-sm text-red-500"
                                key={error}
                            >
                                {error.toLocaleLowerCase() === "required"
                                    ? "Please select a status"
                                    : error}
                            </p>
                        ))}
                </div>
                <div>
                    {state.errors && (
                        <p className="mt-2 text-sm text-red-500">
                            {state.message}
                        </p>
                    )}
                </div> */}
            </div>
            <div className="mt-6 flex justify-end gap-4">
                <Link
                    href="/dashboard/invoices"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    Cancel
                </Link>
                <Button type="submit">Create Invoice</Button>
            </div>
        </form>
    );
}
