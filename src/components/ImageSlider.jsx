// ImageSlider.jsx
import React, { useState, useEffect } from 'react';

const ImageSlider = ({ images, intervalTime = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, intervalTime);

    return () => clearInterval(intervalId);
  }, [images.length, intervalTime]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div
        className="flex transition-transform duration-1000 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Image ${index + 1}`}
            className="w-full h-auto flex-shrink-0"
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
