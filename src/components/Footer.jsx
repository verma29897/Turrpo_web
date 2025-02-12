import React from "react";
import logo from "../assets/images/logo.png";
import "../style/Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        {/* Branding */}
        <div className="branding">
          <div className="logo">
            <img src={logo} alt="logo" />
            <span>Turrpo Ideas</span>
          </div>
          <p>
            Since 1999, Bomis has been a trusted leader in cybersecurity,
            protecting digital assets.
          </p>
          {/* Social Media Icons */}
          <div className="social-icons">
            <a href="#" className="hover:text-purple-500">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="hover:text-purple-500">
              <i className="fab fa-x-twitter"></i>
            </a>
            <a href="#" className="hover:text-purple-500">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="#" className="hover:text-purple-500">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>

        {/* IT Solution Links */}
        <div>
          <h3>IT Solution</h3>
          <ul>
            <li>
              <a href="#" className="hover:text-purple-500">
                Malware Protection
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-purple-500">
                Computer Security
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-purple-500">
                Server Protection
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-purple-500">
                Cyber Security
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-purple-500">
                Security Monitoring
              </a>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3>Quick Link</h3>
          <ul>
            <li>
              <a href="/about" className="hover:text-purple-500">
                About 
              </a>
            </li>
            <li>
              <a href="/services" className="hover:text-purple-500">
                Our Services
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-purple-500">
                Pricing Plan
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-purple-500">
                Our Projects
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-purple-500">
                Our Team
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="contact-info">
          <h3>Contact Us</h3>
          <ul>
            <li>
              <i className="fas fa-map-marker-alt text-purple-500"></i>{" "}
              <span>Noida Sector 62, Uttar Pradesh, India</span>
            </li>
            <li>
              <i className="fas fa-phone text-purple-500"></i>{" "}
              <span>+91 7905968734</span>
            </li>
            <li>
              <i className="fas fa-clock text-purple-500"></i>{" "}
              <span>Mon - Sat: 10:00 AM - 4:00 PM</span>
            </li>
          </ul>
        </div>
      </div>
      {/* Bottom Section */}
      <div className="bottom-section">
        <p>
          © 2024 By <span className="text-purple-500">Turrpo Ideas</span>, All Rights
          Reserved.
        </p>
        <div>
          <a href="#" className="hover:text-purple-500">
            Terms & Conditions
          </a>
          <a href="#" className="hover:text-purple-500">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
