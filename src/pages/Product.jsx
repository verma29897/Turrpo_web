import React from 'react';
import '../style/Product.css';
import product from "../assets/images/services.jpg"; 

const Product = () => {
  return (
    <div className="product-container">
      <header className="product-header">
        <h1>Our Products</h1>
        <h2>High-Quality Cyber Security Solutions</h2>
      </header>

      <div className="product-content">
        <img src={product} alt="Bomis" className="product-image" />
        <div className="product-details">
          <div className="product-heading-container">
            <h2 className="product-title">Bomis (Boundary Oriented Malware Inspection System)</h2>
            <h2>All-in-One Cybersecurity Solution</h2>
          </div>
          <p className="product-description">
            Bomis is an advanced cybersecurity solution designed to protect businesses from digital threats.
            With real-time monitoring, AI-driven analytics, and automated response systems, it ensures your data and systems remain secure.
          </p>
          <h3 className="product-section-title">Key Features:</h3>
          <ul className="product-list">
            <li>Real-Time Threat Detection</li>
            <li>AI-Powered Anomaly Detection</li>
            <li>24/7 Monitoring</li>
            <li>Compliance with GDPR and HIPAA</li>
          </ul>
          <h3 className="product-section-title">Pricing:</h3>
          <p className="product-price">Starting at $499/month for small businesses.</p>
        </div>
      </div>
      <p className="product-testimonial">"Bomis helped us mitigate a ransomware attack within minutes, saving us millions!"</p>
    </div>
  );
};

export default Product;
