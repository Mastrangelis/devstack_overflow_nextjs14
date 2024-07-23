// import ClearQueryButton from '@/components/shared/ClearQueryButton';
import JobCard from '@/components/cards/JobCard';
import CountrySelect from '@/components/shared/CountrySelect';
import NoResult from '@/components/shared/NoResult';
import Pagination from '@/components/shared/Pagination';
import LocalSearchbar from '@/components/shared/search/LocalSearch';
// import { Button } from '@/components/ui/button';
import { getAllCountries } from '@/lib/actions/country.actions';
import { getJobsByQuery } from '@/lib/actions/job.actions';
import { getCurrentCountryLocation } from '@/lib/utils';
import { SearchParamsProps } from '@/types';
import React from 'react';

const JobsPage = async ({ searchParams }: SearchParamsProps) => {
  const { countries } = await getAllCountries();

  const currentLocationCountry = await getCurrentCountryLocation();

  const { jobs, isNext } = await getJobsByQuery({
    query: searchParams.q,
    page: searchParams.page ? +searchParams.page : 1,
    location: searchParams.location || currentLocationCountry,
  });

  return (
    <>
      <div className="flex w-full justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">Jobs</h1>
      </div>

      <div className="mt-11 flex justify-between gap-4 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/jobs"
          placeholder="Job Title, Company, or Keywords"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          otherClasses="flex-1"
        />

        <CountrySelect
          defaultCountry={currentLocationCountry}
          countries={countries}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />

        {/* <Button
          type="submit"
          className="primary-gradient min-h-[56px]  w-full !text-white sm:min-w-[120px]"
          // disabled={isSubmitting}
        >
          Find Jobs
        </Button> */}

        {/* <ClearQueryButton /> */}
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {jobs.length > 0 ? (
          jobs.map((job: any) => (
            <JobCard
              key={job.job_id}
              job={{
                jobId: job.job_id,
                employerName: job.employer_name,
                jobTitle: job.job_title,
                jobCity: job.job_city,
                jobCountry: job.job_country,
                jobDescription: job.job_description,
                jobState: job.job_state,
                employerWebsite: job.employer_website,
                employmentType: job.job_employment_type,
                employerLogo: job.employer_logo,
                jobApplyLink: job.job_apply_link,
                jobMinSalary: job.job_min_salary,
                jobMaxSalary: job.job_max_salary,
                jobIsRemote: job.job_is_remote,
              }}
            />
          ))
        ) : (
          <NoResult title="No available job listings at the moment" />
        )}
      </div>

      {jobs?.length > 0 && (
        <div className="mt-10">
          <Pagination
            pageNumber={searchParams?.page ? +searchParams.page : 1}
            isNext={!!isNext}
          />
        </div>
      )}
    </>
  );
};

export default JobsPage;
