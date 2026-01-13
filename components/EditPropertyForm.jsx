'use client';
// import addProperty from '@/app/actions/addProperty';
import updatetheProperty from '@/app/actions/updateProperty';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const EditPropertyForm = ({ property }) => {
  const router = useRouter();
  console.log('this is the router of useRouter', router);
  const handleUpdate = async (formData) => {
    // Handle the form submission logic here

    const toastId = toast.loading('Updating property...');

    try {
      const result = await updatetheProperty(formData, property._id);

      if (result.success) {
        toast.success('Property updated successfully!', { id: toastId });
        router.push(`/properties/${result.propertyId}`);
      }
    } catch (error) {
      toast.error('Failed to update property', { id: toastId });
      console.error(error);
    }
  };

  return (
    <form action={handleUpdate}>
      <input type='hidden' name='propertyId' value={property._id} />
      <h2 className='text-3xl text-center font-semibold mb-6'>Edit Property</h2>

      <div className='mb-4'>
        <label htmlFor='type' className='block text-gray-700 font-bold mb-2'>
          Property Type
        </label>
        <select
          id='type'
          defaultValue={property.propType}
          name='type'
          className='border rounded w-full py-2 px-3'
          required>
          <option value='Apartment'>Apartment</option>
          <option value='Condo'>Condo</option>
          <option value='House'>House</option>
          <option value='Cabin Or Cottage'>Cabin or Cottage</option>
          <option value='Room'>Room</option>
          <option value='Studio'>Studio</option>
          <option value='Other'>Other</option>
        </select>
      </div>
      <div className='mb-4'>
        <label className='block text-gray-700 font-bold mb-2'>
          Listing Name
        </label>
        <input
          type='text'
          defaultValue={property.propName}
          id='name'
          name='name'
          className='border rounded w-full py-2 px-3 mb-2'
          placeholder='eg. Beautiful Apartment In Miami'
          required
        />
      </div>
      <div className='mb-4'>
        <label
          htmlFor='description'
          className='block text-gray-700 font-bold mb-2'>
          Description
        </label>
        <textarea
          id='description'
          defaultValue={property.propDescription}
          name='description'
          className='border rounded w-full py-2 px-3'
          rows='4'
          placeholder='Add an optional description of your property'></textarea>
      </div>

      <div className='mb-4 bg-blue-50 p-4'>
        <label className='block text-gray-700 font-bold mb-2'>Location</label>
        <input
          type='text'
          defaultValue={property.propLocation.street}
          id='street'
          name='location.street'
          className='border rounded w-full py-2 px-3 mb-2'
          placeholder='Street'
        />
        <input
          type='text'
          defaultValue={property.propLocation.city}
          id='city'
          name='location.city'
          className='border rounded w-full py-2 px-3 mb-2'
          placeholder='City'
          required
        />
        <input
          type='text'
          defaultValue={property.propLocation.state}
          id='state'
          name='location.state'
          className='border rounded w-full py-2 px-3 mb-2'
          placeholder='State'
          required
        />
        <input
          type='text'
          defaultValue={property.propLocation.zipcode}
          id='zipcode'
          name='location.zipcode'
          className='border rounded w-full py-2 px-3 mb-2'
          placeholder='Zipcode'
        />
      </div>

      <div className='mb-4 flex flex-wrap'>
        <div className='w-full sm:w-1/3 pr-2'>
          <label htmlFor='beds' className='block text-gray-700 font-bold mb-2'>
            Beds
          </label>
          <input
            type='number'
            defaultValue={property.beds}
            id='beds'
            name='beds'
            className='border rounded w-full py-2 px-3'
            required
          />
        </div>
        <div className='w-full sm:w-1/3 px-2'>
          <label htmlFor='baths' className='block text-gray-700 font-bold mb-2'>
            Baths
          </label>
          <input
            type='number'
            defaultValue={property.baths}
            id='baths'
            name='baths'
            className='border rounded w-full py-2 px-3'
            required
          />
        </div>
        <div className='w-full sm:w-1/3 pl-2'>
          <label
            htmlFor='square_feet'
            className='block text-gray-700 font-bold mb-2'>
            Square Feet
          </label>
          <input
            type='number'
            defaultValue={property.square_feet}
            id='square_feet'
            name='square_feet'
            className='border rounded w-full py-2 px-3'
            required
          />
        </div>
      </div>

      <div className='mb-4'>
        <label className='block text-gray-700 font-bold mb-2'>Amenities</label>
        <div className='grid grid-cols-2 md:grid-cols-3 gap-2'>
          <div>
            <input
              type='checkbox'
              id='amenity_wifi'
              name='amenities'
              value='Wifi'
              className='mr-2'
              defaultChecked={property.amenities.includes('Wifi')}
            />
            <label htmlFor='amenity_wifi'>Wifi</label>
          </div>
          <div>
            <input
              type='checkbox'
              id='amenity_kitchen'
              name='amenities'
              value='Full kitchen'
              className='mr-2'
              defaultChecked={property.amenities.includes('Full kitchen')}
            />
            <label htmlFor='amenity_kitchen'>Full kitchen</label>
          </div>
          <div>
            <input
              type='checkbox'
              id='amenity_washer_dryer'
              name='amenities'
              value='Washer & Dryer'
              className='mr-2'
              defaultChecked={property.amenities.includes('Washer & Dryer')}
            />
            <label htmlFor='amenity_washer_dryer'>Washer & Dryer</label>
          </div>
          <div>
            <input
              type='checkbox'
              id='amenity_free_parking'
              name='amenities'
              value='Free Parking'
              defaultChecked={property.amenities.includes('Free Parking')}
              className='mr-2'
            />
            <label htmlFor='amenity_free_parking'>Free Parking</label>
          </div>
          <div>
            <input
              type='checkbox'
              id='amenity_pool'
              name='amenities'
              defaultChecked={property.amenities.includes('Swimming Pool')}
              value='Swimming Pool'
              className='mr-2'
            />
            <label htmlFor='amenity_pool'>Swimming Pool</label>
          </div>
          <div>
            <input
              type='checkbox'
              id='amenity_hot_tub'
              name='amenities'
              value='Hot Tub'
              defaultChecked={property.amenities.includes('Hot Tub')}
              className='mr-2'
            />
            <label htmlFor='amenity_hot_tub'>Hot Tub</label>
          </div>
          <div>
            <input
              type='checkbox'
              id='amenity_24_7_security'
              name='amenities'
              defaultChecked={property.amenities.includes('24/7 Security')}
              value='24/7 Security'
              className='mr-2'
            />
            <label htmlFor='amenity_24_7_security'>24/7 Security</label>
          </div>
          <div>
            <input
              type='checkbox'
              id='amenity_wheelchair_accessible'
              name='amenities'
              defaultChecked={property.amenities.includes(
                'Wheelchair Accessible'
              )}
              value='Wheelchair Accessible'
              className='mr-2'
            />
            <label htmlFor='amenity_wheelchair_accessible'>
              Wheelchair Accessible
            </label>
          </div>
          <div>
            <input
              type='checkbox'
              id='amenity_elevator_access'
              name='amenities'
              defaultChecked={property.amenities.includes('Elevator Access')}
              value='Elevator Access'
              className='mr-2'
            />
            <label htmlFor='amenity_elevator_access'>Elevator Access</label>
          </div>
          <div>
            <input
              type='checkbox'
              id='amenity_dishwasher'
              defaultChecked={property.amenities.includes('Dishwasher')}
              name='amenities'
              value='Dishwasher'
              className='mr-2'
            />
            <label htmlFor='amenity_dishwasher'>Dishwasher</label>
          </div>
          <div>
            <input
              type='checkbox'
              id='amenity_gym_fitness_center'
              name='amenities'
              defaultChecked={property.amenities.includes('Gym/Fitness Center')}
              value='Gym/Fitness Center'
              className='mr-2'
            />
            <label htmlFor='amenity_gym_fitness_center'>
              Gym/Fitness Center
            </label>
          </div>
          <div>
            <input
              type='checkbox'
              id='amenity_air_conditioning'
              name='amenities'
              defaultChecked={property.amenities.includes('Air Conditioning')}
              value='Air Conditioning'
              className='mr-2'
            />
            <label htmlFor='amenity_air_conditioning'>Air Conditioning</label>
          </div>
          <div>
            <input
              type='checkbox'
              id='amenity_balcony_patio'
              name='amenities'
              defaultChecked={property.amenities.includes('Balcony/Patio')}
              value='Balcony/Patio'
              className='mr-2'
            />
            <label htmlFor='amenity_balcony_patio'>Balcony/Patio</label>
          </div>
          <div>
            <input
              type='checkbox'
              id='amenity_smart_tv'
              name='amenities'
              defaultChecked={property.amenities.includes('Smart TV')}
              value='Smart TV'
              className='mr-2'
            />
            <label htmlFor='amenity_smart_tv'>Smart TV</label>
          </div>
          <div>
            <input
              type='checkbox'
              id='amenity_coffee_maker'
              name='amenities'
              defaultChecked={property.amenities.includes('Coffee Maker')}
              value='Coffee Maker'
              className='mr-2'
            />
            <label htmlFor='amenity_coffee_maker'>Coffee Maker</label>
          </div>
        </div>
      </div>

      <div className='mb-4 bg-blue-50 p-4'>
        <label className='block text-gray-700 font-bold mb-2'>
          Rates (Leave blank if not applicable)
        </label>
        <div className='flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4'>
          <div className='flex items-center'>
            <label htmlFor='weekly_rate' className='mr-2'>
              Weekly
            </label>
            <input
              type='number'
              defaultValue={property.rates.weekly}
              id='weekly_rate'
              name='rates.weekly'
              className='border rounded w-full py-2 px-3'
            />
          </div>
          <div className='flex items-center'>
            <label htmlFor='monthly_rate' className='mr-2'>
              Monthly
            </label>
            <input
              defaultValue={property.rates.monthly}
              type='number'
              id='monthly_rate'
              name='rates.monthly'
              className='border rounded w-full py-2 px-3'
            />
          </div>
          <div className='flex items-center'>
            <label htmlFor='nightly_rate' className='mr-2'>
              Nightly
            </label>
            <input
              type='number'
              defaultValue={property.rates.nightly}
              id='nightly_rate'
              name='rates.nightly'
              className='border rounded w-full py-2 px-3'
            />
          </div>
        </div>
      </div>

      <div className='mb-4'>
        <label
          htmlFor='seller_name'
          className='block text-gray-700 font-bold mb-2'>
          Seller Name
        </label>
        <input
          type='text'
          defaultValue={property.seller_info.name}
          id='seller_name'
          name='seller_info.name'
          className='border rounded w-full py-2 px-3'
          placeholder='Name'
        />
      </div>
      <div className='mb-4'>
        <label
          htmlFor='seller_email'
          className='block text-gray-700 font-bold mb-2'>
          Seller Email
        </label>
        <input
          type='email'
          defaultValue={property.seller_info.email}
          id='seller_email'
          name='seller_info.email'
          className='border rounded w-full py-2 px-3'
          placeholder='Email address'
          required
        />
      </div>
      <div className='mb-4'>
        <label
          htmlFor='seller_phone'
          className='block text-gray-700 font-bold mb-2'>
          Seller Phone
        </label>
        <input
          defaultValue={property.seller_info.phone}
          type='tel'
          id='seller_phone'
          name='seller_info.phone'
          className='border rounded w-full py-2 px-3'
          placeholder='Phone'
        />
      </div>

      {/* <div className='mb-4'>
        <label htmlFor='images' className='block text-gray-700 font-bold mb-2'>
          Images (Select up to 4 images)
        </label>
        <input
          type='file'
          id='images'
          name='images'
          className='border rounded w-full py-2 px-3'
          accept='image/*'
          multiple
          required
        />
      </div> */}

      <div>
        <button
          className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'
          type='submit'>
          Update Property
        </button>
      </div>
    </form>
  );
};

export default EditPropertyForm;
