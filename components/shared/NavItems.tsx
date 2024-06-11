'use client';
import React from 'react';
import { headerLinks } from '@/lib/constants/others';
import Link from 'next/link';
import Item from './Item';
import { usePathname } from 'next/navigation';

const NavItems = () => {
  return (
    <ul className="md:flex-between flex w-full gap-5">
      {headerLinks.map((link) => {
        const pathname = usePathname();
        const isActive = pathname === link.href;
        return (
          <li
            key={link.href}
            className={`${
              isActive && 'text-red-500'
            } cursor-pointer flex-center whitespace-nowrap`}
          >
            <Link href={link.href}>{link.label}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavItems;
