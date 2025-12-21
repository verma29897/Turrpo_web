import React from 'react';
import '../style/Compliance.css';

const Compliance = () => {
  const handleLearnMore = (standardName) => {
    const urls = {
      "GDPR": "https://gdpr.eu/",
      "HIPAA": "https://www.hhs.gov/hipaa/index.html",
      "PCI-DSS": "https://www.pcisecuritystandards.org/",
      "SOC 2": "https://www.aicpa.org/interestareas/frc/assuranceadvisoryservices/aicpasoc2report.html",
      "ISO 27001": "https://www.iso.org/isoiec-27001-information-security.html",
      "NIST": "https://www.nist.gov/cyberframework"
    };
    
    const url = urls[standardName] || "https://gdpr.eu/";
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const complianceStandards = [
    {
      name: "GDPR",
      fullName: "General Data Protection Regulation",
      description: "Ensure your organization meets EU data protection requirements with comprehensive GDPR compliance solutions.",
      requirements: ["Data protection impact assessments", "Privacy by design", "Data breach notification", "Right to erasure"]
    },
    {
      name: "HIPAA",
      fullName: "Health Insurance Portability and Accountability Act",
      description: "Protect patient health information and maintain HIPAA compliance with our specialized healthcare security solutions.",
      requirements: ["Administrative safeguards", "Physical safeguards", "Technical safeguards", "Breach notification"]
    },
    {
      name: "PCI-DSS",
      fullName: "Payment Card Industry Data Security Standard",
      description: "Secure payment card data and achieve PCI-DSS compliance for your organization's payment processing.",
      requirements: ["Secure network architecture", "Cardholder data protection", "Access control", "Regular testing"]
    },
    {
      name: "SOC 2",
      fullName: "System and Organization Controls 2",
      description: "Demonstrate your commitment to security, availability, and confidentiality with SOC 2 Type II certification.",
      requirements: ["Security controls", "Availability monitoring", "Processing integrity", "Confidentiality"]
    },
    {
      name: "ISO 27001",
      fullName: "ISO/IEC 27001 Information Security Management",
      description: "Implement an information security management system (ISMS) aligned with ISO 27001 standards.",
      requirements: ["Risk assessment", "Security controls", "Continuous improvement", "Management commitment"]
    },
    {
      name: "NIST",
      fullName: "NIST Cybersecurity Framework",
      description: "Align your cybersecurity practices with the NIST Cybersecurity Framework for comprehensive protection.",
      requirements: ["Identify", "Protect", "Detect", "Respond", "Recover"]
    }
  ];

  return (
    <div className="compliance-container">
      <header className="compliance-header">
        <h1>Compliance & Certifications</h1>
        <h2>Meeting Industry Standards and Regulations</h2>
      </header>

      <section className="compliance-intro">
        <p>
          Turrpo Ideas helps organizations achieve and maintain compliance with industry regulations and standards.
          Our comprehensive compliance solutions ensure your security practices meet or exceed regulatory requirements.
        </p>
      </section>

      <div className="compliance-grid">
        {complianceStandards.map((standard, index) => (
          <div key={index} className="compliance-card">
            <div className="compliance-badge">
              <h3 className="compliance-name">{standard.name}</h3>
              <p className="compliance-fullname">{standard.fullName}</p>
            </div>
            <p className="compliance-description">{standard.description}</p>
            <div className="compliance-requirements">
              <h4>Key Requirements:</h4>
              <ul>
                {standard.requirements.map((req, idx) => (
                  <li key={idx}>{req}</li>
                ))}
              </ul>
            </div>
            <button className="compliance-button" onClick={() => handleLearnMore(standard.name)}>Learn More</button>
          </div>
        ))}
      </div>

      <section className="compliance-cta">
        <h2>Need Help with Compliance?</h2>
        <p>Our compliance experts can help you navigate complex regulatory requirements.</p>
        <a href="/contact" className="cta-button">Schedule a Consultation</a>
      </section>
    </div>
  );
};

export default Compliance;

