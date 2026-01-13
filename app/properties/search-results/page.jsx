import connectTheDB from '@/config/database';
import Property from '@/models/Property';
import PropertySearchForm from '@/components/PropertySearchForm';
import PropertyCard from '@/components/PropertyCard';
import Link from 'next/link';
import { FaArrowAltCircleLeft } from 'react-icons/fa';
import { convertToSerializableObject } from '@/utils/convertToObject';
const SeatchResults = async ({ searchParams }) => {
  const { location, propertyType } = await searchParams;
  //   console.log(
  //     'this is searchParams object in search results page:',
  //     { location, propertyType },
  //     'this is location destructured from searchParams',
  //     location,
  //     'this is propertyType destructured from searchParams',
  //     propertyType
  //     );

  // this is searchParams object in search results page: { location: "karam's cottage", propertyType: 'Cabin Or Cottage' } this is location destructured from searchParams karam's cottage this is propertyType destructured from searchParams Cabin Or Cottage
  //  GET /properties/search-results?location=karam%27s+cottage&propertyType=Cabin+Or+Cottage 200 in 37ms (compile: 5ms, render: 33ms)
  await connectTheDB();
  const regexpatternForLocation = new RegExp(location, 'i');
  console.log(regexpatternForLocation);
  ///karam's cottage/
  let query = {
    $or: [
      { propName: regexpatternForLocation },
      { ownerName: regexpatternForLocation },
      { propDescription: regexpatternForLocation },
      { 'propLocation.street': regexpatternForLocation },
      { 'propLocation.city': regexpatternForLocation },
      { 'propLocation.state': regexpatternForLocation },
      { 'propLocation.zipcode': regexpatternForLocation },
    ],
  };
  if (propertyType && propertyType !== 'All') {
    const propertyTyperegexPattern = new RegExp(propertyType);
    query.propType = propertyTyperegexPattern;
  }
//   console.log('this is not the query i was expecting', query);
  const propertyQueryResults = await Property.find(query).lean();
  const propertiesfromDB = convertToSerializableObject(propertyQueryResults);
//   console.log('wait what are the search results?!', propertiesfromDB);
  return (
    <>
      <section className='bg-emerald-700 mx-auto py-6 px-10'>
        <PropertySearchForm />
      </section>
      <section className='px-4 py-6'>
        <div className='container-xl lg:container mx-auto px-4 py-6'>
          <Link
            href='/properties'
            className='text-blue-600 hover:underline mb-10'>
            <FaArrowAltCircleLeft className='mr-0.5 inline mb-0.5' /> Back to
            Properties
          </Link>
          <h1 className='text-3xl font-bold mb-2 mt-5'>Search Results:</h1>
          {propertiesfromDB.length === 0 ? (
            <p>No properties Found. try using other keywords</p>
          ) : (
            <div className='grid grid-cols-2 md:grid-cols-3 gap-6'>
              {propertiesfromDB.map((property) => (
                <PropertyCard key={property._id} property1={property} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default SeatchResults;
