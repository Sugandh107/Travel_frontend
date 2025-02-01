  import React, { useState } from "react";
  import { motion } from "framer-motion";

  const FlightBooking = () => {
    const [activeTab, setActiveTab] = useState("flights");
    const [flightData, setFlightData] = useState(null);
    const [hotelData, setHotelData] = useState(null);
    const [source, setSource] = useState("");
    const [destination, setDestination] = useState("");
    const [place, setPlace] = useState("");
    const [country, setCountry] = useState(""); // New state for country name

    const fetchFlights = async () => {
      const response = await fetch("http://localhost:5000/api/flights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          originLocationCode: source,
          destinationLocationCode: destination,
          departureDate: "2025-02-15",
          adults: 1,
        }),
      });

      const data = await response.json();
      setFlightData(data);
    };

    const fetchHotels = async () => {
      const response = await fetch(`http://localhost:5000/api/hotels/${place}/${country}`);
      const data = await response.json();
      setHotelData(data);
    };

    return (
      <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 text-white flex flex-col items-center justify-center">
        <motion.h1 
          className="text-5xl font-bold mb-6" 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Explore the World with Ease
        </motion.h1>

        <div className="flex space-x-4 bg-white text-black p-2 rounded-full shadow-lg">
          <button
            className={`px-6 py-2 rounded-full transition-all ${activeTab === "flights" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            onClick={() => setActiveTab("flights")}
          >
            Flights
          </button>
          <button
            className={`px-6 py-2 rounded-full transition-all ${activeTab === "hotels" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            onClick={() => setActiveTab("hotels")}
          >
            Hotels
          </button>
        </div>

        <motion.div 
          className="mt-6 w-full max-w-md bg-white p-6 rounded-lg shadow-lg text-black"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {activeTab === "flights" ? (
            <div>
              <h2 className="text-xl font-semibold mb-4">Search Flights</h2>
              <input type="text" placeholder="Origin" value={source} onChange={(e) => setSource(e.target.value)} className="w-full p-2 border rounded mb-2" />
              <input type="text" placeholder="Destination" value={destination} onChange={(e) => setDestination(e.target.value)} className="w-full p-2 border rounded mb-2" />
              <button onClick={fetchFlights} className="w-full bg-blue-500 text-white py-2 rounded">Search</button>
              {flightData && <pre className="mt-4 p-2 bg-gray-100 text-black rounded">{JSON.stringify(flightData, null, 2)}</pre>}
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-semibold mb-4">Search Hotels</h2>
              <input type="text" placeholder="City Code" value={place} onChange={(e) => setPlace(e.target.value)} className="w-full p-2 border rounded mb-2" />
              <input type="text" placeholder="Country Name" value={country} onChange={(e) => setCountry(e.target.value)} className="w-full p-2 border rounded mb-2" />
              <button onClick={fetchHotels} className="w-full bg-blue-500 text-white py-2 rounded">Search</button>
              {hotelData && hotelData.data && hotelData.data.map((hotel, index) => (
                <div key={index} className="mt-4 p-2 border rounded">
                  <h3 className="font-semibold">{hotel.name}</h3>
                  <p>{hotel.address?.countryCode}</p>
                  <p>Latitude: {hotel.geoCode?.latitude}</p>
                  <p>Longitude: {hotel.geoCode?.longitude}</p>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    );
  };

  export default FlightBooking;
