'use client';

import { removeKeysFromQuery } from '@/lib/utils';
import React from 'react';
import { Button } from '../ui/button';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';

const ClearQueryButton = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const onClearQueryClick = () => {
    const newUrl = removeKeysFromQuery({
      params: searchParams.toString(),
      keysToRemove: ['q'],
    });
    router.push(newUrl, { scroll: false });
  };

  return (
    <Button
      className="background-light800_dark300 text-dark500_light700 min-h-[56px] items-center gap-2 border py-2.5 max-md:flex sm:min-w-[80px]"
      onClick={onClearQueryClick}
    >
      <p>Clear</p>
      <Image src="/assets/icons/close.svg" alt="clear" width={18} height={18} />
    </Button>
  );
};

export default ClearQueryButton;
