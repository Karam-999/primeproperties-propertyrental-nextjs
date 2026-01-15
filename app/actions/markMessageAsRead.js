'use server';
import connectTheDB from '@/config/database';
import Messages from '@/models/Messages';
import { getSessionUserInServerr } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';

async function markMessageAsRead(messageId) {
  await connectTheDB();
  const sessionUser = await getSessionUserInServerr();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error('User Id is required to bookmark');
  }

  const { userId } = sessionUser;
    const messages = await Messages.findById(messageId);
    if (!messages) {
        throw new Error('Message not found');
    }
    if (messages.recipientId.toString() !== userId) {
        throw new Error('You are not authorized to view this message');
    }
    messages.read = !messages.read;
    revalidatePath('/messages', 'page');
    await messages.save();
  return messages.read;
}
export default markMessageAsRead;
