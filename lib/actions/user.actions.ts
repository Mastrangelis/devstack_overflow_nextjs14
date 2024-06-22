'use server';

import User from '@/database/user.model';
import { connectToDB } from '../mongoose';
import {
  CreateUserParams,
  DeleteUserParams,
  UpdateUserParams,
} from './shared.types';
import { revalidatePath } from 'next/cache';
import Question from '@/database/question.model';

export async function getUserById(params: any) {
  try {
    connectToDB();

    const { userId } = params;

    const user = await User.findOne({ clerkId: userId });

    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createUser(userData: CreateUserParams) {
  try {
    connectToDB();

    const newUser = await User.create(userData);

    return newUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateUser(userData: UpdateUserParams) {
  try {
    connectToDB();

    const { clerkId, updateData, path } = userData;

    await User.findOneAndUpdate(
      {
        clerkId,
      },
      updateData,
      { new: true },
    );

    revalidatePath(path);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteUser(params: DeleteUserParams) {
  try {
    connectToDB();

    const { clerkId } = params;

    const user = await User.findOne({
      clerkId,
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Delete user from all questions, answers, and comments.

    // eslint-disable-next-line no-unused-vars
    const userQuestions = await Question.find({ author: user._id }).distinct(
      '_id',
    );

    await Question.deleteMany({ author: user._id });

    // TODO: User answers, comments and more.
    // ...

    const deletedUser = await User.findByIdAndDelete(user._id);

    return deletedUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
