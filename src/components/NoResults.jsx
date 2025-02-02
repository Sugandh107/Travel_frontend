import React from 'react';
import { SearchX, RefreshCw } from 'lucide-react';

const NoResults = ({ type = 'flights', onReset }) => {
  return (
    <div className="col-span-full py-16 px-4">
      <div className="max-w-md mx-auto text-center">
        {/* Animated Icon Container */}
        <div className="mb-8 relative">
          <div className="absolute inset-0 bg-orange-100 rounded-full opacity-20 animate-ping"></div>
          <div className="relative bg-orange-50 rounded-full p-6 inline-block">
            <SearchX className="w-16 h-16 text-orange-500 animate-bounce" />
          </div>
        </div>

        {/* Main Message */}
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          No {type} found
        </h3>

        {/* Helpful Suggestions */}
        <p className="text-gray-600 mb-8">
          We couldn't find any {type} matching your search criteria. Try:
          <ul className="mt-4 space-y-2 text-left max-w-xs mx-auto">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
              Different dates
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
              Alternative airports nearby
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
              More flexible travel times
            </li>
          </ul>
        </p>

        {/* Action Button */}
        <button
          onClick={onReset}
          className="inline-flex items-center px-6 py-3 rounded-full bg-orange-500 text-white hover:bg-orange-600 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
        >
          <RefreshCw className="w-5 h-5 mr-2" />
          Modify Search
        </button>
      </div>
    </div>
  );
};

export default NoResults;