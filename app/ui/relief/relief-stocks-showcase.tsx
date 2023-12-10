import {
  CurrencyBangladeshiIcon,
  GifIcon,
  ScaleIcon,
} from '@heroicons/react/24/outline';
import { fetchCardData, fetchReliefStocks } from '@/app/lib/data';

const iconMap = {
  kg: ScaleIcon,
  piece: GifIcon,
  BDT: CurrencyBangladeshiIcon,
};

export default async function ReliefStocksShowcase({
  reliefId,
}: {
  reliefId: string;
}) {
  const stocks = await fetchReliefStocks(reliefId);

  return (
    <>
      {stocks.map((stock) => (
        <Card
          key={stock.transaction_id}
          title={stock.name}
          value={stock.quantity.toLocaleString() + ' ' + stock.unit}
          type={stock.unit}
        />
      ))}
    </>
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
