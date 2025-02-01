import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { toast } from "react-toastify";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    try {
      await login(email, password);
      toast.success("Login Successful");
      setTimeout(() => {
        window.location.href='/'; // Using history.push to navigate
      }, 2000);
    } catch (err) {
      toast.error(err.message);
      setError(err.message);
    }
  };

  return (
    <div
    className="min-h-screen flex justify-center items-center bg-cover bg-center"
    style={{
      backgroundImage: `url('images/bg.jpg')`,
    }}
  >
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-96 space-y-4">
        <h2 className="text-3xl font-bold text-center mb-6">Log In</h2>
        
        {/* Error Message */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        
        {/* Email Input */}
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="block w-full p-3 mb-4 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        {/* Password Input */}
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="block w-full p-3 mb-6 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        {/* Login Button */}
        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Log In
        </button>
        
        {/* Sign Up Link */}
        <div className="text-center mt-4">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <button
              onClick={() => window.location.href="/signup"}
              className="text-blue-500 font-semibold hover:text-blue-600"
            >
              Sign Up
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
