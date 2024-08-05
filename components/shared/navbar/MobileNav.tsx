'use client';

import React from 'react';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import Image from 'next/image';
import Link from 'next/link';
import NavContent from './NavContent';
import { SignedIn, SignedOut, useAuth } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';

const MobileNav = () => {
  const { signOut } = useAuth();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          src="/assets/icons/hamburger.svg"
          width={36}
          height={36}
          alt="Menu"
          className="invert-colors md:hidden"
        />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="background-light900_dark200 overflow-y-auto border-none"
      >
        <Link href="/" className="flex items-center gap-1">
          <Image
            src="/assets/images/site-logo.svg"
            width={23}
            height={23}
            alt="DevFlow"
          />
          <p className="h2-bold text-dark100_light900 font-spaceGrotesk">
            Dev<span className="text-primary-500">500</span>
          </p>
        </Link>
        <div className="flex h-full flex-col">
          <SheetClose asChild>
            <NavContent />
          </SheetClose>

          <div className="py-8">
            <SignedIn>
              <SheetClose asChild>
                <Button
                  className="small-medium primary-gradient min-h-[41px] w-full rounded-lg px-4 py-3 text-white shadow-none ring-0 focus:ring-0"
                  onClick={() => signOut()}
                >
                  <Image
                    src="/assets/icons/logout.svg"
                    width={18}
                    height={18}
                    alt="Logout"
                    color="text-white"
                  />
                  <span className="ml-2">Logout</span>
                </Button>
              </SheetClose>
            </SignedIn>

            <SignedOut>
              <div className="flex flex-col gap-3">
                <SheetClose asChild>
                  <Link href="/sign-in">
                    <Button className="small-medium primary-gradient flex min-h-[41px] w-full items-center gap-3 rounded-lg px-4 py-3 text-white shadow-none hover:opacity-90">
                      <Image
                        src="/assets/icons/account.svg"
                        alt="Login"
                        width={20}
                        height={20}
                      />
                      <span>Log in</span>
                    </Button>
                  </Link>
                </SheetClose>

                <SheetClose asChild>
                  <Link href="/sign-up">
                    <Button className="small-medium btn-tertiary text-dark400_light900 flex min-h-[41px] w-full items-center gap-3 rounded-lg border border-primary-500/50 px-4 py-3 shadow-none">
                      <Image
                        src="/assets/icons/signup.svg"
                        alt="Signup"
                        width={20}
                        height={20}
                        className="invert-colors"
                      />
                      <span>Sign up</span>
                    </Button>
                  </Link>
                </SheetClose>
              </div>
            </SignedOut>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
