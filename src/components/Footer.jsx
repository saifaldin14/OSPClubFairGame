import { Link } from 'react-router-dom'
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">
              <img src="/UWOSP_Logo_White.png" alt="OSP Logo" className="footer-logo" />
            </h3>
            <p className="footer-description">
              Orphan Sponsorship Program - Making a difference in the lives 
              of orphans around the world through compassion and Islamic values.
            </p>
            <div className="footer-social">
              <a href="#" className="social-icon" aria-label="Facebook"><Facebook size={18} /></a>
              <a href="#" className="social-icon" aria-label="Twitter"><Twitter size={18} /></a>
              <a href="#" className="social-icon" aria-label="Instagram"><Instagram size={18} /></a>
              <a href="#" className="social-icon" aria-label="LinkedIn"><Linkedin size={18} /></a>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/programs">Programs</Link></li>
              <li><Link to="/events">Events</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Get Involved</h4>
            <ul className="footer-links">
              <li><Link to="/donate">Donate</Link></li>
              <li><Link to="/contact">Volunteer</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Contact Info</h4>
            <ul className="footer-contact">
              <li><Mail size={14} /> info@ospcharity.org</li>
              <li><Phone size={14} /> +1 (555) 123-4567</li>
              <li><MapPin size={14} /> 123 Charity Lane<br/>Community Center<br/>City, State 12345</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} OSP - Orphan Sponsorship Program. All rights reserved.</p>
          <p className="footer-tax">501(c)(3) Non-Profit Organization | Tax ID: 12-3456789</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
