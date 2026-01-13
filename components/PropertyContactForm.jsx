'use client';
import { FaPaperPlane } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import addMessages from '@/app/actions/addMessage';
// import { useFormStatus } from 'react-dom';//not needed as now pending is provided by useActionState
import { useActionState } from 'react';
import { useSession } from 'next-auth/react';

import { toast } from 'sonner';
const PropertyContactForm = ({ property }) => {
  const { data: session } = useSession();
  const [messageState, messageAction, isPending] = useActionState(
    addMessages,
    {}
  );
  useEffect(() => {
    if (messageState.error) {
      toast.error(messageState.error);
    } else if (messageState.submitted) {
      toast.success('Message sent Successfully!!');
    }
  }, [messageState]);
  if (messageState.submitted) {
    return (
      <p className='text-green-500 mb-4 text-center'>
        {' '}
        Your message has been sent successfully !!
      </p>
    );
  }
  return (
    session && (
      <div className='bg-white p-6 rounded-lg shadow-md'>
        <h3 className='text-xl font-bold mb-6'>Contact Property Manager</h3>
        <form action={messageAction}>
          <input
            type='hidden'
            id='propertyId'
            name='propertyId'
            defaultValue={property._id}
          />
          <input
            type='hidden'
            id='recepient'
            name='recepient'
            defaultValue={property.ownerId}
          />
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='name'>
              Name:
            </label>

            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='name'
              name='name'
              type='text'
              placeholder='Enter your name'
              required
            />
          </div>
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='email'>
              Email:
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='email'
              name='email'
              type='email'
              placeholder='Enter your email'
              required
            />
          </div>
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='phone'>
              Phone:
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='phone'
              name='phone'
              type='text'
              placeholder='Enter your phone number'
            />
          </div>
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='message'>
              Message:
            </label>
            <textarea
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline'
              id='message'
              name='message'
              placeholder='Enter your message'></textarea>
          </div>
          <div>
            <button
              type='submit'
              disabled={isPending}
              className={`${
                isPending ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'
              } text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center`}>
              <FaPaperPlane className='mr-2' />{' '}
              {isPending ? 'Sending...' : 'Send Message'}{' '}
            </button>
          </div>
        </form>
      </div>
    )
  );
};

export default PropertyContactForm;
