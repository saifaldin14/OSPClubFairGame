import { useState } from 'react'

import { Mail, Phone, MapPin, Clock } from 'lucide-react'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Thank you for your message! We will get back to you soon.')
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <div className="page contact-page">
      <div className="page-hero">
        <div className="container">
          <h1 className="page-title">Contact Us</h1>
          <p className="page-subtitle">We'd love to hear from you</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="contact-content">
            <div className="contact-info">
              <h2>Get in Touch</h2>
              <p>
                Have questions about our programs, want to volunteer, or need more information? 
                We're here to help!
              </p>

              <div className="contact-details">
                <div className="contact-item">
                  <div className="contact-icon"><Mail size={24} /></div>
                  <div>
                    <h3>Email</h3>
                    <p>info@ospcharity.org</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon"><Phone size={24} /></div>
                  <div>
                    <h3>Phone</h3>
                    <p>+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon"><MapPin size={24} /></div>
                  <div>
                    <h3>Address</h3>
                    <p>123 Charity Lane<br/>Community Center, Suite 100<br/>City, State 12345</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon"><Clock size={24} /></div>
                  <div>
                    <h3>Office Hours</h3>
                    <p>Monday - Friday: 9:00 AM - 5:00 PM<br/>Saturday: 10:00 AM - 2:00 PM<br/>Sunday: Closed</p>
                  </div>
                </div>
              </div>

              <div className="social-media">
                <h3>Follow Us</h3>
                <div className="social-links">
                  <a href="#" className="social-link">Facebook</a>
                  <a href="#" className="social-link">Twitter</a>
                  <a href="#" className="social-link">Instagram</a>
                  <a href="#" className="social-link">LinkedIn</a>
                </div>
              </div>
            </div>

            <div className="contact-form-container">
              <form className="contact-form" onSubmit={handleSubmit}>
                <h3>Send Us a Message</h3>

                <div className="form-group">
                  <label htmlFor="name">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="form-textarea"
                    rows="6"
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary btn-large">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-light">
        <div className="container">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>How can I sponsor an orphan?</h3>
              <p>Visit our Donate page to start a monthly sponsorship. You can choose to sponsor a specific child or contribute to our general sponsorship fund.</p>
            </div>
            <div className="faq-item">
              <h3>Is my donation tax-deductible?</h3>
              <p>Yes! OSP is a registered 501(c)(3) organization. All donations are tax-deductible to the extent allowed by law.</p>
            </div>
            <div className="faq-item">
              <h3>Can I volunteer with OSP?</h3>
              <p>Absolutely! We welcome volunteers for events, administrative support, and program assistance. Contact us to learn about current opportunities.</p>
            </div>
            <div className="faq-item">
              <h3>How do I know my donation is being used properly?</h3>
              <p>We maintain complete transparency. We provide regular updates, financial reports, and impact stories to all our donors.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
