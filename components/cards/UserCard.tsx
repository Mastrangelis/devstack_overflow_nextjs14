import { getTopInteractedTags } from '@/lib/actions/tag.actions';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Badge } from '../ui/badge';
import Tag from '../shared/Tag';
import { auth } from '@clerk/nextjs/server';

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
  const { userId: clerkId } = auth();

  const interactedTags = await getTopInteractedTags({ userId: user._id });

  return (
    <Link
      href={`/profile/${user.clerkId}`}
      className="shadow-light100_darknone rounded-2xl"
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
            @{user.username}
          </p>
        </div>

        <div className="mt-12 w-full">
          {interactedTags?.length > 0 ? (
            <div className="flex flex-wrap items-center gap-3">
              {interactedTags.map((tag) => (
                <Tag key={tag._id} _id={tag._id} name={tag.name} />
              ))}
            </div>
          ) : (
            <div className="flex size-full flex-col items-center justify-center gap-2">
              <Badge className="text-light400_light500">No tags yet 😞</Badge>
              {clerkId === user.clerkId && (
                <p className="small-medium text-dark400_light500">
                  Start
                  <Link
                    href="/ask-question"
                    className="primary-text-gradient ml-1 cursor-pointer"
                  >
                    Contributing
                  </Link>
                </p>
              )}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
};

export default UserCard;
