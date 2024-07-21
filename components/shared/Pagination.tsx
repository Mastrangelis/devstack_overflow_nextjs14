'use client';

import { formUrlQuery } from '@/lib/utils';
import { Button } from '../ui/button';
import { useRouter, useSearchParams } from 'next/navigation';

interface Props {
  pageNumber: number;
  isNext: boolean;
  total?: number;
}

const Pagination = ({ pageNumber, isNext, total = 0 }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleNavigation = (
    direction: 'prev' | 'next' | 'pageClick',
    value?: string,
  ) => {
    const nextPageNumber =
      direction === 'prev' ? pageNumber - 1 : pageNumber + 1;

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: 'page',
      value: value || nextPageNumber.toString(),
    });

    router.push(newUrl);
  };

  if (!isNext && pageNumber === 1) return null;

  return (
    <div className="flex w-full items-center justify-center gap-2">
      <Button
        disabled={pageNumber === 1}
        onClick={() => handleNavigation('prev')}
        className="light-border-2 btn flex min-h-[36px] items-center justify-center gap-2 border"
      >
        <p className="body-medium text-dark200_light800">Prev</p>
      </Button>

      <Button
        className="flex items-center justify-center rounded-md bg-primary-500 px-3.5 py-2"
        onClick={() => handleNavigation('pageClick', pageNumber.toString())}
      >
        <p
          className={`body-semibold text-light-900 ${pageNumber && 'text-light-900'}`}
        >
          {pageNumber}
        </p>
      </Button>

      {pageNumber + 1 <= total && (
        <Button
          className={`btn flex items-center justify-center rounded-md ${pageNumber === pageNumber + 1 && 'bg-primary-500'} px-3.5 py-2`}
          onClick={() =>
            handleNavigation('pageClick', (pageNumber + 1).toString())
          }
        >
          <p
            className={`body-semibold text-dark200_light800 ${pageNumber === pageNumber + 1 && 'text-light-900'}`}
          >
            {pageNumber + 1}
          </p>
        </Button>
      )}
      {pageNumber + 2 <= total && (
        <Button
          className={`btn flex items-center justify-center rounded-md ${pageNumber === pageNumber + 2 && 'bg-primary-500'} px-3.5 py-2`}
          onClick={() =>
            handleNavigation('pageClick', (pageNumber + 2).toString())
          }
        >
          <p
            className={`body-semibold ${pageNumber === pageNumber + 2 ? 'text-light-900' : 'text-dark200_light800'}`}
          >
            {pageNumber + 2}
          </p>
        </Button>
      )}

      {pageNumber + 3 <= total && (
        <Button
          className={`btn flex items-center justify-center rounded-md ${pageNumber === pageNumber + 3 && 'bg-primary-500'} px-3.5 py-2`}
          onClick={() =>
            handleNavigation('pageClick', (pageNumber + 3).toString())
          }
        >
          <p
            className={`body-semibold ${pageNumber === pageNumber + 3 ? 'text-light-900' : 'text-dark200_light800'}`}
          >
            {pageNumber + 3}
          </p>
        </Button>
      )}

      <Button
        disabled={!isNext}
        onClick={() => handleNavigation('next')}
        className="light-border-2 btn flex min-h-[36px] items-center justify-center gap-2 border"
      >
        <p className="body-medium text-dark200_light800">Next</p>
      </Button>
    </div>
  );
};

export default Pagination;
