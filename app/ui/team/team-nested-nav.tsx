'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { name: 'Manage Moderators', f_href: '/admin/team/', l_href: '' },
  {
    name: 'Manage Volunteers',
    f_href: '/admin/team/',
    l_href: '/volunteers',
  },
];

const customHref = (id: string, f_href: string, l_href: string) => {
  return f_href + id + l_href;
};

export default function TeamfNestedNav({ teamId }: { teamId: string }) {
  const pathname = usePathname();
  
  return (
    <div>
      {/* Navbar to choose between Stock, Teams, Reliefs, Donations */}
      <div className="flex justify-center">
        <div className="flex flex-row items-center justify-center space-x-4 border-2 border-gray-700 p-1 font-semibold">
          {links.map((link) => (
            <Link
              href={customHref(teamId, link.f_href, link.l_href)}
              key={link.name}
              className={`px-4 py-2 hover:text-gray-500 ${
                pathname == customHref(teamId, link.f_href, link.l_href) &&
                'bg-gray-700 text-white'
              } `}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
