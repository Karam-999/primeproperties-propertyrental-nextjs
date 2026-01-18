'use server';
import { revalidatePath } from 'next/cache'; // this is so that after adding property we can see it in the listing page without refreshing
import cloudinary from '@/config/cloudinary';
import Property from '@/models/Property';
import { convertToSerializableObject } from '@/utils/convertToObject';
import connectTheDB from '@/config/database';
import { getSessionUserInServerr } from '@/utils/getSessionUser';

const updatetheProperty = async (formData) => {
  await connectTheDB();

  const sessionUserr = await getSessionUserInServerr();
  if (!sessionUserr || !sessionUserr.userId) {
    throw new Error('Please login to update the property');
  }
  const { userId } = sessionUserr;
  const name1 = sessionUserr.user.name;
  const emaill = sessionUserr.user.email;

  const propertyId = formData.get('propertyId');
  const existingProperty = await Property.findById(propertyId);
  if (!existingProperty) {
    throw new Error('Property not found');
  }
  //verify owner
  if (existingProperty.ownerId.toString() !== userId) {
    throw new Error('You are not authorized to update this property');
  }
  //   const images = formData
  //     .getAll('images')
  //     .filter((emptyname) => emptyname.name != '');
  const amenities = formData.getAll('amenities');
  const forMData = {
    ownerId: userId,
    ownerName: name1,
    ownerEmail: emaill,
    propName: formData.get('name'),
    propType: formData.get('type'),
    propDescription: formData.get('description'),
    beds: formData.get('beds'),
    baths: formData.get('baths'),
    square_feet: formData.get('square_feet'),
    propLocation: {
      street: formData.get('location.street'),
      city: formData.get('location.city'),
      state: formData.get('location.state'),
      zipcode: formData.get('location.zipcode'),
    },
    // images,
    amenities,
    rates: {
      weekly: formData.get('rates.weekly'),
      nightly: formData.get('rates.nightly'),
      monthly: formData.get('rates.monthly'),
    },
    seller_info: {
      name: formData.get('seller_info.name'),
      email: formData.get('seller_info.email'),
      phone: formData.get('seller_info.phone'),
    },
  };
  //   const imageUrls = [];

  //   for (const imageFile of images) {
  //     const imageBuffer = await imageFile.arrayBuffer();
  //     const imageArray = Array.from(new Uint8Array(imageBuffer));
  //     const imageData = Buffer.from(imageArray);

  //     //convert to base64
  //     const imageBase64 = imageData.toString('base64');

  //     //make request to cloudinary
  //     const result = await cloudinary.uploader.upload(
  //       `data:image/png;base64,${imageBase64}`,
  //       {
  //         folder: 'LivingLink',
  //       }
  //     );
  //     imageUrls.push(result.secure_url);
  //   }
  //   forMData.images = imageUrls;
  const updatedProperty = await Property.findByIdAndUpdate(
    propertyId,
    forMData,
    { new: true }
  );
  revalidatePath('/properties', '/', '/layout');
  // Return the new property ID for client-side redirect
  return { success: true, propertyId: updatedProperty._id.toString() };
};
export default updatetheProperty;
