import clsx from 'clsx';

export default function Status({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-gray-100 text-gray-600': status === 'archived',
          'bg-green-400 text-white': status === 'active',
          'bg-orange-200 text-gray-800': status === 'pending',
          'bg-blue-200 text-gray-800': status === 'accepted',
          'bg-green-200 text-gray-800': status === 'received',
        },
      )}
    >
      {status === 'active' ? <>Active</> : null}
      {status === 'archived' ? <>Archived</> : null}
      {status === 'pending' ? <>Pending</> : null}
      {status === 'accepted' ? <>Accepted</> : null}
      {status === 'received' ? <>Received</> : null}
    </span>
  );
}
