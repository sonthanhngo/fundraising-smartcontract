import { useState } from 'react';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import CircleIcon from '@mui/icons-material/Circle';
import { green } from '@mui/material/colors';

export const ImageSlider = ({ images, haveDot }) => {
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

  const goToSlide = (slideIndex) => {
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
        <ArrowLeftIcon onClick={prevSlide} />
      </div>
      {/* Right Arrow */}
      <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5  text-green-700 cursor-pointer'>
        <ArrowRightIcon onClick={nextSlide} />
      </div>
      {haveDot && (
        <div className='flex  justify-end'>
          {images.map((image, i) => (
            <div
              key={i}
              onClick={() => goToSlide(i)}
              className='text-2xl cursor-pointer'
            >
              {i == currentIndex ? (
                <CircleIcon sx={{ fontSize: 15, color: green[700] }} />
              ) : (
                <CircleIcon sx={{ fontSize: 15 }} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
