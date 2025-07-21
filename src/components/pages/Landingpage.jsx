import React from 'react'
import { Link } from 'react-router-dom'
import '../Designs/LandingPage.css' // Make sure this path is correct

const Landingpage = () => {
  return (
    <div className="landing-wrapper">
      <video autoPlay loop muted playsInline className="background-video">
        <source src="/assets/258607_small.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="overlay-content">
        <div className="quote-section">
          <h1>Explore the Universe</h1>
          <p>This site brings you closer to the cosmos.</p>
        </div>

        <div className="componentSection">
          <Link to="/apod" className="nav-link">NASA Picture of the Day</Link>
          <Link to="/asteroids" className="nav-link">Near Earth Asteroid Information</Link>
          <Link to="/epic" className="nav-link">Images of Earth on Specific Dates</Link>
        </div>
      </div>
    </div>
  )
}

export default Landingpage
