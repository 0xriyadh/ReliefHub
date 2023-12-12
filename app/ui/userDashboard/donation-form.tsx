'use client';
import { CalculatorIcon, GiftIcon, MegaphoneIcon } from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { CampaignsTable, DonationItemForm, StocksTable } from '@/app/lib/definitions';
import { createReliefStock, createTransactionDonation } from '@/app/lib/actions';
import Link from 'next/link';
import { use, useEffect, useState } from 'react';
import { fetchCampaignStocks } from '@/app/lib/data';

export default function DonationForm({
  donorId,
  campaigns,
  donationItems,
}: {
  donorId: string;
  campaigns: CampaignsTable[];
  donationItems: DonationItemForm[];
  }) {
  const createDonation = createTransactionDonation.bind(null, donorId);
  return (
    <form action={createDonation}>
      <div className="bg-gray-50 p-4 md:p-6">
        {/* Select Campaign */}
        <div className="mb-4">
          <label htmlFor="item" className="mb-2 block text-sm font-medium">
            Campaign
          </label>
          <div className="relative">
            <select
              id="campaign"
              name="campaignId"
              className="peer block w-full cursor-pointer border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="campaign-error"
              required
            >
              <option value="" disabled>
                Choose a campaign to donate
              </option>
              {campaigns.map((campaign) => (
                <option key={campaign.id} value={campaign.id}>
                  {campaign.name}
                </option>
              ))}
            </select>
            <MegaphoneIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Donation Item */}
        <div className="mb-4">
          <label htmlFor="item" className="mb-2 block text-sm font-medium">
            Donation Item
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
              {donationItems.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
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
          href={`/dashboard`}
          className="flex h-10 items-center bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Donate</Button>
      </div>
    </form>
  );
}
