// src/components/Footer.js
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">About Us</h3>
            <p className="text-gray-400">
              We provide tools to track and manage your expenses effortlessly. 
              Join us in making budgeting simple and efficient.
            </p>
          </div>

          {/* Links Section */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Stay Updated</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter to get the latest updates directly in your inbox.
            </p>
            <form>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-2 rounded-l-lg border border-gray-600 bg-gray-700 text-white focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-r-lg"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-6"></div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} TripBud. All rights reserved.
          </p>
          <ul className="flex space-x-4 mt-4 md:mt-0">
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition"
                aria-label="Twitter"
              >
                <i className="fab fa-twitter"></i>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
