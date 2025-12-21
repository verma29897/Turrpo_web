import React, { useState } from 'react';
import '../style/Contact.css'; // Import the CSS file

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate form submission (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Here you would typically send the data to your backend
      console.log('Form submitted:', formData);
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      
      // Reset status message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-container">
      <header className="contact-header">
        <h1>Contact Us</h1>
        <h2>We'd love to hear from you</h2>
      </header>

      <form className="contact-form" onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="name"
          placeholder="Your Name" 
          value={formData.name}
          onChange={handleChange}
          required 
        />
        <input 
          type="email" 
          name="email"
          placeholder="Your Email" 
          value={formData.email}
          onChange={handleChange}
          required 
        />
        <textarea 
          name="message"
          placeholder="Your Message" 
          rows="5" 
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>
        {submitStatus === 'success' && (
          <div style={{ 
            color: '#10b981', 
            marginBottom: '1rem', 
            padding: '0.75rem',
            background: 'rgba(16, 185, 129, 0.1)',
            borderRadius: '6px',
            border: '1px solid rgba(16, 185, 129, 0.3)'
          }}>
            Message sent successfully! We'll get back to you soon.
          </div>
        )}
        {submitStatus === 'error' && (
          <div style={{ 
            color: '#ef4444', 
            marginBottom: '1rem', 
            padding: '0.75rem',
            background: 'rgba(239, 68, 68, 0.1)',
            borderRadius: '6px',
            border: '1px solid rgba(239, 68, 68, 0.3)'
          }}>
            Error sending message. Please try again.
          </div>
        )}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
};

export default Contact;
