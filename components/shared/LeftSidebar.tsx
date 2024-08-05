'use client';

import React from 'react';
import { sidebarLinks } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';
import { SignedIn, SignedOut, useAuth } from '@clerk/nextjs';

const LeftSidebar = () => {
  const { userId, signOut } = useAuth();
  const pathname = usePathname();

  return (
    <section className="background-light900_dark200 light-border custom-scrollbar sticky left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-md:hidden lg:w-[266px]">
      <div className="flex flex-1 flex-col gap-6">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          if (link.route === '/profile') {
            if (userId) {
              link.route = `${link.route}/${userId}`;
            } else {
              return null;
            }
          }

          return (
            <Link
              key={link.route}
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
              <p
                className={`${isActive ? 'base-bold' : 'base-medium'} max-lg:hidden`}
              >
                {link.label}
              </p>
            </Link>
          );
        })}
      </div>

      <SignedIn>
        <Button
          className="small-medium primary-gradient min-h-[41px] w-full rounded-lg px-4 py-3 text-white shadow-none ring-0 hover:opacity-90 focus:ring-0"
          onClick={() => signOut()}
        >
          <Image
            src="/assets/icons/logout.svg"
            width={20}
            height={20}
            alt="Logout"
          />
          <span className="ml-2 max-lg:hidden">Logout</span>
        </Button>
      </SignedIn>

      <SignedOut>
        <div className="flex flex-col gap-3">
          <Link href="/sign-in">
            <Button className="small-medium primary-gradient flex min-h-[41px] w-full items-center gap-3 rounded-lg px-4 py-3 text-white shadow-none hover:opacity-90">
              <Image
                src="/assets/icons/account.svg"
                alt="Login"
                width={20}
                height={20}
              />
              <span className="max-lg:hidden">Log in</span>
            </Button>
          </Link>

          <Link href="/sign-up">
            <Button className="small-medium btn-tertiary text-dark400_light900 flex min-h-[41px] w-full items-center gap-3 rounded-lg border border-primary-500/50 px-4 py-3 shadow-none">
              <Image
                src="/assets/icons/signup.svg"
                alt="Signup"
                width={20}
                height={20}
                className="invert-colors"
              />
              <span className="max-lg:hidden">Sign up</span>
            </Button>
          </Link>
        </div>
      </SignedOut>
    </section>
  );
};

export default LeftSidebar;
