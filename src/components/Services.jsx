import React, { useState, useEffect } from 'react';
import ImageSlider from '../components/ImageSlider.jsx'; // Assuming this is the path to your ImageSlider
import servicesData from '../data/pakages-data.js'; // Assuming this is the path to your service data

// Functional component for tag-based filtering (e.g., "All", "Budget", "Luxury").

function Services() {


  return (

    <div className="services-container py-12">
      {servicesData.map((service) => (
        <div
          key={service.id}
          className="flex items-center justify-center py-12"
        >
          <div className="flex flex-wrap max-w-6xl mx-auto bg-white rounded-lg shadow-lg">
            {/* ImageSlider on the left */}
            <div className="w-full md:w-1/2">
              <ImageSlider images={service.images} intervalTime={3000} />
            </div>

            {/* Content on the right */}
            <div className="w-full md:w-1/2 p-6">
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">
                {service.name}
              </h2>
              <p className="text-lg text-gray-600 mb-4">{service.description}</p>
              <div className="text-xl font-bold text-gray-800 mb-6">
                Price per night: ${service.price}
              </div>
              <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
                Book Now
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  


  );
}

export default Services;
