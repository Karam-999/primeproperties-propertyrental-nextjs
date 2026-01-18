// 'use client';
// import {
//   useRouter,
//   useParams,
//   useSearchParams,
//   usePathname,
// } from 'next/navigation';
import { FaArrowAltCircleLeft } from 'react-icons/fa';
// import ShareButtons from '@/components/ShareButton';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import BookmarkButton from '@/components/BookmarkButton';
import PropertyImages from '@/components/PropertyImages';
import connectTheDB from '@/config/database';
import Property from '@/models/Property';
import PropertyImage from '@/components/PropertyHeaderImage';
import PropertyDetails from '@/components/PropertyDetails';
import { convertToSerializableObject } from '@/utils/convertToObject';
import { Book, Share } from 'lucide-react';
import ShareButtons from '@/components/ShareButton';
import PropertyContactForm from '@/components/PropertyContactForm';
const SpecificPropertyPage = async ({ params, searchParams }) => {
  //   const router = useRouter();
  //   const searchParams = useSearchParams();
  //   const pathname = usePathname();
  //   const params = useParams();
  const { id } = await params;
  // const { karam } = await searchParams;
  await connectTheDB();
  const thePropertyDoc = await Property.findById(id).lean();
  if (!thePropertyDoc) {
    return notFound('Property Not Found, May have been deleted or does not exist.');
  }
  const theProperty = convertToSerializableObject(thePropertyDoc);

  if (!theProperty) {
    return (
      <div className='text-center font-bold text-red-700'>
        Property Not Found
      </div>
    );
  }
  return (
    // // <div>
    // //   Specific Property Page
    //   {/* {id}
    //   {karam} */}
    //   // {/* Specific Property Page
    //   // {searchParams.get('karam')}
    //   {/* http://localhost:3000/properties/2?karam=haha */}
    //   {/* {pathname} */}
    //   {/* <button
    //     onClick={() => {
    //       router.replace('/properties/add');
    //     }}>
    //     Add Property
    //   </button> */}
    // // </div>
    <>
      <PropertyImage property={theProperty} />
      <section>
        <div className='container m-auto py-6 px-6'>
          <Link
            href='/properties'
            className='text-blue-500 hover:text-blue-600 flex items-center underline'>
            <FaArrowAltCircleLeft className='mt-1 mr-2' /> Back to Properties
          </Link>
        </div>
      </section>
      <section className='bg-emerald-50'>
        <div className='container m-auto py-10 px-6'>
          <div className='grid grid-cols-1 md:grid-cols-70/30 w-full gap-6'>
            {/* propertyInfo */}
            <PropertyDetails property={theProperty} />
            <aside className='space-y-4'>
              <BookmarkButton property={theProperty} />
              <ShareButtons property={theProperty} />

              {/* <!-- Contact Form --> */}
              
                <PropertyContactForm property={theProperty} />
              
            </aside>
          </div>
        </div>
        <PropertyImages images={theProperty.images} property={theProperty} />
      </section>
    </>
  );
};

export default SpecificPropertyPage;
