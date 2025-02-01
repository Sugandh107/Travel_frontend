import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthProvider';
import useUserData from '../hooks/useUserdata';
import { toast } from 'react-toastify';

function ProfileDrawer() {
  const { login,logOut,user } = useContext(AuthContext);
  const { userData, loading, error } = useUserData(user?.email);
  console.log(userData);
  
  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("logout success");
        setTimeout((window.location.href = "/"), 2000);
      })
      .catch((error) => {
        console.log(error);
        
      });
  };
  return (
    <div className="z-50">
  <div className="drawer drawer-end">
    <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
    <div className="drawer-content flex justify-end items-center">
      {/* Profile section */}
      <label htmlFor="my-drawer-4" className="drawer-button cursor-pointer flex items-center space-x-3">
        <img 
          src={userData?.photoURL} 
          alt="Profile" 
          className="w-10 h-10 rounded-full object-cover"
        />
        {/* <span className="text-base font-medium">John Doe</span> */}
      </label>
    </div>
    <div className="drawer-side">
      <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
      <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
        {/* Sidebar content */}
        <li><a href='/profile'>View Profile</a></li>
        <li><a href='/expense'>Expense</a></li>
        
        <li>
              <a onClick={handleLogout}>

              <span className="mx-6">Logout</span>
              </a>
            </li>
      </ul>
    </div>
  </div>
</div>

  )
}

export default ProfileDrawer