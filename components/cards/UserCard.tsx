import { getTopInteractedTags } from '@/lib/actions/tag.actions';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Badge } from '../ui/badge';
import Tag from '../shared/Tag';

interface UserCardProps {
  user: {
    _id: string;
    clerkId: string;
    picture: string;
    name: string;
    username: string;
  };
}

const UserCard = async ({ user }: UserCardProps) => {
  const interactedTags = await getTopInteractedTags({ userId: user._id });

  return (
    <Link
      href={`/profile/${user.clerkId}`}
      className="shadow-light100_darknone w-full rounded-2xl sm:w-[280px]"
    >
      <article className="background-light900_dark200 light-border flex size-full flex-col items-center rounded-2xl border p-8">
        <Image
          src={user.picture}
          alt="user profile picture"
          width={86}
          height={86}
          className="size-[100px] rounded-full"
        />
        <div className="mt-4 text-center">
          <h3 className="h3-bold text-dark200_light900 line-clamp-1">
            {user.name}
          </h3>
          <p className="body-regular text-dark500_light500 mt-2 line-clamp-1">
            {user.username}
          </p>
        </div>

        <div className="mt-5 flex flex-wrap">
          {interactedTags?.length > 0 ? (
            <div className="flex flex-wrap items-center gap-2">
              {interactedTags.map((tag) => (
                <Tag key={tag._id} _id={tag._id} name={tag.name} />
              ))}
            </div>
          ) : (
            <Badge>Not tags yet</Badge>
          )}
        </div>
      </article>
    </Link>
  );
};

export default UserCard;
