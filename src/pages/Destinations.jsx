import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import { FaTrash } from 'react-icons/fa';

function Destinations() {
  const [destinations, setDestinations] = useState([]);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const imageHostingKey = "2810c7267bf8cca104aafeaf2446befc";
  const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;
  

  useEffect(() => {
    fetchDestinations();
  }, []);


  const fetchDestinations = async () => {
    try {
      const res = await fetch('https://travel-backend-lw95.onrender.com/api/destinations');
      const data = await res.json();
      setDestinations(data);
      setFilteredDestinations(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpload = async () => {
    if (!image || !name || !description) {
      toast.error('All fields are required!');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('image', image);

      const imgRes = await axios.post(imageHostingApi, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const imageUrl = imgRes.data.data.url;

      const destinationData = { name, description, imageUrl };
      await axios.post('https://travel-backend-lw95.onrender.com/api/destinations', destinationData).then(()=>{
       toast.success("Destination Added ")
      }).catch()

      fetchDestinations();
      setIsModalOpen(false);
      setName(''); 
      setDescription('');
      setImage(null);
    } catch (err) {
      console.log('Error uploading destination:', err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://travel-backend-lw95.onrender.com/api/destinations/${id}`).then(()=>{
        toast.success("Destination Deleted ")
       })
      setDestinations((prev) => prev.filter((destination) => destination._id !== id));
      setFilteredDestinations((prev) => prev.filter((destination) => destination._id !== id));
    } catch (err) {
      console.error('Error deleting destination:', err.message);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term === '') {
      setFilteredDestinations(destinations);
    } else {
      const filtered = destinations.filter((destination) =>
        destination.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredDestinations(filtered);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Destinations</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setIsModalOpen(true)}
        >
          Add Destination
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search for a destination..."
          className="w-80 p-2 border border-slate-500 rounded"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDestinations.length > 0 ? (
          filteredDestinations.map((destination) => (
            <div
              key={destination._id}
              className="relative border rounded-lg p-4 group cursor-pointer bg-slate-200"
              onClick={() => window.location.href = `/destination/${destination._id}`}
            >
              <img
                src={destination.imageUrl}
                alt={destination.name}
                className="rounded w-full h-48 object-cover"
              />
              <h2 className="text-lg font-bold mt-2">{destination.name}</h2>
              <p>{destination.description}</p>

              {/* Delete button on hover */}
              <button
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(destination._id);
                }}
              >
                <FaTrash />
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-10 bg-gray-100 rounded-lg">
            <h2 className="text-lg font-bold text-gray-500">No destinations found.</h2>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-1/2">
            <h2 className="text-xl font-bold mb-4">Add New Destination</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                className="border p-2 rounded w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                className="border p-2 rounded w-full"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Image</label>
              <input
                type="file"
                className="border p-2 rounded w-full"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleUpload}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Destinations;
