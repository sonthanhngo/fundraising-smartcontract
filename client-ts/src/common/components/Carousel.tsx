import { useState } from 'react';

type CarouselProps = {
  images: string[];
  haveDot: boolean;
};
export const Carousel = ({ images, haveDot }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };
  return (
    <div className='h-full w-full relative group'>
      <img
        src={images[currentIndex]}
        className='w-full h-full rounded-md bg-center bg-cover duration-300'
      ></img>
      {/* Left Arrow */}
      <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5  text-green-700 cursor-pointer'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-6 h-6'
          onClick={prevSlide}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M15.75 19.5L8.25 12l7.5-7.5'
          />
        </svg>
      </div>
      {/* Right Arrow */}
      <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5  text-green-700 cursor-pointer'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-6 h-6'
          onClick={nextSlide}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M8.25 4.5l7.5 7.5-7.5 7.5'
          />
        </svg>
      </div>
      {haveDot && (
        <div className='flex  justify-end'>
          {images.map((_, i) => (
            <div
              key={i}
              onClick={() => goToSlide(i)}
              className='text-2xl curs  or-pointer'
            >
              {i == currentIndex ? (
                <div className='rounded-full bg-green-700' />
              ) : (
                <div className='rounded-full bg-gray-500' />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
