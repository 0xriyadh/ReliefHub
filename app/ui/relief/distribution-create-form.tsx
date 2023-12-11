'use client';

import Link from 'next/link';
import {
  MegaphoneIcon,
  UserIcon,
  UserGroupIcon,
  CalculatorIcon,
  GiftIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import {
  ReliefRecipientForDistribution,
  ReliefStocksField,
} from '@/app/lib/definitions';
import { createCampaignTeam, createDistributeRelief } from '@/app/lib/actions';

export default function CreateDistributionForm({
  reliefId,
  recipients,
  reliefStocks,
}: {
  reliefId: string;
  recipients: ReliefRecipientForDistribution[];
  reliefStocks: ReliefStocksField[];
  }) {
  const distributeRelief = createDistributeRelief.bind(
    null,
    reliefId,
    reliefStocks,
  );
  return (
    <form action={distributeRelief}>
      <div className="bg-gray-50 p-4 md:p-6">
        {/* Relief Recipient */}
        <div className="mb-4">
          <label htmlFor="recipient" className="mb-2 block text-sm font-medium">
            Recipient
          </label>
          <div className="relative">
            <select
              id="recipient"
              name="recipientId"
              className="peer block w-full cursor-pointer border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="recipient-error"
              required
            >
              <option value="" disabled>
                Choose a recipient to donate
              </option>
              {recipients.map((recipient) => (
                <option key={recipient.id} value={recipient.id}>
                  {recipient.name}
                </option>
              ))}
            </select>
            <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Distribution Item */}
        <div className="mb-4">
          <label htmlFor="item" className="mb-2 block text-sm font-medium">
            Distribution Item
          </label>
          <div className="relative">
            <select
              id="donationItem"
              name="donationItemId"
              className="peer block w-full cursor-pointer border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="donationItem-error"
              required
            >
              <option value="" disabled>
                Choose a distribution item to donate
              </option>
              {reliefStocks.map((item) => (
                <option key={item.transaction_id} value={item.item_id}>
                  {item.name +
                    ' ' +
                    `(${item.quantity.toLocaleString()} ${item.unit} left)`}
                </option>
              ))}
            </select>
            <GiftIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Quantity */}
        <div className="mb-4">
          <label htmlFor="quantity" className="mb-2 block text-sm font-medium">
            Quantity
          </label>
          <div className="relative">
            <input
              id="quantity"
              name="quantity"
              type="number"
              step="0.01"
              placeholder="How much quantity to donate"
              className="peer block w-full border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="quantity-error"
              required
            />
            <CalculatorIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href={`/admin/relief/${reliefId}/distributions`}
          className="flex h-10 items-center bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Distribute</Button>
      </div>
    </form>
  );
}
