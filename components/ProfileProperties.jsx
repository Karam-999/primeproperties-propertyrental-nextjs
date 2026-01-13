'use client';
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import { deletetheProperty } from '@/app/actions/deleteProperty';
import { toast } from 'sonner';

const ProfileProperties = ({ propertyAddedByUser: initialProperties }) => {
  const deleteProperty = async (propertyId) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this property?'
    );
    if (!confirmDelete) return;
    try {
      await deletetheProperty(propertyId);
      setPropertyAddedByUser((properties) =>
        properties.filter((property) => property._id !== propertyId)
      );
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
          href={`/properties/${property._id}/edit`}
          className='bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600'>
          Edit
        </Link>
        <button
          onClick={() => {
            // deleteProperty(property._id);
            toast.promise(deleteProperty(property._id), {
              loading: 'Deleting property...',
              success: 'Property deleted!',
              error: 'Failed to delete property',
            });
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
