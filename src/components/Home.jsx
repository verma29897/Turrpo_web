import React from 'react';
import '../style/Home.css'; // Import the CSS file

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to Turrpo Ideas</h1>
        <h2>Your Trusted Cyber Security Partner</h2>
      </header>

      <div className="home-content">
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
    </div>
  );
};

export default Home;
