import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate sending
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="page-container">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="contact-wrapper"
        >
          <div className="text-center mb-5">
            <h1 className="display-4 fw-bold mb-3">Get in Touch</h1>
            <p className="lead text-muted">
              Have questions or need support? We're here to help you.
            </p>
          </div>

          <div className="row g-5">
            {/* Contact Info Column */}
            <div className="col-lg-5">
              <div className="contact-card h-100">
                <div className="contact-item mb-4">
                  <div className="contact-icon-wrapper phone">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.12 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <div className="contact-info">
                    <h3>Phone Support</h3>
                    <p>Mon-Fri from 9am to 6pm</p>
                    <a href="tel:+916361154988" className="contact-link">+91 6361154988</a>
                  </div>
                </div>

                <div className="contact-item mb-4">
                  <div className="contact-icon-wrapper email">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <div className="contact-info">
                    <h3>Email Us</h3>
                    <p>We'll get back to you within 24 hours</p>
                    <a href="mailto:jeeva0327.2002@gmail.com" className="contact-link">jeeva0327.2002@gmail.com</a>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon-wrapper linkedin">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </div>
                  <div className="contact-info">
                    <h3>Connect on LinkedIn</h3>
                    <p>Follow for updates and career tips</p>
                    <a href="https://www.linkedin.com/in/jeeva-v-2003-/" target="_blank" rel="noopener noreferrer" className="contact-link">
                      View Profile
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form Column */}
            <div className="col-lg-7">
              <div className="contact-card p-5">
                <h3 className="mb-4 fw-bold">Send us a Message</h3>
                {submitted ? (
                   <div className="alert alert-success">Message sent successfully! We'll get back to you soon.</div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label fw-bold small text-uppercase text-muted">Your Name</label>
                        <input 
                          type="text" 
                          className="form-control form-control-lg" 
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required 
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-bold small text-uppercase text-muted">Your Email</label>
                        <input 
                          type="email" 
                          className="form-control form-control-lg" 
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required 
                        />
                      </div>
                      <div className="col-12">
                        <label className="form-label fw-bold small text-uppercase text-muted">Subject</label>
                        <input 
                          type="text" 
                          className="form-control form-control-lg" 
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required 
                        />
                      </div>
                      <div className="col-12">
                        <label className="form-label fw-bold small text-uppercase text-muted">Message</label>
                        <textarea 
                          className="form-control form-control-lg" 
                          rows="5" 
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                        ></textarea>
                      </div>
                      <div className="col-12">
                        <button type="submit" className="btn btn-primary btn-lg w-100 fw-bold mt-3">
                          Send Message
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
