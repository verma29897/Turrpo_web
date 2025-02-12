import React from 'react';
import '../style/Blog.css'; // Import the CSS file

const Blog = () => {
  return (
    <div className="blog-container">
      <header className="blog-header">
        <h1>Cyber Security Blog</h1>
        <h2>Stay Updated with the Latest in Cyber Security</h2>
      </header>
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
    </div>
  );
};

export default Blog;
