// 'use client';
import PropertyCard from '@/components/PropertyCard';
// import theProperties from '@/properties.json';
// import Link from 'next/link';
import connectTheDB from '@/config/database';
import Property from '@/models/Property';
const PropertyPage = async () => {
  await connectTheDB(0);
  const theProperties = await Property.find({}).lean();
  console.log(theProperties);
  console.log('object');
  return (
    <>
      <section className='px-4 py-6'>
        <div className='container-xl lg:container m-auto px-4 py-6'>
          {theProperties.leangth === '0' ? (
            <p>No properties Found</p>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {theProperties.map((property) => (
                <PropertyCard property1={property} key={property._id} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};
export default PropertyPage;
