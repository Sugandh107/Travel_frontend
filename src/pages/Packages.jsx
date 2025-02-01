import React from 'react'
import Services from '../components/Services'
import VideoBackground from '../components/VideoBackground'

function Packages() {
  return (
    <div>
      <VideoBackground 
        videoSrc="./beachVid.mp4" 
        overlayText="Welcome to Our Service!" 
      />
      {/* Other components/content can go here */}
      <Services/>
    </div>
  )
}

export default Packages