'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeProvider';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui/menubar';
import Image from 'next/image';
import { themes } from '@/constants';

const Theme = () => {
  const { mode, setMode } = useTheme();

  const themeData = themes.find((theme) => theme.value === mode);

  return (
    <Menubar className="relative border-none bg-transparent shadow-none">
      <MenubarMenu>
        {themeData?.icon && themeData?.value && (
          <MenubarTrigger className="min-w-12 cursor-pointer focus:bg-light-900 data-[state=open]:bg-light-900 dark:focus:bg-dark-200 dark:data-[state=open]:bg-dark-200 md:flex md:min-w-24 md:items-center md:justify-center md:rounded-xl md:border md:border-orange-500/30 md:p-2">
            {themeData?.icon && themeData?.value && (
              <div className="flex items-center gap-2">
                <Image
                  src={themeData?.icon!}
                  alt={themeData?.value!}
                  width={20}
                  height={20}
                  className="active-theme"
                />
                <p className="body-semibold text-dark100_light900 max-md:hidden">
                  {themeData?.label}
                </p>
              </div>
            )}
          </MenubarTrigger>
        )}
        <MenubarContent className="absolute -right-12 mt-3 min-w-[120px] rounded border bg-light-900 py-2 dark:border-dark-400 dark:bg-dark-300">
          {themes.map((theme) => (
            <MenubarItem
              key={theme.value}
              onClick={() => {
                localStorage.setItem('theme', theme.value);
                setMode(theme.value);
              }}
              className="flex cursor-pointer items-center gap-4 px-2.5 py-2 focus:bg-light-800 dark:focus:bg-dark-400"
            >
              <Image
                src={theme.icon}
                alt={theme.value}
                width={16}
                height={16}
                className={`${mode === theme.value && 'active-theme'}`}
              />
              <p
                className={`body-semibold text-light-500 ${mode === theme.value ? 'text-primary-500' : 'text-dark100_light900'}`}
              >
                {theme.label}
              </p>
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default Theme;
