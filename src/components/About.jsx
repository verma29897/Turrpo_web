import React from 'react';
import '../style/About.css'; // Import the CSS file

const About = () => {
  return (
    <div className="about-container">
      <header className="about-header">
        <h1>About Us</h1>
        <h2>Learn More About Turrpo Ideas</h2>
      </header>

      <div className="about-content">
        <p>
          Turrpo Ideas has been a leader in the cybersecurity industry since 1999.
          Our mission is to provide top-notch security solutions to protect your digital assets.
        </p>
        <p>
          Our team of experts is dedicated to staying ahead of the latest threats and
          ensuring that your business remains secure in an ever-evolving digital landscape.
        </p>
        <p>
          We offer a wide range of services, including network security, endpoint security,
          cloud security, and application security. Our customized solutions are designed
          to meet the unique needs of each client.
        </p>
      </div>
    </div>
  );
};

export default About;
