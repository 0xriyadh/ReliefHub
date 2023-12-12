import { UpdateUser } from '@/app/ui/members/buttons';
import Status from '@/app/ui/members/status';
import { fetchFilteredUsers } from '@/app/lib/data';
import Link from 'next/link';
import { User } from '@/app/lib/definitions';
import { log } from 'util';

export default async function MembersTable({
  query,
  currentPage,
  user: loggedInUser,
}: {
  query: string;
  currentPage: number;
  user: User;
}) {
  const users = await fetchFilteredUsers(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            kindly use a desktop to view the table
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Role
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Type
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {users?.map((user) => (
                <tr
                  key={user.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                        <p className="hover:text-primary-color-600">
                          {user.name}
                        </p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">{user.email}</td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <Status status={user.role} />
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <Status status={user.type} />
                  </td>
                  {(loggedInUser.role === 'president' ||
                    loggedInUser.role === 'moderator') && (
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex justify-end gap-3">
                        <UpdateUser id={user.id} />
                        {/* <DeleteCampaign id={user.id} role={} /> */}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
