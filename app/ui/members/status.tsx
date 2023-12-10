import clsx from 'clsx';

export default function Status({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-gray-100 text-gray-600': status === 'recipient',
          'bg-green-500 text-white': status === 'volunteer',
          'bg-orange-400 text-white': status === 'moderator',
          'bg-red-400 text-white': status === 'president',
          'bg-blue-200 text-gray-800': status === 'donor',
        },
      )}
    >
      {status === 'president' ? <>President</> : null}
      {status === 'moderator' ? <>Moderator</> : null}
      {status === 'volunteer' ? <>Volunteer</> : null}
      {status === 'donor' ? <>Donor</> : null}
      {status === 'recipient' ? <>Recipient</> : null}
      {!status ? <>None</> : null}
    </span>
  );
}
