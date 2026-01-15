import Link from 'next/link';
import Image from 'next/image';
import ProfileProperties from '@/components/ProfileProperties';
import ProfileDefault from '@/assets/images/profile.png';
import { getSessionUserInServerr } from '@/utils/getSessionUser';
import connectTheDB from '@/config/database';
import Property from '@/models/Property';
import { convertToSerializableObject } from '@/utils/convertToObject';
const UserProfilePage = async () => {
  const sessionUser = await getSessionUserInServerr();
  //   console.log(sessionUser);
  await connectTheDB();

  const { userId } = sessionUser;
  if (!userId) {
    throw new Error('User ID is Required. Please Login or Register First');
  }
  const propertiesDocs = await Property.find({ ownerId: userId }).lean();
  const properties = propertiesDocs.map((doc) =>
    convertToSerializableObject(doc)
  );
  // console.log('this is very serius seriuuus serious?', properties);
  return (
    <section className='bg-blue-50'>
      <div className='container m-auto py-24'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <h1 className='text-3xl font-bold mb-4'>Your Profile</h1>
          <div className='flex flex-col md:flex-row'>
            <div className='md:w-1/4 mx-20 mt-10'>
              <div className='mb-4'>
                <Image
                  className='h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0'
                  src={sessionUser.user.image || ProfileDefault}
                  width={200}
                  height={200}
                  alt='User'
                />
              </div>

              <h2 className='text-2xl mb-4'>
                <span className='font-bold block'>Name: </span>{' '}
                {sessionUser.user.name}
              </h2>
              <h2 className='text-2xl'>
                <span className='font-bold block'>Email: </span>{' '}
                {sessionUser.user.email}
              </h2>
            </div>
            <div className='md:w-3/4 md:pl-4'>
              <h2 className='text-xl font-semibold mb-4'>Your Listings</h2>

              <ProfileProperties propertyAddedByUser={properties} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfilePage;
