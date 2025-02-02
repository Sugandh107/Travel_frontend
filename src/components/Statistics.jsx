import React from 'react'

export default function Statistics() {
  return (
    <section className="py-16 bg-orange-500 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center transform hover:scale-105 transition-transform duration-300">
            <div className="text-4xl font-bold mb-2">2M+</div>
            <div className="text-lg opacity-90">Happy Travelers</div>
          </div>
          <div className="text-center transform hover:scale-105 transition-transform duration-300">
            <div className="text-4xl font-bold mb-2">150+</div>
            <div className="text-lg opacity-90">Countries</div>
          </div>
          <div className="text-center transform hover:scale-105 transition-transform duration-300">
            <div className="text-4xl font-bold mb-2">1000+</div>
            <div className="text-lg opacity-90">Flight Routes</div>
          </div>
          <div className="text-center transform hover:scale-105 transition-transform duration-300">
            <div className="text-4xl font-bold mb-2">50K+</div>
            <div className="text-lg opacity-90">Hotels</div>
          </div>
        </div>
      </div>
    </section>
  )
}
