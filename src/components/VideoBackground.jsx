// VideoBackground.jsx
import React from 'react';

const VideoBackground = ({ videoSrc, overlayText }) => {
  return (
    <div className="relative w-full h-screen">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* Text Overlay */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl font-bold text-center">
        {overlayText}
      </div>
    </div>
  );
};

export default VideoBackground;
