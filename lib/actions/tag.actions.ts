'use server';

import Tag, { ITag } from '@/database/tag.model';
import { connectToDB } from '../mongoose';
import {
  GetAllTagsParams,
  GetQuestionsByTagIdParams,
  GetTopInteractedTagsParams,
} from './shared.types';
import User from '@/database/user.model';
import Question from '@/database/question.model';
import { FilterQuery } from 'mongoose';

export async function getAllTags(params: GetAllTagsParams) {
  try {
    connectToDB();

    const { page = 1, pageSize = 20 } = params;

    const tags = await Tag.find()
      .skip(pageSize * (page - 1))
      .limit(pageSize)
      .exec();

    return { tags };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    connectToDB();

    const { userId } = params;

    const user = await User.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    return [
      {
        _id: 'tag1',
        name: 'Tag 1',
      },
      {
        _id: 'tag2',
        name: 'Tag 2',
      },
      {
        _id: 'tag3',
        name: 'Tag 3',
      },
    ];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getQuestionsByTagId(params: GetQuestionsByTagIdParams) {
  try {
    connectToDB();

    const { tagId, page = 1, pageSize = 10, searchQuery } = params;
    const skipAmount = (page - 1) * pageSize;

    const tagFilter: FilterQuery<ITag> = { _id: tagId };

    const tag = await Tag.findOne(tagFilter).populate({
      path: 'questions',
      model: Question,
      match: searchQuery
        ? { title: { $regex: searchQuery, $options: 'i' } }
        : {},
      options: {
        sort: { createdAt: -1 },
        skip: skipAmount,
        limit: pageSize + 1, // +1 to check if there is next page
      },
      populate: [
        { path: 'tags', model: Tag, select: '_id name' },
        { path: 'author', model: User, select: '_id clerkId name picture' },
      ],
    });

    if (!tag) {
      throw new Error('Tag not found');
    }

    const isNext = tag.questions.length > pageSize;

    const questions = tag.questions;

    return { tagTitle: tag.name, questions, isNext };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
