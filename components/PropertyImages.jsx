'use client';

import { Gallery, Item } from 'react-photoswipe-gallery';
import Image from 'next/image';

const PropertyImages = ({ property, images }) => {
  return (
    <section className='bg-blue-50 p-4'>
      <div className='container mx-auto'>
        <Gallery withCaption>
          {images.length === 1 ? (
            <Item
              caption='Foo'
              original={images[0]}
              thumbnail={images[0]}
              width='1000'
              height='600'>
              {({ ref, open }) => (
                <Image
                  ref={ref}
                  onClick={open}
                  src={images[0]}
                  alt=''
                  className='object-cover h-100 cursor-pointer mx-auto rounded-xl'
                  width={1800}
                  height={400}
                />
              )}
            </Item>
          ) : (
            <div className='grid grid-cols-2 gap-4'>
              {images.map((image, index) => (
                <Item
                  key={index}
                  caption={`${property.propName} (Image: ${
                    index + 1
                  })\n Author: ${property.ownerName}`}
                  original={image}
                  thumbnail={image}
                  width='1000'
                  height='600'>
                  {({ ref, open }) => (
                    <div
                      className={`${
                        images.length === 3 && index === 2
                          ? 'col-span-2'
                          : 'col-span-1'
                      }`}>
                      <Image
                        ref={ref}
                        onClick={open}
                        src={image}
                        alt=''
                        className='object-cover h-100 w-full cursor-pointer rounded-xl'
                        width={1800}
                        height={400}
                      />
                    </div>
                  )}
                </Item>
              ))}
            </div>
          )}
        </Gallery>
      </div>
    </section>
  );
};

export default PropertyImages;
