'use server';
import connectTheDB from '@/config/database';
import Messages from '@/models/Messages';
import { getSessionUserInServerr } from '@/utils/getSessionUser';

async function getUnreadMessageCount() {
  try {
    await connectTheDB();
    const sessionUser = await getSessionUserInServerr();
    // console.log('getUnreadMessageCount - sessionUser:', sessionUser);
    if (!sessionUser || !sessionUser.userId) {
      // console.log('No session user found');
      throw new Error('User Id is required to get unread messages');
    }
    const { userId } = sessionUser;
    // console.log('User ID:', userId);
    // console.log('User ID type:', typeof userId);
    // Count messages whose recipientId is userId and read is false
    const count = await Messages.countDocuments({
      recipientId: userId,
      read: false,
    });
    // console.log('Unread message count:', count);
    // Also log some debug info about all messages for this user
    const allUserMessages = await Messages.find({ recipientId: userId });
    // console.log('Total messages for user:', allUserMessages.length);
    // // console.log(
    //   'Messages:',
    //   allUserMessages.map((m) => ({
    //     id: m._id,
    //     read: m.read,
    //     recipientId: m.recipientId?.toString(),
    //   }))
    // );
    return { count };
  } catch (error) {
    console.error('Error in getUnreadMessageCount:', error);
    throw error;
  }
}

export default getUnreadMessageCount;
