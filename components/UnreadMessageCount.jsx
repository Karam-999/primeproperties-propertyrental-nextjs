'use client';
import { useGlobalContext } from '@/context/GlobalContext';
// import { useGlobalContext } from '@/context/GlobalContext';

const UnreadMessageCount = () => {
  const { unReadMessagesCount } = useGlobalContext();
  console.log('this is the messagecount', unReadMessagesCount);
  
  return (
    <span className='absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-sm font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full'>
      {unReadMessagesCount}
    </span>
  );
};

export default UnreadMessageCount;
