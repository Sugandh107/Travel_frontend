import React, { useState } from 'react';
import ProfileDrawer from './ProfileDrawer';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { toast } from 'react-toastify';

function Navbar() {
  const { login, user } = useContext(AuthContext);
  
  const handleDestination = () => {
    if (user) {
      window.location.href = '/destination';
    } else {
      toast.error("Login To access");
    }
  };

  const handlePackages = () => {
    if (user) {
      window.location.href = '/packages';
    } else {
      toast.error("Login To access");
    }
  };

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a onClick={handleDestination}>Destination</a>
            </li>
            <li>
              <a onClick={handlePackages}>Packages</a>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">TripBud</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a onClick={handleDestination}>Destination</a>
          </li>
          <li>
            <a onClick={handlePackages}>Packages</a>
          </li>
        </ul>
      </div>

      <div className="navbar-end mx-3">
        {user ? (
          <ProfileDrawer />
        ) : (
          <>
            <a href="/signup" className="btn">
              Signup
            </a>
            <a href="/login" className="btn text-white bg-orange-500 hover:bg-orange-600">
              Login
            </a>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
