'use server';
import connectTheDB from '@/config/database';
import User from '@/models/User';
import { getSessionUserInServerr } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';

async function bookmarkProperty(propertyId) {
  await connectTheDB();
  const sessionUser = await getSessionUserInServerr();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error('User Id is required to bookmark');
  }

  const { userId } = sessionUser;
  const user = await User.findById(userId);
  let isBookmarked = user.favourites.includes(propertyId);
  let message;
  if (isBookmarked) {
    //remove from bookmark
    user.favourites.pull(propertyId);
    message = 'Bookmark Removed';
    isBookmarked = false;
  } else {
    //add to bookmark
    user.favourites.push(propertyId);
    message = 'Bookmark Added';
    isBookmarked = true;
  }
  await user.save();
  revalidatePath('/properties/saved', 'page');
  return { message, isBookmarked };
}
export default bookmarkProperty;
