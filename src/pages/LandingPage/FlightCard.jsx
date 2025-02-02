import React from 'react';
import { Clock, Plane, Calendar, DollarSign } from 'lucide-react';

const FlightCard = ({ data }) => {
  // Extract first itinerary and its segments
  const itinerary = data.itineraries[0];
  const segments = itinerary.segments;
  const firstSegment = segments[0];
  const lastSegment = segments[segments.length - 1];

  // Format duration from PT16H30M to 16h 30m
  const formatDuration = (duration) => {
    const hours = duration.match(/(\d+)H/)?.[1] || '0';
    const minutes = duration.match(/(\d+)M/)?.[1] || '0';
    return `${hours}h ${minutes}m`;
  };

  // Format datetime to readable format
  const formatDateTime = (dateTime) => {
    return new Date(dateTime).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Format price with conversion to INR
  const formatPrice = (price) => {
    // Convert EUR to INR (using approximate conversion rate of 1 EUR = 90 INR)
    const eurToInr = parseFloat(price.total) * 90;
    
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(eurToInr);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      {/* Airline Info */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <span className="font-bold text-lg">{firstSegment.carrierCode}</span>
          <span className="text-gray-500 ml-2">Flight {firstSegment.number}</span>
        </div>
        <span className="text-xl font-bold text-orange-500">
          {formatPrice(data.price)}
        </span>
      </div>

      {/* Flight Route */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex-1">
          <div className="text-2xl font-bold">{firstSegment.departure.iataCode}</div>
          <div className="text-sm text-gray-500">
            {formatDateTime(firstSegment.departure.at)}
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center">
          <div className="relative w-full">
            <div className="border-t-2 border-gray-300 w-full absolute top-1/2"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Plane className="w-5 h-5 text-orange-500 rotate-90" />
            </div>
          </div>
          <div className="text-sm text-gray-500 mt-2">
            {formatDuration(itinerary.duration)}
          </div>
        </div>

        <div className="flex-1 text-right">
          <div className="text-2xl font-bold">{lastSegment.arrival.iataCode}</div>
          <div className="text-sm text-gray-500">
            {formatDateTime(lastSegment.arrival.at)}
          </div>
        </div>
      </div>

      {/* Flight Details */}
      <div className="border-t pt-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="w-4 h-4 mr-2" />
            {segments.length > 1 ? `${segments.length - 1} Stop(s)` : 'Direct'}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            {data.numberOfBookableSeats} seats left
          </div>
        </div>
      </div>

      {/* Additional Info */}
      {segments.length > 1 && (
        <div className="mt-4 text-sm text-gray-500">
          <div className="font-semibold">Stops:</div>
          {segments.slice(0, -1).map((segment, index) => (
            <div key={index} className="ml-4">
              {segment.arrival.iataCode} - {formatDuration(segment.duration)} layover
            </div>
          ))}
        </div>
      )}

      {/* Book Button */}
      <button className="w-full mt-4 bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition-colors">
        Book Now
      </button>
    </div>
  );
};

export default FlightCard;