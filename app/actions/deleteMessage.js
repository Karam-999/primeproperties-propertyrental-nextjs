'use server';
import Messages from '@/models/Messages';
import connectTheDB from '@/config/database';
// import Property from '@/models/Property';
import { getSessionUserInServerr } from '@/utils/getSessionUser';
import { redirect } from 'next/navigation'; // to redirect to another page after adding property
import { revalidatePath } from 'next/cache'; // this is so that after adding property we can see it in the listing page without refreshing
// import cloudinary from '@/config/cloudinary';

export const deletetheMessage = async (messageId) => {
  const sessionUserr = await getSessionUserInServerr();
  if (!sessionUserr || !sessionUserr.userId) {
    throw new Error('Please login to delete the Property');
  }
  const { userId } = sessionUserr;
  await connectTheDB();
  // const propertyToDelete = await Property.findOne({ ownerId: userId }).lean();//this will find the property
  const PropertyTobeDeleted = await Messages.findById(messageId);

  //verify owner
  if (PropertyTobeDeleted.recipientId.toString() !== userId) {
    throw new Error('You are not authorized to delete this Message');
  }

  //   //extract the publlic ids from the cloudinary imageUrls
  //   const imagesPublicIds = propertyTobeDeleted.images.map((imageUrl) => {
  //     //example image url: https://res.cloudinary.com/karam-is-a-dev/image/upload/v1767790/LivingLink/vhdp112fpo2zmu3g8hcs.jpg
  //     return imageUrl.split('/').at(-1).split('.').at(0); //vhdp112fpo2zmu3g8hcs
  //   });
  //   //delete the images from cloudinary
  //   for (const publicId of imagesPublicIds) {
  //     await cloudinary.uploader.destroy('LivingLink/' + publicId);
  //   }
  await PropertyTobeDeleted.deleteOne();
  revalidatePath('/messages', 'layout');
};
