'use server';
import connectTheDB from '@/config/database';
import User from '@/models/User';
import { getSessionUserInServerr } from '@/utils/getSessionUser';
// import { revalidatePath } from 'next/cache';

async function checkBookmarkStatus(propertyId) {
  await connectTheDB();
  const sessionUser = await getSessionUserInServerr();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error('User Id is required to bookmark');
  }

  const { userId } = sessionUser;
  const user = await User.findById(userId);
  let isBookmarked = user.favourites.includes(propertyId);
 
  return {  isBookmarked };
}
export default checkBookmarkStatus;
