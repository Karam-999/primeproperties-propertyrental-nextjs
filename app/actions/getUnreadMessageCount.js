'use server';
import connectTheDB from '@/config/database';
import Messages from '@/models/Messages';
import { getSessionUserInServerr } from '@/utils/getSessionUser';
// import { revalidatePath } from 'next/cache';

async function getUnreadMessageCount() {
  // noStore();
  await connectTheDB();
  const sessionUser = await getSessionUserInServerr();

  console.log('getUnreadMessageCount: sessionUser:', sessionUser);

  if (!sessionUser || !sessionUser.userId) {
    throw new Error('User Id is required to bookmark');
  }

  const { userId } = sessionUser;

  console.log('getUnreadMessageCount: userId:', userId);

  //count messages whose recipientId is userId and read is false
  const count = await Messages.countDocuments({
    recipientId: userId,
    read: false,
  });
        
  console.log('getUnreadMessageCount: count:', count);

  return { count };
}
export default getUnreadMessageCount;
