'use client';

import React from 'react';
import { SheetClose } from '@/components/ui/sheet';
import { sidebarLinks } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavContent = () => {
  const pathname = usePathname();
  return (
    <section className="flex h-full flex-1 flex-col gap-6 pt-16">
      {sidebarLinks.map((link) => {
        const isActive =
          (pathname.includes(link.route) && link.route.length > 1) ||
          pathname === link.route;

        return (
          <SheetClose asChild key={link.route}>
            <Link
              href={link.route}
              className={`${isActive ? 'primary-gradient rounded-lg text-light-900' : 'text-dark300_light900 hover:rounded-lg hover:bg-primary-500/20'} flex items-center justify-start gap-4 bg-transparent p-4`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={20}
                height={20}
                className={isActive ? '' : 'invert-colors'}
              />
              <p className={isActive ? 'base-bold' : 'base-medium'}>
                {link.label}
              </p>
            </Link>
          </SheetClose>
        );
      })}
    </section>
  );
};

export default NavContent;
