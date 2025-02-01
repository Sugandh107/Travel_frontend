import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthProvider";
import axios from "axios";
import useUserData from "../hooks/useUserData";

function OwnUserProfile() {
  const { user } = useContext(AuthContext);
  const { userData } = useUserData(user?.email);

  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [posts, setPosts] = useState([]);

  const imageHostingKey = "2810c7267bf8cca104aafeaf2446befc";
  const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users");
        const allUsers = res.data;
        const foundUser = allUsers.find((u) => u.email === user?.email);
        setPosts(foundUser?.posts || []);
      } catch (err) {
        console.error("Error fetching users:", err.message);
      }
    };

    fetchAllUsers();
  }, [user]);

  const handleUpload = async () => {
    if (!image) {
      console.error("No image selected!");
      return;
    }

    try {
      // Upload image to ImgBB
      const formData = new FormData();
      formData.append("image", image);

      const imgRes = await axios.post(imageHostingApi, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const imageUrl = imgRes.data.data.url;

      // Send post data to backend
      const postData = {
        email: userData?.email,
        caption,
        imageUrl,
      };

      await axios.post("http://localhost:5000/api/users/add-post", postData);

      // Reset form and refresh posts
      setImage(null);
      setCaption("");
      setPosts((prev) => [...prev, postData]);
    } catch (err) {
      console.error("Error uploading post:", err.message);
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-50 min-h-screen p-4">
      {/* Profile Header */}
      <div className="flex items-center w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
        <div className="flex-shrink-0">
          <img
            src={userData?.photoURL}
            alt={userData?.name}
            className="w-24 h-24 rounded-full border-4 border-gray-200 object-cover"
          />
        </div>
        <div className="ml-6">
          <h1 className="text-2xl font-semibold">{userData?.name}</h1>
          <p className="text-gray-500">{userData?.email}</p>
          <div className="mt-4 flex space-x-6 text-gray-600">
            <span>
              <strong>{posts.length}</strong> posts
            </span>
          </div>
        </div>
      </div>

      {/* Upload Form */}
      <div className="bg-white w-full max-w-4xl p-6 mt-6 rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
          />
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Add a caption"
            className="w-full flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
          />
          <button
            onClick={handleUpload}
            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:ring focus:ring-blue-300"
          >
            Upload
          </button>
        </div>
      </div>
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6 mt-10">
          Posts
        </h2>
      {/* Posts Grid */}
      <div className="w-full max-w-4xl mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {posts.map((post, index) => (
          <div
            key={index}
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default OwnUserProfile;
