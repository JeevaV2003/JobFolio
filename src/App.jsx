import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Contact from "./components/Contact";
import ResumeBuilder from "./components/ResumeBuilder";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

export default function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/resume" element={<ResumeBuilder />} />
        </Routes>
        
        <footer className="footer-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 mb-4">
                <h5 className="footer-title">JobFinder</h5>
                <p className="footer-description">
                  Your gateway to finding the perfect career opportunity. 
                  Connect with top companies and discover your next role.
                </p>
              </div>
              <div className="col-lg-2 col-md-6 mb-4">
                <h6 className="footer-subtitle">Quick Links</h6>
                <ul className="footer-links">
                  <li><a href="/" className="footer-link">Browse Jobs</a></li>
                  <li><a href="/resume" className="footer-link">Resume Builder</a></li>
                  <li><a href="/contact" className="footer-link">Contact Us</a></li>
                </ul>
              </div>
              <div className="col-lg-2 col-md-6 mb-4">
                <h6 className="footer-subtitle">Resources</h6>
                <ul className="footer-links">
                  <li><a href="#" className="footer-link">Career Tips</a></li>
                  <li><a href="#" className="footer-link">Interview Prep</a></li>
                  <li><a href="#" className="footer-link">Salary Guide</a></li>
                </ul>
              </div>
              <div className="col-lg-2 col-md-6 mb-4">
                <h6 className="footer-subtitle">Support</h6>
                <ul className="footer-links">
                  <li><a href="#" className="footer-link">Help Center</a></li>
                  <li><a href="#" className="footer-link">Privacy Policy</a></li>
                  <li><a href="#" className="footer-link">Terms of Service</a></li>
                </ul>
              </div>
              <div className="col-lg-2 col-md-6 mb-4">
                <h6 className="footer-subtitle">Powered By</h6>
                <p className="footer-tech">React • Bootstrap • Framer Motion • RapidAPI</p>
              </div>
            </div>
            <hr className="footer-divider" />
            <div className="footer-bottom">
              <p>&copy; 2025 JobFinder. Developed by JEEVA V for job seekers everywhere.</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}
