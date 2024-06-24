'use server';

import { connectToDB } from '../mongoose';
import { GetTopInteractedTagsParams } from './shared.types';
import User from '@/database/user.model';

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
