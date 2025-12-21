import React from 'react';
import '../style/Solutions.css';

const Solutions = () => {
  const solutions = [
    {
      title: "Zero Trust Architecture",
      description: "Implement a comprehensive zero-trust security model that verifies every user and device before granting access to your network resources.",
      icon: "🔐",
      features: ["Identity verification", "Micro-segmentation", "Continuous monitoring", "Least privilege access"]
    },
    {
      title: "Cloud Security",
      description: "Protect your cloud infrastructure with advanced security controls, compliance management, and threat detection across all cloud platforms.",
      icon: "☁️",
      features: ["Multi-cloud security", "CASB integration", "Data encryption", "Compliance automation"]
    },
    {
      title: "Endpoint Protection",
      description: "Comprehensive endpoint security solution that protects all devices from advanced threats, malware, and unauthorized access.",
      icon: "💻",
      features: ["EDR capabilities", "Behavioral analysis", "Device management", "Threat hunting"]
    },
    {
      title: "Security Operations Center (SOC)",
      description: "24/7 monitoring and response services with our advanced Security Operations Center to detect and respond to threats in real-time.",
      icon: "🛡️",
      features: ["24/7 monitoring", "Threat intelligence", "Incident response", "Security analytics"]
    },
    {
      title: "Penetration Testing",
      description: "Regular security assessments and penetration testing to identify vulnerabilities before attackers can exploit them.",
      icon: "🔍",
      features: ["Vulnerability assessment", "Red team exercises", "Compliance testing", "Remediation guidance"]
    },
    {
      title: "Data Loss Prevention",
      description: "Prevent sensitive data from leaving your organization with advanced DLP solutions that monitor and control data movement.",
      icon: "📊",
      features: ["Data classification", "Policy enforcement", "Content inspection", "Incident reporting"]
    }
  ];

  return (
    <div className="solutions-container">
      <header className="solutions-header">
        <h1>Cybersecurity Solutions</h1>
        <h2>Comprehensive Protection for Your Digital Assets</h2>
      </header>

      <section className="solutions-intro">
        <p>
          At Turrpo Ideas, we offer cutting-edge cybersecurity solutions designed to protect your organization
          from evolving threats. Our comprehensive approach ensures your digital infrastructure remains secure,
          compliant, and resilient.
        </p>
      </section>

      <div className="solutions-grid">
        {solutions.map((solution, index) => (
          <div key={index} className="solution-card">
            <div className="solution-icon">{solution.icon}</div>
            <h3 className="solution-title">{solution.title}</h3>
            <p className="solution-description">{solution.description}</p>
            <ul className="solution-features">
              {solution.features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <section className="solutions-cta">
        <h2>Ready to Secure Your Organization?</h2>
        <p>Contact us today to discuss how our solutions can protect your business.</p>
        <a href="/contact" className="cta-button">Get Started</a>
      </section>
    </div>
  );
};

export default Solutions;

