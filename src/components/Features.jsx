import React from 'react'
import { Award, Shield, Users } from "lucide-react";


export default function Features() {
  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure Booking",
      description: "Your payments and personal data are always protected with industry-leading encryption."
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Best Price Guarantee",
      description: "Find a lower price? We'll match it and give you an additional 10% off."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "24/7 Support",
      description: "Our travel experts are here to help you around the clock, anywhere in the world."
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose TravelEase?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join millions of happy travelers who book their perfect journeys with us
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-orange-500 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
