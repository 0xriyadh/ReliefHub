'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { name: 'Stocks', f_href: '/admin/campaigns/', l_href: '' },
  {
    name: 'Teams',
    f_href: '/admin/campaigns/',
    l_href: '/teams',
  },
  {
    name: 'Reliefs',
    f_href: '/admin/campaigns/',
    l_href: '/reliefs',
  },
  {
    name: 'Donations',
    f_href: '/admin/campaigns/',
    l_href: '/donations',
  },
];

const customHref = (id: string, f_href: string, l_href: string) => {
  return f_href + id + l_href;
};

export default function NestedNav({ id }: { id: string }) {
  const pathname = usePathname();
  console.log(typeof pathname);
  if (pathname == `/admin/campaigns/${id}/edit`) {
    return <></>;
  }
  return (
    <div>
      {/* Navbar to choose between Stock, Teams, Reliefs, Donations */}
      <div className="flex justify-center">
        <div className="flex flex-row items-center justify-center space-x-4 border-2 border-gray-700 p-1 font-semibold">
          {links.map((link) => (
            <Link
              href={customHref(id, link.f_href, link.l_href)}
              key={link.name}
              className={`px-4 py-2 hover:text-gray-500 ${
                pathname == customHref(id, link.f_href, link.l_href) &&
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
