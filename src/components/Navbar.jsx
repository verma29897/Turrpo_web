import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom"; 
import "../style/Navbar.css";
import logo from "../assets/images/logo.png"; 

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);
  const location = useLocation();

  const toggleNavbar = () => {
    setIsActive(!isActive);
  };

  const handleConsultationClick = () => {
    // Open email client with consultation request
    const email = 'krishna@turrpo.com';
    const subject = encodeURIComponent('Free Consultation Request');
    const body = encodeURIComponent('Hello,\n\nI would like to request a free consultation regarding your cybersecurity services.\n\nThank you!');
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    setIsActive(false); // Close mobile menu if open
  };

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src={logo} alt="Logo" className="logo" />
          <span className="brand-name">Turrpo Ideas</span>
        </Link>
      </div>
      <div className={`navbar-links ${isActive ? 'active' : ''}`}>
        <li>
          <Link 
            to="/" 
            className={`navbar-link ${isActiveLink('/') ? 'active' : ''}`} 
            onClick={() => setIsActive(false)}
          >
            Home
          </Link>
        </li>
        <li>
          <Link 
            to="/about" 
            className={`navbar-link ${isActiveLink('/about') ? 'active' : ''}`} 
            onClick={() => setIsActive(false)}
          >
            About
          </Link>
        </li>
        <li>
          <Link 
            to="/services" 
            className={`navbar-link ${isActiveLink('/services') ? 'active' : ''}`} 
            onClick={() => setIsActive(false)}
          >
            Services
          </Link>
        </li>
        <li>
          <Link 
            to="/solutions" 
            className={`navbar-link ${isActiveLink('/solutions') ? 'active' : ''}`} 
            onClick={() => setIsActive(false)}
          >
            Solutions
          </Link>
        </li>
        <li>
          <Link 
            to="/resources" 
            className={`navbar-link ${isActiveLink('/resources') ? 'active' : ''}`} 
            onClick={() => setIsActive(false)}
          >
            Resources
          </Link>
        </li>
        <li>
          <Link 
            to="/contact" 
            className={`navbar-link ${isActiveLink('/contact') ? 'active' : ''}`} 
            onClick={() => setIsActive(false)}
          >
            Contact
          </Link>
        </li>
      </div>
      <div className="navbar-toggle" onClick={toggleNavbar}>
        ☰
      </div>
      <button className="navbar-button" onClick={handleConsultationClick}>Get a Free Consultation →</button>
    </nav>
  );
};

export default Navbar;
