import React, { useState } from 'react';
import { Link } from "react-router-dom"; 
import "../style/Navbar.css";
import logo from "../assets/images/logo.png"; 

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);

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

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src={logo} alt="Logo" className="logo" />
          <span className="brand-name">Turrpo Ideas</span>
        </Link>
      </div>
      <div className={`navbar-links ${isActive ? 'active' : ''}`}>
        <Link to="/" className="navbar-link" onClick={() => setIsActive(false)}>Home</Link>
        <Link to="/about" className="navbar-link" onClick={() => setIsActive(false)}>About</Link>
        <Link to="/services" className="navbar-link" onClick={() => setIsActive(false)}>Services</Link>
        <Link to="/solutions" className="navbar-link" onClick={() => setIsActive(false)}>Solutions</Link>
        <Link to="/resources" className="navbar-link" onClick={() => setIsActive(false)}>Resources</Link>
        <Link to="/contact" className="navbar-link" onClick={() => setIsActive(false)}>Contact</Link>
      </div>
      <div className="navbar-toggle" onClick={toggleNavbar}>
        ☰
      </div>
      <button className="navbar-button" onClick={handleConsultationClick}>Get a Free Consultation →</button>
    </nav>
  );
};

export default Navbar;
