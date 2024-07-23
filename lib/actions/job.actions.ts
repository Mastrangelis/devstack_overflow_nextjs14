import { GetJobsParams } from './shared.types';

export async function getAllJobs() {
  const response = await fetch(
    `https://jsearch.p.rapidapi.com/search?query=Nextjs&page=1&num_pages=1&date_posted=all`,
    {
      headers: {
        'Content-Type': 'application/json',
        'x-rapidapi-host': 'jsearch.p.rapidapi.com',
        'x-rapidapi-key': `${process.env.X_RAPID_API_KEY}`,
      },
    },
  );

  const result = await response.json();

  if (
    !result?.data ||
    !Array.isArray(result?.data) ||
    result?.data.length === 0
  ) {
    return { jobs: [] };
  }

  return { jobs: result.data };
}

export async function getJobsByQuery(params: GetJobsParams) {
  console.log(params);

  const query = `${params.query || 'react'} in ${params.location?.toLowerCase()}`;

  const response = await fetch(
    `https://jsearch.p.rapidapi.com/search?query=${query}&page=${params.page}&location=${params.location}&date_posted=all&radious=100&keywords=software+engineer&min_salary=50000&industry=technology&page_size=5&sort_by=salary`,
    {
      headers: {
        'Content-Type': 'application/json',
        'x-rapidapi-host': 'jsearch.p.rapidapi.com',
        'x-rapidapi-key': `${process.env.X_RAPID_API_KEY}`,
      },
    },
  );

  const result = await response.json();

  if (
    !result?.data ||
    !Array.isArray(result?.data) ||
    result?.data.length === 0
  ) {
    return { jobs: [] };
  }

  const jobs = result.data;
  const totalJobs = result.data?.length || 0;

  return { jobs, isNext: !(totalJobs < 10) };
}
