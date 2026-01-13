'use server';
import connectTheDB from '@/config/database';
import Property from '@/models/Property';
import Messages from '@/models/Messages';
import { getSessionUserInServerr } from '@/utils/getSessionUser';
import { redirect } from 'next/navigation'; // to redirect to another page after adding messages
import { revalidatePath } from 'next/cache'; // this is so that after adding messages we can see it in the listing page without refreshing
// import cloudinary from '@/config/cloudinary';
export default async function addMessages(previousState, formData) {
  console.log('addMessages action called!');
  await connectTheDB();

  const sessionUser = await getSessionUserInServerr();
  console.log('sessionUser:', sessionUser);
  if (!sessionUser || !sessionUser.userId) {
    throw new Error('User needs to be Signed In');
  }
  const { userId } = sessionUser;
  const receiverId = formData.get('recepient');
  // console.log(
  //   'userId:',
  //   userId,
  //   'receiverId:',
  //   receiverId,
  //   'equal:',
  //   userId === receiverId
  // );
  if (userId === receiverId) {
    return { error: "You can't send the message to yourself" };
  }
  //   const { ownerId } = await User.findById(ownerId);
  const messageForm = new Messages({
    senderId: userId,
    recipientId: receiverId,
    propertyId: formData.get('propertyId'),
    senderName: formData.get('name'),
    senderEmail: formData.get('email'),
    senderPhone: formData.get('phone'),
    message: formData.get('message'),
  });

  //save to databse
  // const thenewMessage = new Messages(messageForm);
  await messageForm.save();

  // console.log(
  //   'the formData is////////////////////////////////////////////////////////: ',
  //   messageForm
  // );

  // revalidate the cache
  //   revalidatePath('/properties', '/', '/layout');

  // Return the new messages ID for client-side redirect
  return { submitted: true };
}
