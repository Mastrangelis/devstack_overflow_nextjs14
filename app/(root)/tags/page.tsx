import Filter from '@/components/shared/Filter';
import LocalSearch from '@/components/shared/search/LocalSearch';
import { TagFilters } from '@/constants/filters';
import { getAllTags } from '@/lib/actions/tag.actions';
import TagCard from '@/components/cards/TagCard';
import NoResult from '@/components/shared/NoResult';
import { SearchParamsProps } from '@/types';
import Pagination from '@/components/shared/Pagination';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tags | Dev Overflow',
  description: 'Tags for all the questions asked by the community members',
};

const Tags = async ({ searchParams }: SearchParamsProps) => {
  const { tags, isNext } = await getAllTags({
    page: 1,
    pageSize: 20,
    searchQuery: searchParams.q,
    filter: searchParams.filter,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">All Tags</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route="/tags"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for amazing minds"
          otherClasses="flex-1"
        />
        <Filter
          filters={TagFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <section className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {tags?.length > 0 ? (
          tags.map((tag) => <TagCard key={tag._id} tag={tag} />)
        ) : (
          <NoResult
            title="No Tags found"
            description="It looks like there are not tags found."
            link="/ask-question"
            linkTitle="Ask a question"
          />
        )}
      </section>

      <div className="mt-10">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={isNext}
        />
      </div>
    </>
  );
};

export default Tags;
