import React, { useState } from 'react';
import '../style/Resources.css';
import jsPDF from 'jspdf';

const Resources = () => {
  const [activeTab, setActiveTab] = useState('Resources');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [downloading, setDownloading] = useState({});

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

  const resources = [
    {
      title: "Cybersecurity Best Practices Guide",
      type: "PDF Guide",
      description: "A comprehensive guide covering essential cybersecurity practices for businesses of all sizes.",
      category: "Guides",
      filename: "cybersecurity-best-practices-guide.pdf"
    },
    {
      title: "Zero Trust Architecture Whitepaper",
      type: "Whitepaper",
      description: "Learn how to implement zero-trust security models to protect your organization from modern threats.",
      category: "Whitepapers",
      filename: "zero-trust-architecture-whitepaper.pdf"
    },
    {
      title: "Ransomware Prevention Checklist",
      type: "Checklist",
      description: "Essential steps to protect your organization from ransomware attacks and data breaches.",
      category: "Checklists",
      filename: "ransomware-prevention-checklist.pdf"
    },
    {
      title: "Cloud Security Framework",
      type: "Framework",
      description: "A detailed framework for securing cloud infrastructure across multiple platforms.",
      category: "Frameworks",
      filename: "cloud-security-framework.pdf"
    },
    {
      title: "Incident Response Playbook",
      type: "Playbook",
      description: "Step-by-step guide for responding to security incidents effectively and minimizing damage.",
      category: "Playbooks",
      filename: "incident-response-playbook.pdf"
    },
    {
      title: "Compliance Requirements Guide",
      type: "Guide",
      description: "Understanding GDPR, HIPAA, PCI-DSS, and other compliance requirements for your industry.",
      category: "Compliance",
      filename: "compliance-requirements-guide.pdf"
    }
  ];

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

  const categories = ["All", "Guides", "Whitepapers", "Checklists", "Frameworks", "Playbooks", "Compliance"];

  const handleDownload = async (resource, index) => {
    setDownloading(prev => ({ ...prev, [index]: true }));

    try {
      const pdf = new jsPDF();
      
      pdf.setFontSize(20);
      pdf.setTextColor(139, 92, 246);
      pdf.text(resource.title, 20, 30);
      
      pdf.setFontSize(12);
      pdf.setTextColor(100, 100, 100);
      pdf.text('Turrpo Ideas - Cybersecurity Solutions', 20, 40);
      pdf.text('www.turrpo.com | krishna@turrpo.com', 20, 46);
      
      pdf.setDrawColor(139, 92, 246);
      pdf.line(20, 50, 190, 50);
      
      pdf.setFontSize(14);
      pdf.setTextColor(0, 0, 0);
      pdf.text('Description:', 20, 60);
      
      pdf.setFontSize(11);
      pdf.setTextColor(50, 50, 50);
      const descriptionLines = pdf.splitTextToSize(resource.description, 170);
      pdf.text(descriptionLines, 20, 70);
      
      let yPosition = 90;
      pdf.setFontSize(14);
      pdf.setTextColor(0, 0, 0);
      pdf.text('Overview:', 20, yPosition);
      
      yPosition += 10;
      pdf.setFontSize(11);
      pdf.setTextColor(50, 50, 50);
      
      const contentText = `This ${resource.type.toLowerCase()} provides comprehensive information about ${resource.title.toLowerCase()}. 
      
Key topics covered:
• Best practices and industry standards
• Implementation guidelines
• Security considerations
• Compliance requirements
• Risk management strategies

This document is part of Turrpo Ideas' comprehensive cybersecurity resource library. For more detailed information or to discuss how we can help secure your organization, please contact us.

For inquiries, please email: krishna@turrpo.com

© ${new Date().getFullYear()} Turrpo Ideas. All rights reserved.`;
      
      const contentLines = pdf.splitTextToSize(contentText, 170);
      pdf.text(contentLines, 20, yPosition);
      
      const pageCount = pdf.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        pdf.setPage(i);
        pdf.setFontSize(10);
        pdf.setTextColor(150, 150, 150);
        pdf.text(`Page ${i} of ${pageCount}`, 190, 285, { align: 'right' });
      }
      
      pdf.save(resource.filename);
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error('Download error:', error);
      alert('Error generating PDF. Please try again or contact us at krishna@turrpo.com');
    } finally {
      setDownloading(prev => ({ ...prev, [index]: false }));
    }
  };

  const filteredResources = selectedCategory === 'All' 
    ? resources 
    : resources.filter(resource => resource.category === selectedCategory);

  const tabs = ['Resources', 'Case Studies', 'Compliance', 'Blog'];

  return (
    <div className="resources-container">
      <header className="resources-header">
        <h1>Resources</h1>
        <h2>Expert Insights and Tools for Cybersecurity</h2>
      </header>

      <div className="resources-tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tab-button ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Resources' && (
        <>
          <section className="resources-intro">
            <p>
              Access our library of cybersecurity resources, including whitepapers, guides, frameworks, and tools
              to help strengthen your organization's security posture.
            </p>
          </section>

          <div className="resources-categories">
            {categories.map((category, index) => (
              <button 
                key={index} 
                className={`category-button ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="resources-grid">
            {filteredResources.map((resource, index) => (
              <div key={index} className="resource-card">
                <div className="resource-type">{resource.type}</div>
                <h3 className="resource-title">{resource.title}</h3>
                <p className="resource-description">{resource.description}</p>
                <div className="resource-footer">
                  <span className="resource-category">{resource.category}</span>
                  <button 
                    className="download-button" 
                    onClick={() => handleDownload(resource, index)}
                    disabled={downloading[index]}
                  >
                    {downloading[index] ? 'Downloading...' : 'Download'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === 'Case Studies' && (
        <>
          <section className="resources-intro">
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
        </>
      )}

      {activeTab === 'Compliance' && (
        <>
          <section className="resources-intro">
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
        </>
      )}

      {activeTab === 'Blog' && (
        <>
          <section className="resources-intro">
            <p>
              Stay updated with the latest insights, trends, and best practices in cybersecurity.
            </p>
          </section>

          <div className="blog-content">
            <article className="blog-post">
              <h3>What is Netfilter?</h3>
              <p>
                Netfilter is a framework provided by the Linux kernel that allows various networking-related operations to be implemented in the form of customized handlers. It provides functionalities such as packet filtering, network address translation (NAT), and port translation. Netfilter is a crucial component in building firewalls and managing network traffic.
              </p>
            </article>
            <article className="blog-post">
              <h3>Types of Cyber Attacks and Countermeasures</h3>
              <p>
                Cyber attacks come in various forms, each with its own methods and objectives. Here are some common types of cyber attacks and their countermeasures:
              </p>
              <div className="attack-grid">
                <div className="attack-container">
                  <h4>Phishing</h4>
                  <p>
                    A technique where attackers trick individuals into providing sensitive information by pretending to be a trustworthy entity.
                  </p>
                  <p><strong>Countermeasure:</strong> Educate users about phishing tactics, use email filtering, and implement multi-factor authentication.</p>
                </div>
                <div className="attack-container">
                  <h4>Malware</h4>
                  <p>
                    Malicious software designed to harm or exploit any programmable device, service, or network.
                  </p>
                  <p><strong>Countermeasure:</strong> Use antivirus software, keep systems updated, and avoid downloading software from untrusted sources.</p>
                </div>
                <div className="attack-container">
                  <h4>Ransomware</h4>
                  <p>
                    A type of malware that encrypts the victim's files and demands a ransom to restore access.
                  </p>
                  <p><strong>Countermeasure:</strong> Regularly back up data, use robust security software, and educate users on safe email practices.</p>
                </div>
                <div className="attack-container">
                  <h4>Denial of Service (DoS)</h4>
                  <p>
                    An attack that aims to make a machine or network resource unavailable to its intended users by overwhelming it with a flood of internet traffic.
                  </p>
                  <p><strong>Countermeasure:</strong> Implement network security measures such as firewalls and intrusion detection systems, and use traffic analysis tools.</p>
                </div>
                <div className="attack-container">
                  <h4>Man-in-the-Middle (MitM)</h4>
                  <p>
                    An attack where the attacker secretly intercepts and relays messages between two parties who believe they are directly communicating with each other.
                  </p>
                  <p><strong>Countermeasure:</strong> Use encryption protocols like HTTPS, implement VPNs, and educate users on secure communication practices.</p>
                </div>
                <div className="attack-container">
                  <h4>SQL Injection</h4>
                  <p>
                    A code injection technique that might destroy your database. It is one of the most common web hacking techniques.
                  </p>
                  <p><strong>Countermeasure:</strong> Use parameterized queries, validate user inputs, and implement web application firewalls.</p>
                </div>
              </div>
            </article>
          </div>
        </>
      )}
    </div>
  );
};

export default Resources;
