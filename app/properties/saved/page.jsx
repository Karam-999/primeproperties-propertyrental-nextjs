import PropertyCard from '@/components/PropertyCard';
import connectTheDB from '@/config/database';
import User from '@/models/User';
// import redirect from 'next/navigation';
import { getSessionUserInServerr } from '@/utils/getSessionUser';
import { redirect } from 'next/navigation';
const SavedPropertiesPage = async () => {
  await connectTheDB();
  const sessionUser = await getSessionUserInServerr();
  if (!sessionUser || !sessionUser.userId) {
    // throw new Error('You need to be Signed In');
    redirect('/');
  }

  const { userId } = sessionUser;
  //   const userData = await User.findById(userId).populate('favourites');
  //   console.log(
  // '----------------------------------------------------------------------------------',
  // userData
  //   );

  // ---------------------------------------------------------------------------------- {
  //   _id: new ObjectId('695bcf765b9b46cf7cf45ce9'),
  //   email: 'karam.sayed2024@gmail.com',
  //   username: 'Karam',
  //   image: 'https://lh3.googleusercontent.com/a/ACg8ocKjOGhF1JRPbH8WE69tTmJlQ9nlyaBsmLT-QZFI9V3ebXb_xQ=s96-c',
  //   favourites: [
  //     {
  //       propLocation: [Object],
  //       rates: [Object],
  //       seller_info: [Object],
  //       _id: new ObjectId('69602dd479d54b41bf47a9e3'),
  //       ownerId: new ObjectId('695bcf765b9b46cf7cf45ce9'),
  //       ownerName: 'Karam',
  //       ownerEmail: 'karam.sayed2024@gmail.com',
  //       propName: 'Bradley Mills',
  //       propType: 'Apartment',
  //       propDescription: 'adhaero laboriosam taedium',
  //       beds: 38,
  //       baths: 27,
  //       square_feet: 22,
  //       amenities: [Array],
  //       images: [Array],
  //       is_featured: false,
  //       createdAt: 2026-01-08T22:21:08.432Z,
  //       updatedAt: 2026-01-08T22:21:08.432Z,
  //       __v: 0
  //     },
  //     {
  //       propLocation: [Object],
  //       rates: [Object],
  //       seller_info: [Object],
  //       _id: new ObjectId('69603ffa79d54b41bf47aa68'),
  //       ownerId: new ObjectId('695bcf765b9b46cf7cf45ce9'),
  //       ownerName: 'Karam',
  //       ownerEmail: 'karam.sayed2024@gmail.com',
  //       propName: 'Neww / Christy Gutmann by karam',
  //       propType: 'House',
  //       propDescription: 'comitatus tepesco spiculum',
  //       beds: 2,
  //       baths: 7,
  //       square_feet: 7703,
  //       amenities: [Array],
  //       images: [Array],
  //       is_featured: false,
  //       createdAt: 2026-01-08T23:38:35.001Z,
  //       updatedAt: 2026-01-09T13:21:42.044Z,
  //       __v: 0
  //     },
  //     {
  //       propLocation: [Object],
  //       rates: [Object],
  //       seller_info: [Object],
  //       _id: new ObjectId('69603eb679d54b41bf47aa61'),
  //       ownerId: new ObjectId('695bcf765b9b46cf7cf45ce9'),
  //       ownerName: 'Karam',
  //       ownerEmail: 'karam.sayed2024@gmail.com',
  //       propName: 'Dr. Glenda Halvorson',
  //       propType: 'Cabin Or Cottage',
  //       propDescription: 'debeo alter adhaero',
  //       beds: 79,
  //       baths: 36,
  //       square_feet: 19,
  //       amenities: [Array],
  //       images: [Array],
  //       is_featured: false,
  //       createdAt: 2026-01-08T23:33:10.706Z,
  //       updatedAt: 2026-01-08T23:33:10.706Z,
  //       __v: 0
  //     }
  //   ],
  //   createdAt: 2026-01-05T14:49:26.943Z,
  //   updatedAt: 2026-01-10T12:32:32.277Z,
  //   __v: 41
  // }
  const { favourites } = await User.findById(userId).populate('favourites');
  //   console.log(
  //     '----------------------------------------------------------------------------------',
  //     favourites
  //   );

  return (
    // <!-- All Listings -->
    <section className='px-4 py-6'>
      <div className='container-xl lg:container m-auto px-4 py-6'>
        <h1 className='text-3xl font-bold text-center mb-6'>
          Your Saved Properties
        </h1>
        {favourites.length === 0 ? (
          <div className='text-2xl text-center bg-gray-300 m-10 p-10'>
            No Saved Propeties Yet
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {/* <div className='rounded-xl shadow-md relative'> */}
            {favourites.map((property) => (
              <PropertyCard key={property._id} property1={property} />
            ))}
            {/* </div> */}
          </div>
        )}
      </div>
    </section>
  );
};

export default SavedPropertiesPage;
