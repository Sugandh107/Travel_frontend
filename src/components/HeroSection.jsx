import React, { useContext } from "react";
import "../styles/HeroSection.css";
import video from '../video/video-2.mp4'
import { AuthContext } from "../context/AuthProvider";
function HeroSection() {
  const { user } = useContext(AuthContext);


  return (
    <div className="hero-container">
      <video src={video} autoPlay loop muted />
      <div className="video-overlay">
        <h1>ADVENTURE AWAITS</h1>
        <p>What are you waiting for?</p>
        {user?"":<div className="hero-btns">
         <button onClick={()=>window.location.href='/login'} className="text-white font-serif text-xl p-3  bg-transparent rounded md:text-2xl lg:text-4xl border hover:bg-slate-100 hover:text-black ">GET STARTED</button>
        </div>}
      </div>
    </div>
  );
}

export default HeroSection;
