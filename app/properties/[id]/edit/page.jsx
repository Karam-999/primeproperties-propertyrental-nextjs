import connectTheDB from '@/config/database';
import Property from '@/models/Property';
import { convertToSerializableObject } from '@/utils/convertToObject';
import EditPropertyForm from '@/components/EditPropertyForm';

const EditPropertyPage = async ({ params }) => {
  const { id } = await params;
  await connectTheDB();
  const propertyDoc = await Property.findById(id).lean();
  if (!propertyDoc) {
    return (
      <h1 className='text-center text-2xl font-bold mt-10 mb-10'>
        Property Not Found
      </h1>
    );
  }

  const property = convertToSerializableObject(propertyDoc);

  return (
    <section className='bg-blue-50'>
      <div className='container mx-auto max-w-2xl py-24'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <EditPropertyForm property={property} />
        </div>
      </div>
    </section>
  );
};

export default EditPropertyPage;
