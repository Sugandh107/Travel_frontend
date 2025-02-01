import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import useUserData from "../hooks/useUserData";
import { motion } from "framer-motion";

function UserProfilePage() {
  const { userId } = useParams(); // Get the userId from the URL
  const [user1, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate(); // Hook to navigate to a new page
  const { user } = useContext(AuthContext);
  const { userData } = useUserData(user?.email);

  useEffect(() => {
    // Fetch the user data by userId
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://travel-backend-lw95.onrender.com/api/users/${userId}`);
        const userData = await response.json();
        setUser(userData);
        setPosts(userData.posts || []); // Set posts if available
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchUserData();
  }, [userId]);

  if (!user1) return <p className="text-center mt-8">Loading...</p>;

  const handleMessageClick = () => {
    navigate(`/messages/${userData?._id}/${user1._id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 flex flex-col items-center">
      {/* Profile Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg mb-8"
      >
        <div className="text-center mb-6">
          <img
            src={user1.photoURL}
            alt={user1.name}
            className="w-40 h-40 rounded-full mx-auto border-4 border-gray-200 object-cover"
          />
          <h1 className="text-3xl font-semibold mt-4">{user1.name}</h1>
          <p className="text-gray-500">{user1.email}</p>
          <p className="mt-4 text-lg text-gray-700 italic">Join me on a tour</p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleMessageClick}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Message
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => alert(`Followed ${user1.name}`)}
            className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition"
          >
            Follow
          </motion.button>
        </div>
      </motion.div>

      {/* Posts Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="w-full max-w-4xl"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Posts
        </h2>
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {posts.map((post, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-lg overflow-hidden shadow-lg bg-white"
              >
                <img
                  src={post.imageUrl}
                  alt={post.caption}
                  className="w-full h-60 object-cover"
                />
                <div className="p-4 bg-gray-100 text-center">
                  <p className="text-gray-800 font-medium">{post.caption}</p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 text-lg mt-8">
            No posts yet.
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default UserProfilePage;
