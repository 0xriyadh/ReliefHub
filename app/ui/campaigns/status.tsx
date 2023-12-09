import clsx from 'clsx';

export default function Status({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-gray-100 text-gray-600': status === 'archived',
          'bg-green-400 text-white': status === 'active',
        },
      )}
    >
      {status === 'active' ? <>Active</> : null}
      {status === 'archived' ? <>Archived</> : null}
    </span>
  );
}
