import React, { useState, useEffect } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { 
  Heart, Users, Mail, Instagram, Linkedin, 
  ExternalLink, Sparkles, HandHeart, Globe
} from 'lucide-react'

function GetInvolvedSlide({ swiper }) {
  const [isVisible, setIsVisible] = useState(false)
  const [qrAnimated, setQrAnimated] = useState(false)

  useEffect(() => {
    // Trigger animations when slide becomes visible
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 300)

    const qrTimer = setTimeout(() => {
      setQrAnimated(true)
    }, 800)

    return () => {
      clearTimeout(timer)
      clearTimeout(qrTimer)
    }
  }, [])

  const linktreeUrl = 'https://linktr.ee/uwosp'

  const involvementOptions = [
    {
      icon: Heart,
      title: 'Donate',
      description: 'Support orphaned children with your contribution',
      color: '#e8927c'
    },
    {
      icon: Users,
      title: 'Join Our Team',
      description: 'Become a volunteer and make a difference',
      color: '#88b3e6'
    },
    {
      icon: Mail,
      title: 'Stay Connected',
      description: 'Subscribe to our newsletter for updates',
      color: '#4ae2a2'
    }
  ]

  return (
    <div className="slide-container get-involved-slide">
      <div className={`get-involved-content ${isVisible ? 'visible' : ''}`}>
        
        {/* Header */}
        <div className="get-involved-header">
          <div className="header-icon">
            <HandHeart size={48} color="var(--accent-color)" />
          </div>
          <h1 className="get-involved-title">Get Involved</h1>
          <p className="get-involved-subtitle">
            Join us in making a difference in the lives of orphaned children
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="get-involved-grid">
          
          {/* Left Side - Ways to Help */}
          <div className="involvement-options">
            <h3 className="section-title">
              <Sparkles size={20} /> Ways to Help
            </h3>
            <div className="options-list">
              {involvementOptions.map((option, index) => (
                <div 
                  key={index} 
                  className={`option-card ${isVisible ? 'animate' : ''}`}
                  style={{ animationDelay: `${0.2 + index * 0.15}s` }}
                >
                  <div className="option-icon" style={{ backgroundColor: 'rgba(26, 40, 68, 0.8)', border: `2px solid ${option.color}` }}>
                    <option.icon size={24} color={option.color} />
                  </div>
                  <div className="option-info">
                    <h4>{option.title}</h4>
                    <p>{option.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - QR Code */}
          <div className="qr-section">
            <h3 className="section-title">
              <Globe size={20} /> Scan to Connect
            </h3>
            <div className={`qr-container ${qrAnimated ? 'animated' : ''}`}>
              <div className="qr-glow"></div>
              <div className="qr-wrapper">
                <QRCodeSVG 
                  value={linktreeUrl}
                  size={180}
                  level="H"
                  includeMargin={true}
                  bgColor="transparent"
                  fgColor="white"
                />
              </div>
              <div className="qr-label">
                <ExternalLink size={14} />
                <span>linktr.ee/uwosp</span>
              </div>
            </div>
            <p className="qr-instruction">
              Scan with your phone camera to access all our links
            </p>
          </div>
        </div>

        {/* Social Links */}
        <div className="social-section">
          <h3 className="social-title">Follow Us</h3>
          <div className="social-links">
            <a 
              href="https://www.instagram.com/uw_osp/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link instagram"
            >
              <Instagram size={24} />
              <span>Instagram</span>
            </a>
            <a 
              href="https://www.linkedin.com/company/uwosp/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link linkedin"
            >
              <Linkedin size={24} />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

        {/* CTA Button */}
        <div className="final-cta">
          <button 
            className="btn btn-primary btn-large cta-button"
            onClick={() => window.open(linktreeUrl, '_blank')}
          >
            <Heart size={20} />
            Visit Our Linktree
            <ExternalLink size={16} />
          </button>
        </div>

        {/* Footer Message */}
        <div className="thank-you-message">
          <p>Thank you for playing and learning about our cause! 💙</p>
          <p className="osp-tagline">UW Orphan Sponsorship Program</p>
        </div>
      </div>
    </div>
  )
}

export default GetInvolvedSlide
