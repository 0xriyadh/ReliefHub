import { ArrowPathIcon, MapPinIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { fetchRecipientReceiveReliefsById } from '@/app/lib/data';
export default async function LatestReliefReceived({
  recipientId,
}: {
  recipientId: string;
}) {
  const latestReliefReceived =
    await fetchRecipientReceiveReliefsById(recipientId);
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className="mb-4 text-xl md:text-2xl">I have recently received these reliefs</h2>
      <div className="flex grow flex-col justify-between bg-gray-50 p-4">
        <div className="bg-white px-6">
          {latestReliefReceived.map((relief, i) => {
            return (
              <div
                key={relief.relief_id}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t': i !== 0,
                  },
                )}
              >
                <div className="flex items-center">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {relief.relief_name}
                    </p>
                  </div>
                </div>
                <p className="truncate text-sm font-medium md:text-base">
                  {relief.quantity.toLocaleString()} {relief.item_unit}{' '}
                  {relief.item_name !== 'Money' && (
                    <span>of {relief.item_name}</span>
                  )}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
