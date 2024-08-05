'use client';

import { formUrlQuery } from '@/lib/utils';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
} from '@/components/ui/select';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

interface CountrySelectProps {
  defaultCountry?: string;
  countries: { name: string; flag: string; cca2: string }[];
  otherClasses?: string;
  containerClasses?: string;
}

const CountrySelect = ({
  defaultCountry,
  countries = [],
  containerClasses,
  otherClasses,
}: CountrySelectProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const paramFilter = searchParams.get('location') || defaultCountry || '';

  useEffect(() => {
    if (defaultCountry && !paramFilter) {
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: 'location',
        value: defaultCountry,
      });

      router.push(newUrl, { scroll: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdateParams = (value: string) => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: 'location',
      value,
    });

    router.push(newUrl, { scroll: false });
  };

  return (
    <div className={`relative ${containerClasses}`}>
      <Select
        onValueChange={handleUpdateParams}
        defaultValue={paramFilter || undefined}
      >
        <SelectTrigger
          className={`${otherClasses} body-regular background-light800_dark300 text-dark500_light700 border-0 px-5 py-2.5`}
        >
          <div className="line-clamp-1 flex flex-1 items-center gap-2 pr-5">
            <Image
              src="/assets/icons/location.svg"
              alt="location"
              width={18}
              height={18}
            />
            <SelectValue placeholder="Select Location" className="w-full" />
          </div>
        </SelectTrigger>
        <SelectContent className="text-dark500_light700 small-regular border-none bg-light-900 dark:bg-dark-300">
          <SelectGroup className="w-full">
            {countries?.length > 0 ? (
              countries.map((country) => (
                <SelectItem
                  key={country.name}
                  value={country.name}
                  iconAlt={country.name}
                  iconSrc={country.flag}
                  iconPosition="end"
                  className="w-full cursor-pointer focus:bg-light-800 dark:focus:bg-dark-400"
                >
                  {country.name}
                </SelectItem>
              ))
            ) : (
              <div className="flex min-h-[56px] w-full items-center justify-center">
                <p>No results</p>
              </div>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default CountrySelect;
