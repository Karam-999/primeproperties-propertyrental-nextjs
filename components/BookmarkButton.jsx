'use client';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { FaBookmark } from 'react-icons/fa';
import bookmarkProperty from '@/app/actions/bookmarkProperty';
import { useSession } from 'next-auth/react';
import addProperty from '@/app/actions/addProperty';
import checkBookmarkStatus from '@/app/actions/checkBookmarkStatus';
const BookmarkButton = ({ property }) => {
  const { data, status } = useSession();
  // data structure is: data.session.user.id OR data.user.id depending on NextAuth version
  const userId = data?.user?.id || data?.session?.user?.id;
  console.log('session data:', { status, userId, data });

  const handleBookmark = async () => {
    if (status !== 'authenticated' || !userId) {
      toast.error('You need to be signed in to bookmark');
      return;
    }
    bookmarkProperty(property._id).then((res) => {
      if (res.error) return toast.error(res.error);
      setIsBookmarked(res.isBookmarked);
      toast.success(res.message);
    });

    // else {
    //     toast.success('Property Bookmarked Successfully!!')
    // }
  };
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    checkBookmarkStatus(property._id).then((res) => {
      if (res.error) toast.error(res.error);
      if (res.isBookmarked) setIsBookmarked(res.isBookmarked);
      setLoading(false);
    });
  }, [property._id, userId, checkBookmarkStatus]);

    if (loading) {
        return (
            <button
                onClick={handleBookmark}
                className='bg-gray-500 hover:bg-gray-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center'>
                <FaBookmark className='mr-2' /> Loading...
            </button>
        );
    }
  return isBookmarked ? (
    <button
      onClick={handleBookmark}
      className='bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center'>
      <FaBookmark className='mr-2' /> Remove Bookmark
    </button>
  ) : (
    <button
      onClick={handleBookmark}
      className='bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center'>
      <FaBookmark className='mr-2' /> Bookmark Property
    </button>
  );
};

export default BookmarkButton;
