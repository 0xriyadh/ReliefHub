// import { deleteInvoice } from '@/app/lib/actions';
import { deleteCampaign } from '@/app/lib/actions';
import {
  fetchIfAnyStockItemWithCampaignId,
  fetchIfAnyTeamWithCampaignId,
  fetchTeamsCountWithCampaignId,
  fetchTeamsWithCampaignId,
} from '@/app/lib/data';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export function UpdateUser({ id }: { id: string }) {
  return (
    <Link href={`/admin/members/${id}`} className={`hover:text-green-500} p-2`}>
      <PencilIcon className="w-5" />
    </Link>
  );
}

export async function DeleteUser({ id, role }: { id: string; role: string }) {
  const deleteCampaignWithId = deleteCampaign.bind(null, id);
  const anyTeamExist = await fetchIfAnyTeamWithCampaignId(id);
  const stockItemExist = await fetchIfAnyStockItemWithCampaignId(id);
  return (
    <>
      <form action={deleteCampaignWithId}>
        <button
          className={`p-2 ${
            anyTeamExist || stockItemExist || role !== 'president'
              ? 'cursor-not-allowed text-gray-200'
              : 'text-red-500 hover:text-red-200'
          }`}
          disabled={anyTeamExist || stockItemExist}
        >
          <span className="sr-only">Delete</span>
          <TrashIcon className="w-5" />
        </button>
      </form>
    </>
  );
}
