import React from 'react'

export default function Hero() {
  return (
    <div className="text-center animate-fade-in-up">
      <h1 className="text-4xl md:text-4 md:text-6xl font-extrabold text-gray-900 mb-6 ">
        <span className="block transform hover:scale-105 transition-transform duration-300">
          Find Your Perfect
        </span>
        <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-transparent bg-clip-text transform hover:scale-105 transition-transform duration-300">
          Journey
        </span>
      </h1>
      <p className=" text-md mb-6 md:text-xl text-gray-600 w-full mx-auto animate-fade-in ">
        Compare and book flights & hotels from hundreds of providers with
        <span className="font-semibold text-orange-500"> best price guarantee</span>
      </p>
    </div>
  )
}
