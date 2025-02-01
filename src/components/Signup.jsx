import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const SignUp = () => {
  const { createUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    photoURL: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize the navigate function

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, photoURL, email, password } = formData;

    try {
      await createUser(email, password);
      const response = await fetch("http://localhost:5000/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, photoURL }),
      });

      if (!response.ok) {
        throw new Error("Failed to send user data to the backend");
      }

      toast.success("Signup successful");
      setTimeout(() => {
        navigate("/login"); // Navigate to login page after successful signup
      }, 2000);
    } catch (err) {
      toast.error(err.message);
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100"
    style={{
      backgroundImage: `url('images/bg.jpg')`,
    }}>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="block w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="text"
          name="photoURL"
          placeholder="Photo URL"
          value={formData.photoURL}
          onChange={handleChange}
          className="block w-full p-2 mb-4 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="block w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="block w-full p-2 mb-4 border rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded w-full">
          Sign Up
        </button>

        {/* Link to Login page */}
        <div className="mt-4 text-center">
          <p>
            Have an account?{" "}
            <span
              onClick={() => navigate("/login")} // Navigate to login page
              className="text-blue-500 cursor-pointer"
            >
              Log in
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
