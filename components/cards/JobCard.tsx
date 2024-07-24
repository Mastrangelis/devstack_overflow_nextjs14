import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { getCountryFlagByCode } from '@/lib/actions/country.actions';
import Tag from '../shared/Tag';
import { kFormatter } from '@/lib/utils';

interface JobCardProps {
  job: {
    jobId: string;
    employerName: string;
    employerLogo: string;
    employerWebsite: string;
    employmentType: string;
    jobTitle: string;
    jobCity: string;
    jobState: string;
    jobCountry: string;
    jobApplyLink: string;
    jobDescription: string;
    jobMinSalary: number | null;
    jobMaxSalary: number | null;
    jobIsRemote: boolean;
  };
}

const JobCard = async ({ job }: JobCardProps) => {
  const countryFlag = await getCountryFlagByCode(job.jobCountry);

  return (
    <section className="background-light900_dark200 light-border shadow-light100_darknone flex flex-col items-start gap-6 rounded-lg border p-6 sm:flex-row sm:p-8">
      <div className="flex min-h-[64px] w-full items-start justify-between gap-2">
        <Link href={job?.employerWebsite || ''} className="size-12 rounded-xl">
          <Image
            src={job?.employerLogo || '/assets/icons/profile.svg'}
            alt={job?.employerName}
            width={48}
            height={48}
            className="size-12 cursor-pointer rounded-lg object-contain"
          />
        </Link>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center justify-between max-sm:flex-col max-sm:items-start max-sm:gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {job?.jobTitle}
            </h3>
            <Tag
              _id={job.jobId}
              name={job.jobIsRemote ? 'REMOTE' : 'ON-SITE'}
            />
          </div>

          <div className="background-light800_dark400 flex items-center gap-2 rounded-2xl px-3 py-1.5">
            <Image
              src={countryFlag || '/assets/icons/location.svg'}
              alt={countryFlag ? job.jobCountry : 'location'}
              width={20}
              height={20}
              className="rounded-full"
            />
            <span className="body-medium text-dark400_light700">
              {job.jobCity ? `${job.jobCity}, ` : ''}
              {job.jobState ? `${job.jobState}, ` : ''}
              {job.jobCountry}
            </span>
          </div>
        </div>

        <div className="body-regular text-dark500_light700 mt-2 line-clamp-5 break-all max-sm:mt-5">
          {job.jobDescription}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between">
          <div className="text-light400_light500 flex flex-wrap items-center gap-2 sm:gap-5">
            <div className="flex items-center gap-1 sm:gap-2">
              <Image
                src={'/assets/icons/clock-2.svg'}
                alt="employment type"
                width={20}
                height={20}
              />

              <p className="body-medium lowercase text-light-500 first-letter:uppercase">
                {job?.employmentType}
              </p>
            </div>

            <div className="flex items-center gap-1 sm:gap-2">
              <Image
                src={'/assets/icons/currency-dollar-circle.svg'}
                alt="salary"
                width={20}
                height={20}
              />

              <p className="body-medium text-light-500">
                {job.jobMinSalary && job.jobMaxSalary
                  ? `$ ${kFormatter(job.jobMinSalary)} - ${kFormatter(job.jobMaxSalary)}`
                  : 'Disclosed'}
              </p>
            </div>
          </div>

          <Link
            href={job?.jobApplyLink}
            className="flex items-center gap-2 text-primary-500"
          >
            <p className="body-semibold primary-text-gradient">View job</p>
            <Image
              src="/assets/icons/arrow-up-right.svg"
              alt="link"
              width={20}
              height={20}
              className="cursor-pointer"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default JobCard;
