import { Star } from 'lucide-react';
import React from 'react'

export default function Destination() {
  const destinations = [
    {
      name: "Santorini, Greece",
      image: "https://img.imageboss.me/greca/width/3840/format:webp/5a214aaa378d8.jpeg",
      rating: 4.9,
      reviews: 2847,
      price: "$899"
    },
    {
      name: "Bali, Indonesia",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwDhwv0mc0zmBHhEd3KFb7ulH39k_AQ18w8g&s",
      rating: 4.8,
      reviews: 3156,
      price: "$799"
    },
    {
      name: "Maldives",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP_ERq5C96RGKBB1r8pxFyvr5XiR_ikPQu7w&s",
      rating: 4.9,
      reviews: 2534,
      price: "$1299"
    }
  ];
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Popular Destinations
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our most booked destinations and start planning your dream vacation
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <img
                src={destination.image}
                alt={destination.name}
                className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                <div className="absolute bottom-0 p-6 w-full">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-semibold text-white">
                      {destination.name}
                    </h3>
                    <span className="text-white font-bold">{destination.price}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="text-white">{destination.rating}</span>
                    <span className="text-gray-300">
                      ({destination.reviews} reviews)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
