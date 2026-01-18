import { FaTimes, FaBed, FaBath, FaRuler, FaCheck } from 'react-icons/fa';
import PropertyMap from './PropertyMap';

const PropertyDetails = ({ property }) => {
  return (
    <main>
      <div className='bg-white p-6 rounded-lg shadow-md text-center md:text-left'>
        <div className='text-gray-500 mb-4'>{property.propType}</div>
        <h1 className='text-3xl font-bold mb-4'>{property.propName}</h1>
        <div className='text-gray-500 mb-4 flex align-middle justify-center md:justify-start'>
          <i className='fa-solid fa-location-dot text-lg text-orange-700 mr-2'></i>
          <p className='text-orange-700'>
            {property.propLocation.street}, {property.propLocation.city},{' '}
            {property.propLocation.state} - {property.propLocation.zipcode}
          </p>
        </div>

        <h3 className='text-lg font-bold my-6 bg-gray-800 text-white p-2'>
          Rates & Options
        </h3>
        <div className='flex flex-col md:flex-row justify-around'>
          <div className='flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0'>
            <div className='text-gray-500 mr-2 font-bold'>Nightly</div>
            {property.rates.nightly ? (
              <div className='text-2xl font-bold text-blue-500'>
                ${property.rates.nightly}
              </div>
            ) : (
              <div className='text-2xl font-bold'>
                <FaTimes className='text-red-700' />
              </div>
            )}
          </div>
          <div className='flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0'>
            <div className='text-gray-500 mr-2 font-bold'>Weekly</div>
            {property.rates.weekly ? (
              <div className='text-2xl font-bold text-blue-500'>
                ${property.rates.weekly}
              </div>
            ) : (
              <div className='text-2xl font-bold'>
                <FaTimes className='text-red-700' />
              </div>
            )}
          </div>
          <div className='flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0'>
            <div className='text-gray-500 mr-2 font-bold'>Monthly</div>
            {property.rates.monthly ? (
              <div className='text-2xl font-bold text-blue-500'>
                ${property.rates.monthly}
              </div>
            ) : (
              <div className='text-2xl font-bold'>
                <FaTimes className='text-red-700' />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className='bg-white p-6 rounded-lg shadow-md mt-6'>
        <h3 className='text-lg font-bold mb-6'>Description & Details</h3>
        <div className='flex justify-center gap-4 text-blue-500 mb-4 text-xl space-x-9'>
          <p>
            <FaBed className='inline mr-1 mb-1' />
            {property.beds}{' '}
            <span className=' lg:inline'>
              {property.beds > 1 ? 'Beds' : 'Bed'}
            </span>
          </p>
          <p>
            <FaBath className='inline mr-1 mb-1' /> {property.baths}{' '}
            <span className=' lg:inline'>
              {property.baths > 1 ? 'Baths' : 'Bath'}
            </span>
          </p>
          <p>
            <FaRuler className='inline mr-1 mb-1' />
            {property.square_feet}{' '}
            <span className='hidden sm:inline'>sqft</span>
          </p>
        </div>
        <p className='text-gray-500 mb-4'>{property.propDescription}</p>
      </div>

      <div className='bg-white p-6 rounded-lg shadow-md mt-6'>
        <h3 className='text-lg font-bold mb-6'>Amenities</h3>

        <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 list-none'>
          {property.amenities.map((amenity, index) => (
            <li key={index}>
              <FaCheck className='text-green-600 inline mr-2' />
              {amenity}
            </li>
          ))}
        </ul>
      </div>

      {/* Map */}
      <div className='bg-white p-6 rounded-lg shadow-md mt-6'>
        <PropertyMap property={property} />
      </div>
    </main>
  );
};

export default PropertyDetails;
