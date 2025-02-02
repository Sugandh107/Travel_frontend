import React from 'react';
import {
  MapPin,
  Star,
  Phone,
  Navigation
} from 'lucide-react';

const HotelCard = ({ data }) => {
  // Function to convert USD to INR and format the price
  const formatPriceInINR = (priceInUSD) => {
    // Remove '$' and convert string to number
    const numericPrice = parseFloat(priceInUSD.replace(/[^0-9.-]+/g, ''));
    
    // Convert USD to INR (using approximate conversion rate)
    const priceInINR = numericPrice * 83; // Using approximate conversion rate of 1 USD = 83 INR
    
    // Format the price in Indian format with ₹ symbol
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(priceInINR);
  };

  return (
    <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Content */}
      <div className="p-4">
        {/* Hotel Name and Rating */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 leading-tight line-clamp-2 flex-1">
            {data.name}
          </h3>
          <div className="flex items-center gap-1 bg-orange-50 px-2 py-1 rounded">
            <Star className="w-4 h-4 text-orange-500 fill-orange-500" />
            <span className="text-sm font-medium text-orange-700">
              {data.reviews.rating}
            </span>
          </div>
        </div>

        {/* Location and Reviews */}
        <div className="flex items-center gap-4 mb-3">
          <div className="flex items-center gap-1 text-gray-500">
            <MapPin className="w-4 h-4" />
            <button
              onClick={() => window.open(`https://www.google.com/maps?q=${data.geocode.latitude},${data.geocode.longitude}`)}
              className="text-sm hover:text-orange-500 transition-colors"
            >
              View on map
            </button>
          </div>
          <div className="text-sm text-gray-500">
            {data.reviews.count.toLocaleString()} reviews
          </div>
        </div>

        {/* Price and Contact */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Starting from</span>
            <span className="text-xl font-bold text-orange-500">
              {formatPriceInINR(data.price1)}
            </span>
            <span className="text-xs text-gray-400">per night</span>
          </div>

          <div className="flex gap-2">
            <a
              href={`tel:${data.telephone}`}
              className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              title="Call hotel"
            >
              <Phone className="w-4 h-4 text-gray-600" />
            </a>
            <button
              onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${data.geocode.latitude},${data.geocode.longitude}`)}
              className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              title="Get directions"
            >
              <Navigation className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;