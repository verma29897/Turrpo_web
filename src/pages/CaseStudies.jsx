import React from 'react';
import '../style/CaseStudies.css';

const CaseStudies = () => {
  const caseStudies = [
    {
      title: "Fortune 500 Financial Institution",
      industry: "Financial Services",
      challenge: "Facing increasing cyber threats and regulatory compliance requirements.",
      solution: "Implemented comprehensive zero-trust architecture with 24/7 SOC monitoring.",
      results: [
        "99.9% threat detection rate",
        "Zero security breaches in 2 years",
        "Full compliance with industry regulations",
        "50% reduction in security incidents"
      ],
      testimonial: "Turrpo Ideas transformed our security posture. Their expertise and proactive approach have been invaluable."
    },
    {
      title: "Healthcare Provider Network",
      industry: "Healthcare",
      challenge: "Protecting patient data and ensuring HIPAA compliance across multiple facilities.",
      solution: "Deployed advanced endpoint protection and data loss prevention solutions.",
      results: [
        "100% HIPAA compliance",
        "Protected 500,000+ patient records",
        "Real-time threat detection",
        "Streamlined compliance reporting"
      ],
      testimonial: "The team at Turrpo Ideas helped us achieve and maintain HIPAA compliance while significantly improving our security."
    },
    {
      title: "E-commerce Platform",
      industry: "Retail",
      challenge: "Securing customer payment data and preventing data breaches.",
      solution: "Implemented PCI-DSS compliant infrastructure with advanced threat detection.",
      results: [
        "PCI-DSS Level 1 certification",
        "Zero payment data breaches",
        "99.99% uptime",
        "Enhanced customer trust"
      ],
      testimonial: "Our customers trust us with their payment information, and Turrpo Ideas ensures that trust is well-placed."
    },
    {
      title: "Technology Startup",
      industry: "Technology",
      challenge: "Building secure infrastructure from the ground up with limited resources.",
      solution: "Cloud security framework and automated security controls.",
      results: [
        "Secure cloud migration",
        "Automated security monitoring",
        "Cost-effective solution",
        "Scalable security architecture"
      ],
      testimonial: "Turrpo Ideas helped us build a secure foundation that scales with our business growth."
    }
  ];

  return (
    <div className="casestudies-container">
      <header className="casestudies-header">
        <h1>Case Studies</h1>
        <h2>Real Results from Real Clients</h2>
      </header>

      <section className="casestudies-intro">
        <p>
          Discover how organizations across various industries have strengthened their cybersecurity
          posture with Turrpo Ideas. Our proven solutions deliver measurable results and peace of mind.
        </p>
      </section>

      <div className="casestudies-grid">
        {caseStudies.map((study, index) => (
          <div key={index} className="casestudy-card">
            <div className="casestudy-header">
              <h3 className="casestudy-title">{study.title}</h3>
              <span className="casestudy-industry">{study.industry}</span>
            </div>
            
            <div className="casestudy-section">
              <h4>Challenge</h4>
              <p>{study.challenge}</p>
            </div>

            <div className="casestudy-section">
              <h4>Solution</h4>
              <p>{study.solution}</p>
            </div>

            <div className="casestudy-section">
              <h4>Results</h4>
              <ul className="casestudy-results">
                {study.results.map((result, idx) => (
                  <li key={idx}>{result}</li>
                ))}
              </ul>
            </div>

            <div className="casestudy-testimonial">
              <p>"{study.testimonial}"</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CaseStudies;

