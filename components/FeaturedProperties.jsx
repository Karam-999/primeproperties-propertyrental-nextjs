import FeaturedPropertiesCard from './FeaturedPropertiesCard';
import connectTheDB from '@/config/database';
import Property from '@/models/Property';
const FeaturedProperties = async () => {
  await connectTheDB();
  const featuredProperties = await Property.find({ is_featured: true })
    .limit(2)
    .lean();
  // console.log('object', featuredProperties);
  return (
    <section className='bg-blue-50 px-4 pt-6 pb-10'>
      <div className='container-xl lg:container m-auto'>
        <h2 className='text-3xl font-bold text-blue-500 mb-6 text-center'>
          Featured Properties
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {featuredProperties.map((property) => (
            <FeaturedPropertiesCard key={property._id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
