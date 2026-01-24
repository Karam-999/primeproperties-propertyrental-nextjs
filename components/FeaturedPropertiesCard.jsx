// import { get } from 'mongoose';
import {
  FaBed,
  FaBath,
  FaRuler,
  FaMoneyBillAlt,
  FaMapMarkerAlt,
} from 'react-icons/fa';
import Link from 'next/link';
const FeaturedPropertiesCard = ({ property }) => {
  if (!property) return <div>No property data</div>;
  const getRateDisplay = () => {
    const { rates } = property;
    if (rates.monthly) {
      return `$${rates.monthly.toLocaleString()}/mo`;
    } else if (rates.weekly) {
      return `$${rates.weekly.toLocaleString()}/week`;
    } else if (rates.nightly) {
      return `$${rates.nightly.toLocaleString()}/night`;
    }
  };
  return (
    <div className='bg-white rounded-xl shadow-md relative flex flex-col md:flex-row'>
      <img
        src={property.images[0]}
        alt=''
        className='w-full h-auto rounded-t-xl md:rounded-tr-none md:rounded-l-xl md:w-2/5'
      />
      <div className='p-6'>
        <h3 className='text-xl font-bold'>{property.propName}</h3>
        <div className='text-gray-600 mb-4'>{property.propType}</div>
        <h3 className='absolute top-2.5 left-2.5 bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right'>
          {getRateDisplay()}
        </h3>
        <div className='flex justify-center gap-4 text-gray-500 mb-4'>
          <p className='text-xs sm:text-xs md:text-base'>
            <FaBed className='inline mr-1 mb-1 sm:text-xs md:text-lg' />
            {property.beds}{' '}
            <span className='inline sm:text-xs lg:text-base'>
              {property.beds > 1 ? 'Beds' : 'Bed'}
            </span>
          </p>
          <p className='text-xs sm:text-xs md:text-base'>
            <FaBath className='inline mr-1 mb-1 sm:text-xs md:text-lg' />{' '}
            {property.baths}{' '}
            <span className='lg:inline sm:text-xs lg:text-base'>
              {property.baths > 1 ? 'Baths' : 'Bath'}
            </span>
          </p>
          <p className='text-xs sm:text-xs md:text-base'>
            <FaRuler className='inline mr-1 mb-1 sm:text-xs md:text-lg' />
            {property.square_feet}{' '}
            <span className='lg:inline sm:text-xs lg:text-base'>sqft</span>
          </p>
        </div>

        <div className='flex justify-center gap-4 text-green-900 text-sm mb-4'>
          <p>
            <FaMoneyBillAlt className='inline mr-1 mb-1 sm:text-xs md:text-lg' />{' '}
            Weekly
          </p>
          <p>
            <FaMoneyBillAlt className='inline mr-1 mb-1 sm:text-xs md:text-lg' />{' '}
            Monthly
          </p>
        </div>

        <div className='border border-gray-200 mb-5'></div>

        <div className='flex flex-col lg:flex-row justify-between'>
          <div className='flex align-middle gap-2 mb-4 lg:mb-0'>
            <FaMapMarkerAlt className='fa-solid fa-location-dot text-lg text-orange-700 mt-0.5 ml-5' />
            <span className='text-orange-700 px-4'>
              {property.propLocation.city}
              {', '}
              {property.propLocation.state}
            </span>
          </div>
          <Link
            href={`/properties/${property._id}`}
            className='h-[36px] bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-center text-sm'>
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPropertiesCard;
