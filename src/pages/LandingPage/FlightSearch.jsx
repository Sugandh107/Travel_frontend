import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, ArrowRight, Search, Loader2 } from 'lucide-react';

const FlightSearch = ({ onSearch, initialValues = {}, isLoading = false }) => {
  const [from, setFrom] = useState(initialValues.from || '');
  const [to, setTo] = useState(initialValues.to || '');
  const [date, setDate] = useState(initialValues.date || '');

  useEffect(() => {
    setFrom(initialValues.from || '');
    setTo(initialValues.to || '');
    setDate(initialValues.date || '');
  }, [initialValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (from && to && date) {
      onSearch({ from, to, date });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col lg:flex-row gap-3 items-stretch">
        {/* From Input */}
        <div className="flex-1 relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <MapPin className="h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
          </div>
          <input
            type="text"
            value={from}
            onChange={(e) => setFrom(e.target.value.toUpperCase())}
            placeholder="From (e.g., DEL)"
            className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg bg-white placeholder-gray-500 
                     focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500
                     hover:border-gray-400 transition-all cursor-pointer"
            required
            maxLength={3}
          />
          <div className="hidden lg:block absolute -right-6 top-1/2 -translate-y-1/2 z-10">
            <div className="bg-white rounded-full p-1 shadow-lg">
              <ArrowRight className="h-5 w-5 text-orange-500" />
            </div>
          </div>
        </div>

        {/* To Input */}
        <div className="flex-1 relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <MapPin className="h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
          </div>
          <input
            type="text"
            value={to}
            onChange={(e) => setTo(e.target.value.toUpperCase())}
            placeholder="To (e.g., BOM)"
            className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg bg-white placeholder-gray-500 
                     focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500
                     hover:border-gray-400 transition-all cursor-pointer"
            required
            maxLength={3}
          />
        </div>

        {/* Date Input */}
        <div className="flex-1 relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Calendar className="h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
          </div>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg bg-white placeholder-gray-500 
                     focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500
                     hover:border-gray-400 transition-all cursor-pointer"
            required
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        {/* Search Button */}
        <button
          type="submit"
          disabled={isLoading || !from || !to || !date}
          className={`cursor-pointer flex items-center justify-center px-8 py-3 rounded-lg font-medium
                     transition-all duration-200 ${isLoading || !from || !to || !date
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-orange-500 hover:bg-orange-600 hover:shadow-lg active:transform active:scale-95'
            } text-white`}
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>
              <Search className="h-5 w-5 mr-2" />
              <span>Search</span>
            </>
          )}
        </button>
      </div>

      {/* Popular Destinations Quick Select */}
      <div className="mt-4 flex flex-wrap gap-2 text-sm text-gray-600">
        <span className="font-medium">Popular:</span>
        {[
          { from: 'DEL', to: 'BOM' },
          { from: 'BOM', to: 'BLR' },
          { from: 'DEL', to: 'BLR' },
        ].map((route) => (
          <button
            key={`${route.from}-${route.to}`}
            type="button"
            onClick={() => {
              setFrom(route.from);
              setTo(route.to);
            }}
            className="text-orange-500 hover:text-orange-600 cursor-pointer transition-colors"
          >
            {route.from} → {route.to},
          </button>
        ))}
      </div>
    </form>
  );
};

export default FlightSearch;