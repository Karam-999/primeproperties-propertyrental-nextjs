// import theProperties from '@/properties.json';
import PropertyCard from './PropertyCard';
import Link from 'next/link';
import connectTheDB from '@/config/database';
import Property from '@/models/Property';
const HomePropertiesPage = async () => {
  await connectTheDB(0);
  // const theProperties = await Property.find({}).lean();
  // const recentAddedProperties = theProperties.slice(0, 3);
  const recentAddedProperties = await Property.find({})
    .sort({ createdAt: -1 })
    .limit(3)
    .lean();
  return (
    <>
      <section className='px-4 py-6'>
        <div className='container-xl lg:container m-auto px-4 py-6'>
          <h2 className='text-3xl mb-5 text-center font-bold text-blue-500'>
            Recently Added Properties
          </h2>
          {recentAddedProperties.length === 0 ? (
            <p>No properties Found</p>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {recentAddedProperties.map((property) => (
                <PropertyCard property1={property} key={property._id} />
              ))}
            </div>
          )}
        </div>
      </section>
      <section className='m-auto max-w-lg my-6 px-6'>
        <Link
          href='/properties'
          className='block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700'>
          View All Properties
        </Link>
      </section>
    </>
  );
};

export default HomePropertiesPage;
