import React from 'react';
import '../style/Services.css'; // Import the CSS file
import horizontalImage from "../assets/images/services.jpg"; 

const Services = () => {
  return (
    <div className="secur-container">
      <header className="secur-header">
        <h1>Why Choose Turrpo Ideas</h1>
        <h2>Advanced Security Solutions For A Digital Age</h2>
      </header>

      {/* Horizontal Image Section */}
      <div className="secur-image">
        <img src={horizontalImage} alt="Secur Advanced Security" />
      </div>

      <section className="secur-intro">
        <p>
          For over two decades, Turrpo Ideas has been at the forefront of cybersecurity,
          adapting to the ever-evolving threat landscape. Our seasoned professionals
          have a deep understanding of the latest attack vectors.
        </p>
      </section>

      <section className="secur-features">
        <div className="feature">
          <h3>Cutting-Edge Technology</h3>
          <p>
            We leverage the latest cybersecurity tools and techniques to safeguard
            your business. Our advanced threat detection systems ensure comprehensive protection.
          </p>
        </div>
        <div className="feature">
          <h3>Customized Solutions</h3>
          <p>
            Our tailored approach ensures that your security needs are met,
            regardless of your industry or size.
          </p>
        </div>
      </section>

      <section className="service-section">
        <h3>Our Cyber Security Services</h3>
        <div className="service-list">
          <div className="service-item">
            <span className="service-icon">🌐</span>
            <h4>Network Security</h4>
            <p>
              Protect your network infrastructure with our advanced network security solutions.
              We offer firewall management, intrusion detection, and prevention systems.
            </p>
          </div>
          <div className="service-item">
            <span className="service-icon">💻</span>
            <h4>Endpoint Security</h4>
            <p>
              Secure all endpoints including desktops, laptops, and mobile devices.
              Our endpoint security solutions include antivirus, anti-malware, and device management.
            </p>
          </div>
          <div className="service-item">
            <span className="service-icon">☁️</span>
            <h4>Cloud Security</h4>
            <p>
              Ensure the security of your cloud environments with our comprehensive cloud security services.
              We provide cloud access security brokers (CASB), encryption, and compliance management.
            </p>
          </div>
          <div className="service-item">
            <span className="service-icon">🔐</span>
            <h4>Application Security</h4>
            <p>
              Protect your applications from vulnerabilities and attacks.
              Our application security services include code reviews, penetration testing, and secure development practices.
            </p>
          </div>
        </div>
      </section>

      <section className="secur-achievements">
        <h2>Our Achievements</h2>
        <div className="achievement-grid">
          <div className="achievement">
            <h3>50+</h3>
            <p>Projects Completed</p>
          </div>
          <div className="achievement">
            <h3>95%</h3>
            <p>Client Retention Rate</p>
          </div>
          <div className="achievement">
            <h3>1k+</h3>
            <p>Customers Globally</p>
          </div>
          <div className="achievement">
            <h3>2+</h3>
            <p>Years Of Experience</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;