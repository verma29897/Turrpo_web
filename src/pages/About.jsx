import React from "react";
import "../style/About.css";
import horizontalImage from "../assets/images/services.jpg";

const services = [
  {
    title: "Cybersecurity Consulting",
    description:
      "Our expert consultants assess your organization's security posture, identify vulnerabilities, and develop tailored strategies.",
    icon: "🛡️",
  },
  {
    title: "Threat Detection and Response",
    description:
      "Our advanced threat detection systems monitor your network 24/7, identifying and mitigating risks proactively.",
    icon: "🚨",
  },
  {
    title: "Vulnerability Assessment",
    description:
      "We simulate real-world attacks to uncover vulnerabilities in your systems, applications, and networks.",
    icon: "🔍",
  },
  {
    title: "Incident Response and Recovery",
    description:
      "When a security incident occurs, our rapid response team contains the breach and restores system integrity.",
    icon: "⚡",
  },
  {
    title: "Security Awareness Training",
    description:
      "We empower employees with the knowledge and skills to recognize and prevent cyber threats effectively.",
    icon: "🎓",
  },
  {
    title: "Data Security Services",
    description:
      "Our data security solutions protect your organization's sensitive data from unauthorized access and breaches.",
    icon: "🔒",
  },
];

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content-image-container">
        <div className="about-content-image">
          <div className="about-content">
            <h1>ABOUT US</h1>
            <h2>Learn More About Turrpo Ideas</h2>
            <p>
              Turrpo Ideas has been a leader in the cybersecurity industry since 2021.
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
          <div className="about-image">
            <img src={horizontalImage} alt="About Turrpo Ideas" />
          </div>
        </div>
      </div>

      <div className="services-container">
        <section className="header-section">
          <h2 className="title">Comprehensive Cybersecurity Solutions</h2>
        </section>
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <span className="service-icon">{service.icon}</span>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
