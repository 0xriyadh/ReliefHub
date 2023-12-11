'use client';
import { CalculatorIcon, GiftIcon } from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { StocksTable } from '@/app/lib/definitions';
import { createReliefStock } from '@/app/lib/actions';
import Link from 'next/link';

export default function CreateReliefStockForm({
  reliefId,
  campaignId,
  donationItemsFromCampaignStocksNotInReliefStocks: items,
}: {
  reliefId: string;
  campaignId: string;
  donationItemsFromCampaignStocksNotInReliefStocks: StocksTable[];
}) {
  const reliefStock = createReliefStock.bind(null, reliefId, campaignId, items);
  return (
    <form action={reliefStock}>
      <div className="bg-gray-50 p-4 md:p-6">
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
              {items.map((item) => (
                <option
                  key={item.donation_item_id}
                  value={item.donation_item_id}
                >
                  {item.item_name +
                    ' ' +
                    `(${item.item_quantity.toLocaleString()} ${
                      item.item_unit
                    } left)`}
                  `(${item.item_quantity.toLocaleString()} ${item.item_unit}{' '}
                  left)`
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
          href={`/admin/relief/${reliefId}`}
          className="flex h-10 items-center bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Add to Relief Stock</Button>
      </div>
    </form>
  );
}
