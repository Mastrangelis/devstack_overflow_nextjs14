import Link from 'next/link';
import React from 'react';
import { Badge } from '../ui/badge';

interface TagProps {
  _id: string;
  name: string;
  totalQuestions?: number;
  showCount?: boolean;
  otherClasses?: string;
}
const Tag = ({
  _id,
  name,
  totalQuestions,
  showCount,
  otherClasses = '',
}: TagProps) => {
  return (
    <Link
      href={`/tags/${_id}`}
      className={`flex ${otherClasses} justify-between gap-2`}
    >
      <Badge className="subtle-medium background-light800_dark300 text-light400_light500  break-all rounded-md border-none px-4 py-1 uppercase">
        {name}
      </Badge>
      {showCount && (
        <p className="small-medium text-dark500_light700">{totalQuestions}</p>
      )}
    </Link>
  );
};

export default Tag;
