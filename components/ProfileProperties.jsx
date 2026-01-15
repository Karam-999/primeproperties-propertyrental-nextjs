'use client';
import Link from 'next/link';
import getUnreadMessageCount from '@/app/actions/getUnreadMessageCount';
import { useState } from 'react';
import Image from 'next/image';
import { deletetheProperty } from '@/app/actions/deleteProperty';
import { toast } from 'sonner';
import { useGlobalContext } from '@/context/GlobalContext';
const ProfileProperties = ({ propertyAddedByUser: initialProperties }) => {
  const { setUnreadMessagesCount } = useGlobalContext();
  const deleteProperty = async (propertyId) => {
    if (!confirm('Are you sure you want to delete this Property?')) {
      return;
    }
    const deletePromise = deletetheProperty(propertyId);
    // await deletetheProperty(propertyId);
    toast.promise(deletePromise, {
      loading: 'Deleting property...',
      success: 'Property deleted!',
      error: 'Failed to delete property',
    });
    try {
      await deletePromise;
      setPropertyAddedByUser((properties) =>
        properties.filter((property) => property._id !== propertyId)
      );
      const newCount = await getUnreadMessageCount();
      setUnreadMessagesCount(newCount);

    } catch (error) {
      console.error('Error deleting property:', error);
      alert('Failed to delete the property. Please try again later.');
    }
  };
  const [propertyAddedByUser, setPropertyAddedByUser] =
    useState(initialProperties);
  return propertyAddedByUser.map((property) => (
    <div key={property._id} className='mb-10'>
      <Link href={`/properties/${property._id}`}>
        <Image
          className='h-32 w-full rounded-md object-cover'
          src={property.images[0]}
          alt='Property 1'
          width={200}
          height={200}
        />
      </Link>
      <div className='mt-2'>
        <p className='text-lg font-semibold'>{property.propName}</p>
        <p className='text-gray-600'>
          Address: {property.propLocation.street}, {property.propLocation.city}
        </p>
      </div>
      <div className='mt-2'>
        <Link
          onClick={(e) => {
            if (!confirm('Are you sure you want to edit this Property?')) {
              e.preventDefault();
            }
          }}
          href={`/properties/${property._id}/edit`}
          className='bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600'>
          Edit
        </Link>
        <button
          onClick={() => {
            deleteProperty(property._id);
            //
          }}
          className='bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600'
          type='button'>
          Delete
        </button>
      </div>
    </div>
  ));
};

export default ProfileProperties;
