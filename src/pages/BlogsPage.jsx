import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import useUserData from '../hooks/useUserData';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function BlogsPage() {
  const { destinationId } = useParams();
  const [destination, setDestination] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState('');
  const { user } = useContext(AuthContext);
  const { userData } = useUserData(user?.email);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const destinationResponse = await fetch(
          `https://travel-backend-lw95.onrender.com/api/destinations/${destinationId}`
        );
        const destinationData = await destinationResponse.json();
        setDestination(destinationData);

        const blogsResponse = await fetch(
          `https://travel-backend-lw95.onrender.com/api/blogs/${destinationId}`
        );
        const blogsData = await blogsResponse.json();
        setBlogs(blogsData);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, [destinationId]);

  const handleAddBlog = async () => {
    if (!newBlog.trim()) return; // Prevent adding empty blog

    try {
      const response = await fetch('https://travel-backend-lw95.onrender.com/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destinationId,
          userId: userData?._id,
          content: newBlog,
        }),
      });

      const newBlogData = await response.json();
      setBlogs((prevBlogs) => [...prevBlogs, newBlogData]);
      setNewBlog('');
    } catch (err) {
      console.error('Error adding blog:', err);
    }
  };

  const handleUserClick = (userId) => {
    navigate(`/user/${userId}`);
  };

  return (
    <motion.div
      className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {destination ? (
        <motion.div
          className="mb-8 rounded-lg shadow-lg bg-white p-6"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          <img
            src={destination.imageUrl}
            alt={destination.name}
            className="w-full h-[400px] object-cover rounded-xl shadow-lg mb-4"
          />
          <h1 className="text-4xl font-bold text-gray-800">{destination.name}</h1>
          <p className="text-gray-600 mt-2">{destination.description}</p>
        </motion.div>
      ) : (
        <div className="text-center text-gray-500">Loading destination...</div>
      )}

      <div className="mb-8">
        <h2 className="text-3xl font-semibold mb-6 text-gray-700">Blogs</h2>
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <motion.div
              key={blog._id}
              className="bg-white shadow-lg rounded-lg p-6 mb-6 hover:shadow-xl transition-shadow"
              whileHover={{ scale: 1.03 }}
            >
              <div className="flex items-center mb-4">
                <img
                  src={blog.userId.photoURL}
                  alt={blog.userId.name}
                  className="w-12 h-12 rounded-full mr-3 cursor-pointer"
                  onClick={() => handleUserClick(blog.userId._id)}
                />
                <p
                  className="text-lg font-semibold text-gray-800 cursor-pointer hover:text-blue-500"
                  onClick={() => handleUserClick(blog.userId._id)}
                >
                  {blog.userId.name}
                </p>
              </div>
              <p className="text-gray-700 mb-4">{blog.content}</p>
              <small className="text-gray-500">
                {new Date(blog.timestamp).toLocaleString()}
              </small>
            </motion.div>
          ))
        ) : (
          <div className="text-center text-gray-500">No blogs yet. Be the first to write!</div>
        )}
      </div>

      <motion.div
        className="mt-6 bg-white p-6 rounded-lg shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-2xl font-semibold mb-4 text-gray-700">Write a New Blog</h3>
        <textarea
          value={newBlog}
          onChange={(e) => setNewBlog(e.target.value)}
          placeholder="Write your thoughts..."
          className="border p-4 w-full mb-4 rounded-lg shadow focus:ring-2 focus:ring-blue-400"
          rows="6"
        />
        <button
          onClick={handleAddBlog}
          disabled={!newBlog.trim()}
          className={`bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg shadow-lg transition-transform ${
            !newBlog.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
          }`}
        >
          Add Blog
        </button>
      </motion.div>
    </motion.div>
  );
}

export default BlogsPage;
