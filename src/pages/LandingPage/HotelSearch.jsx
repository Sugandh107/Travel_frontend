import React, { useState, useEffect } from 'react';
import { MapPin, CalendarDays, Search, Loader2, AlertCircle, AlertCircleIcon } from 'lucide-react';

const HotelSearch = ({ onSearch, initialValues = {}, isLoading = false }) => {
  const [location, setLocation] = useState(initialValues.location || '');
  const [checkIn, setCheckIn] = useState(initialValues.checkIn || '');
  const [checkOut, setCheckOut] = useState(initialValues.checkOut || '');
  const [error, setError] = useState('');

  // Popular destinations with hidden dates
  const popularDestinations = [
    {
      name: 'New York, USA',
      checkIn: '2025-07-01',
      checkOut: '2025-07-03'
    },
    {
      name: 'London, UK',
      checkIn: '2025-08-15',
      checkOut: '2025-08-22'
    },
    {
      name: 'Paris, France',
      checkIn: '2025-09-01',
      checkOut: '2025-09-08'
    },
    {
      name: 'Tokyo, Japan',
      checkIn: '2025-10-01',
      checkOut: '2025-10-08'
    }
  ];

  useEffect(() => {
    setLocation(initialValues.location || '');
    setCheckIn(initialValues.checkIn || '');
    setCheckOut(initialValues.checkOut || '');
    setError('');
  }, [initialValues]);

  const validateDates = () => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 28) {
      setError('Booking duration cannot exceed 28 days');
      return false;
    }

    if (diffDays < 1) {
      setError('Check-out date must be after check-in date');
      return false;
    }

    setError('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateDates()) return;

    if (location && checkIn && checkOut) {
      onSearch({ location, checkIn, checkOut });
    }
  };

  const handlePopularDestination = (destination) => {
    setLocation(destination.name);
    setCheckIn(destination.checkIn);
    setCheckOut(destination.checkOut);
    setError('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col lg:flex-row gap-3 items-stretch">
          {/* Location Input */}
          <div className="flex-1 relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
            </div>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter city or hotel name"
              className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg bg-white placeholder-gray-500 
                       focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500
                       hover:border-gray-400 transition-all cursor-pointer"
              required
            />
          </div>

          {/* Check-in Date Input */}
          <div className="flex-1 relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <CalendarDays className="h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
            </div>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => {
                setCheckIn(e.target.value);
                setError('');
              }}
              className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg bg-white placeholder-gray-500 
                       focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500
                       hover:border-gray-400 transition-all cursor-pointer"
              required
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          {/* Check-out Date Input */}
          <div className="flex-1 relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <CalendarDays className="h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
            </div>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => {
                setCheckOut(e.target.value);
                setError('');
              }}
              className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg bg-white placeholder-gray-500 
                       focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500
                       hover:border-gray-400 transition-all cursor-pointer"
              required
              min={checkIn || new Date().toISOString().split('T')[0]}
            />
          </div>

          {/* Search Button */}
          <button
            type="submit"
            disabled={isLoading || !location || !checkIn || !checkOut || error}
            className={`cursor-pointer flex items-center justify-center px-8 py-3 rounded-lg font-medium
                       transition-all duration-200 ${isLoading || !location || !checkIn || !checkOut || error
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-orange-500 hover:bg-orange-600 hover:shadow-lg active:transform active:scale-95'
              } text-white`}
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                <Search className="h-5 w-5 mr-2" />
                <span>Search Hotels</span>
              </>
            )}
          </button>
        </div>

        {error && (
          <div variant="destructive" className="mt-4">
            <AlertCircleIcon className="h-4 w-4" />
            <h2>{error}</h2>
          </div>
        )}

        {/* Popular Destinations Quick Select */}
        <div className="mt-4 flex flex-wrap gap-2 text-sm text-gray-600">
          <span className="font-medium">Popular:</span>
          {popularDestinations.map((destination) => (
            <button
              key={destination.name}
              type="button"
              onClick={() => handlePopularDestination(destination)}
              className="text-orange-500 hover:text-orange-600 cursor-pointer transition-colors"
            >
              {destination.name}
            </button>
          ))}
        </div>
      </form>
    </div>
  );
};

export default HotelSearch;