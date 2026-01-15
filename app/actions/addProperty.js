// export default function Page() {
'use server';
import connectTheDB from '@/config/database';
import Property from '@/models/Property';
import { getSessionUserInServerr } from '@/utils/getSessionUser';
// import { redirect } from 'next/navigation'; // to redirect to another page after adding property
import { revalidatePath } from 'next/cache'; // this is so that after adding property we can see it in the listing page without refreshing
import cloudinary from '@/config/cloudinary';
export default async function addProperty(initaialState, formData) {
  const amenities = formData.getAll('amenities');
  // console.log('the name of image is: ', formData.getAll('images'));
  // the name of image is:  [
  // File {
  //   size: 731057,
  //   type: 'image/png',
  //   name: 'Screenshot (2).png',
  //   lastModified: 1767703729049
  //   },
  // File {
  //   size: 388496,
  //   type: 'image/png',
  //   name: 'Screenshot 2026-01-03 022412.png',
  //   lastModified: 1767704219860
  // },
  // ]
  const images = formData
    .getAll('images')
    .filter((emptyname) => emptyname.name != '');
  // .map((data) => data.name);

  await connectTheDB();
  const sessionUser = await getSessionUserInServerr();
  // console.log('the fly fies and the cow moos', sessionUser);
  if (!sessionUser || !sessionUser.userId) {
    throw new Error('Please login or register to add the property');
  }

  const { userId } = sessionUser;
  const name1 = sessionUser.user.name;
  const emaill = sessionUser.user.email;
  // console.log('the view is so beautiful here', images);
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
    images,
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
  const imageUrls = [];

  for (const imageFile of images) {
    const imageBuffer = await imageFile.arrayBuffer();
    const imageArray = Array.from(new Uint8Array(imageBuffer));
    const imageData = Buffer.from(imageArray);

    //convert to base64
    const imageBase64 = imageData.toString('base64');

    //make request to cloudinary
    const result = await cloudinary.uploader.upload(
      `data:image/png;base64,${imageBase64}`,
      {
        folder: 'LivingLink',
      }
    );
    imageUrls.push(result.secure_url);
  }
  forMData.images = imageUrls;

  //save to databse
  const theNewProperty = new Property(forMData);
  await theNewProperty.save();

  // console.log('the formData is: ', forMData);

  // revalidate the cache
  revalidatePath('/properties', '/', '/layout');
  // redirect(`properties/${theNewProperty._id}`);
  // Return the new property ID for client-side redirect
  return { submitted: true, propertyId: theNewProperty._id.toString() };
}
