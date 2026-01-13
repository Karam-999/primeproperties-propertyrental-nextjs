import Image from 'next/image';

const HeaderImage = ({ property }) => {
  // console.log('thiss is too muchhh', property);
  return (
    <section>
      <div className='container-xl m-auto'>
        <div className='grid grid-cols-1'>
          <Image
            src={`${property.images[0]}`}
            alt=''
            height='0'
            className='object-cover h-[400px] w-full'
            width='0'
            sizes='100vw'
          />
        </div>
      </div>
    </section>
  );
};

export default HeaderImage;
