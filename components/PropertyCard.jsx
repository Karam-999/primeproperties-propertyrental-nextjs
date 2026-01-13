import Link from 'next/link';
import Image from 'next/image';
import {
  FaBed,
  FaBath,
  FaRuler,
  FaMoneyBillAlt,
  FaMapMarkerAlt,
} from 'react-icons/fa';

const PropertyCard = ({ property1 }) => {
  const getRateDisplay = () => {
    const { rates } = property1;
    if (rates.monthly) {
      return `$${rates.monthly.toLocaleString()}/mo`;
    } else if (rates.weekly) {
      return `$${rates.weekly.toLocaleString()}/week`;
    } else if (rates.nightly) {
      return `$${rates.nightly.toLocaleString()}/night`;
    }
  };
  return (
    <div className='rounded-xl shadow-md relative'>
      <Image
        src={`${property1.images[0]}`}
        alt=''
        width='0'
        height='0'
        sizes='100vw'
        className='w-full h-auto rounded-t-xl'
      />
      <div className='p-4'>
        <div className='text-left md:text-center lg:text-left mb-6'>
          <div className='text-gray-600'>{property1.propType}</div>
          <h3 className='text-xl font-bold'>{property1.propName}</h3>
        </div>
        <h3 className='absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right'>
          {getRateDisplay()}
        </h3>

        <div className='flex justify-center gap-4 text-gray-500 mb-4'>
          <p>
            <FaBed className='inline mr-1 mb-1' />
            {property1.beds}{' '}
            <span className=' lg:inline'>
              {property1.beds > 1 ? 'Beds' : 'Bed'}
            </span>
          </p>
          <p>
            <FaBath className='inline mr-1 mb-1' /> {property1.baths}{' '}
            <span className=' lg:inline'>
              {property1.baths > 1 ? 'Baths' : 'Bath'}
            </span>
          </p>
          <p>
            <FaRuler className='inline mr-1 mb-1' />
            {property1.square_feet} <span className='lg:inline'>sqft</span>
          </p>
        </div>

        <div className='flex justify-center gap-4 text-green-900 text-sm mb-4'>
          <p>
            <FaMoneyBillAlt className='inline mr-1 mb-1' /> Weekly
          </p>
          <p>
            <FaMoneyBillAlt className='inline mr-1 mb-1' /> Monthly
          </p>
        </div>

        <div className='border border-gray-100 mb-5'></div>

        <div className='flex flex-col lg:flex-row justify-between mb-4'>
          <div className='flex align-middle gap-2 mb-4 lg:mb-0'>
            <FaMapMarkerAlt className='fa-solid fa-location-dot text-lg text-orange-700 mt-0.5 ml-5' />
            <span className='text-orange-700'>
              {property1.propLocation.city}
              {', '}
              {property1.propLocation.state}
            </span>
          </div>
          <Link
            href={`/properties/${property1._id}`}
            className='h-[36px] bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-center text-sm'>
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
