'use client';

import Image from 'next/image';
import React from 'react';
import { Input } from '@/components/ui/input';

interface LocalSearchProps {
  route: string;
  iconPosition: 'left' | 'right';
  imgSrc: string;
  placeholder: string;
  otherClasses: string;
}

const LocalSearch = ({
  route,
  iconPosition,
  imgSrc,
  placeholder,
  otherClasses,
}: LocalSearchProps) => {
  return (
    <div
      className={`background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}
    >
      {iconPosition === 'left' && (
        <Image
          src={imgSrc}
          width={24}
          height={24}
          alt="Local Search"
          className="cursor-pointer"
        />
      )}

      <Input
        type="text"
        placeholder={placeholder}
        value=""
        onChange={() => {}}
        className="paragraph-regular no-focus placeholder background-light800_darkgradient border-none shadow-none outline-none"
      />

      {iconPosition === 'right' && (
        <Image
          src={imgSrc}
          width={24}
          height={24}
          alt="Local Search"
          className="cursor-pointer"
        />
      )}
    </div>
  );
};

export default LocalSearch;
