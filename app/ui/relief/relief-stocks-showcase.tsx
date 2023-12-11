import {
  CurrencyBangladeshiIcon,
  GiftTopIcon,
  ScaleIcon,
  FaceFrownIcon,
} from '@heroicons/react/24/outline';
import { fetchCardData, fetchReliefStocks } from '@/app/lib/data';

const iconMap = {
  kg: ScaleIcon,
  piece: GiftTopIcon,
  BDT: CurrencyBangladeshiIcon,
};

export default async function ReliefStocksShowcase({
  reliefId,
}: {
  reliefId: string;
}) {
  const stocks = await fetchReliefStocks(reliefId);

  if (stocks.length <= 0) {
    return (
      <>
        <div className="flex items-center justify-center space-x-2 text-2xl h-60">
          <FaceFrownIcon className="h-10 w-10 text-gray-400" />
          <p className="text-gray-500">No stocks found for this relief</p>
        </div>
      </>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stocks.map((stock) => (
        <Card
          key={stock.transaction_id}
          title={stock.name}
          value={stock.quantity.toLocaleString() + ' ' + stock.unit}
          type={stock.unit}
        />
      ))}
    </div>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'kg' | 'piece' | 'BDT';
}) {
  const Icon = iconMap[type];

  return (
    <div className="bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p className="truncate bg-white px-4 py-8 text-center text-2xl">
        {value}
      </p>
    </div>
  );
}
