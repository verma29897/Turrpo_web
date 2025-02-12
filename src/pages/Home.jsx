import React from 'react';
import '../style/Home.css'; // Import the CSS file
import horizontalImage from "../assets/images/dashboard.jpg"; // Adjust the path based on your folder structure

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content-image-container">
        <div className="home-content-image">
          <div className="home-content">
            
              <h1>Welcome to Turrpo Ideas</h1>
              <h2>Your Trusted Cyber Security Partner</h2>
            
            <p>
              At Turrpo Ideas, we are committed to providing the highest level of cybersecurity
              solutions to protect your digital assets. Our team of experts is dedicated to
              staying ahead of the latest threats and ensuring that your business remains secure.
            </p>
            <p>
              Explore our range of services and products designed to meet the unique needs of
              your business. From network security to cloud security, we have the solutions
              you need to stay protected.
            </p>
          </div>
          <div className="home-image">
            <img src={horizontalImage} alt="Cyber Security Horizontal" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
