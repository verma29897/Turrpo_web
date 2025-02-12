import React, { useState } from 'react';
import { Link } from "react-router-dom"; 
import "../style/Navbar.css";
import logo from "../assets/images/logo.png"; 

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleNavbar = () => {
    setIsActive(!isActive);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Logo" className="logo" />
        <span className="brand-name">Turrpo Ideas</span>
      </div>
      <div className={`navbar-links ${isActive ? 'active' : ''}`}>
        <Link to="/" className="navbar-link">Home</Link>
        <Link to="/about" className="navbar-link">About</Link>
        <Link to="/services" className="navbar-link">Services</Link>
        <Link to="/product" className="navbar-link">Product</Link>
        <Link to="/blog" className="navbar-link">Blog</Link>
        <Link to="/contact" className="navbar-link">Contact</Link>
      </div>
      <div className="navbar-toggle" onClick={toggleNavbar}>
        ☰
      </div>
      <button className="navbar-button">Get a Free Consultation →</button>
    </nav>
  );
};

export default Navbar;
