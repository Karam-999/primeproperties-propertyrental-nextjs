'use client';
import Link from 'next/link';
import { toast } from 'sonner';
import { useGlobalContext } from '@/context/GlobalContext';
import { deletetheMessage } from '@/app/actions/deleteMessage';
import { useState } from 'react';
import markMessageAsRead from '@/app/actions/markMessageAsRead';
const MessageCard = ({ message }) => {
  const [readState, setReadState] = useState(message.read);
  const { setUnreadMessagesCount } = useGlobalContext();
  const handleReadStatus = async () => {
    const markAsReadOrUnread = await markMessageAsRead(message._id);
    setReadState(markAsReadOrUnread);
    setUnreadMessagesCount((prevCount) =>
      markAsReadOrUnread ? prevCount - 1 : prevCount + 1
    );
    toast.success(`Marked as ${markAsReadOrUnread ? 'Read' : 'Unread'}!`);
  };
  const handleDeleteMessage = async () => {
    if (!confirm('Are you sure you want to delete this message?')) {
      return;
    }
    await deletetheMessage(message._id);
    setUnreadMessagesCount((prevCount) =>
      readState ? prevCount : prevCount - 1
    );
    toast.success('Message Deleted Successfully!');
  };

  return (
    <div className='relative bg-white p-4 rounded-md shadow-md border border-gray-200'>
      <h2 className='text-xl mb-4'>
        {!readState && (
          <div className='absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-2 rounded-md'>
            Unread
          </div>
        )}
        <span className='font-bold'>Property Inquiry:</span>
        <Link
          href={`/properties/${message.propertyId._id}`}
          className='text-black-500 hover:underline'>
          {' '}
          {message.propertyId.propName}
        </Link>
      </h2>
      <p className='text-gray-700'>{message.message}</p>

      <ul className='mt-4'>
        <li>
          <strong>Username:</strong> {message.senderId.username}
        </li>
        <li>
          <strong>Name:</strong> {message.senderName}
        </li>

        <li>
          <strong>Reply Email:</strong>
          <a href={`mailto:${message.senderEmail}`} className='text-blue-500'>
            {' '}
            {message.senderEmail}
          </a>
        </li>
        <li>
          <strong>Email:</strong>
          <a
            href={`mailto:${message.senderId.email}`}
            className='text-blue-500'>
            {' '}
            {message.senderId.email}
          </a>
        </li>
        <li>
          <strong>Reply Phone:</strong>
          <a href={`tel:${message.senderPhone}`} className='text-blue-500'>
            {' '}
            {message.senderPhone}
          </a>
        </li>
        <li>
          <strong>Received:</strong>{' '}
          {new Date(message.createdAt).toLocaleString('en-GB', {
            timeZone: 'UTC',
          })}
        </li>
      </ul>
      <button
        onClick={handleReadStatus}
        className='mt-4 mr-3 bg-blue-500 text-white py-1 px-3 rounded-md'>
        {readState ? 'Mark as Unread' : 'Mark As Read'}
      </button>
      <button
        onClick={handleDeleteMessage}
        className='mt-4 bg-red-500 text-white py-1 px-3 rounded-md'>
        Delete
      </button>
    </div>
  );
};

export default MessageCard;
