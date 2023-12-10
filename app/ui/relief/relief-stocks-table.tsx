import { fetchReliefStocks } from "@/app/lib/data";

export default async function ReliefStocksTable({
  reliefId,
}: {
  reliefId: string;
}) {
  const stocks = await fetchReliefStocks(reliefId);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            Kindly view this table on a larger screen.
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Item Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Quantity
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Unit
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {stocks?.map((stock) => (
                <tr
                  key={stock.transaction_id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{stock.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {stock.quantity.toLocaleString()}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {stock.unit}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
