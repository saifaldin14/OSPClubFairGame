import React from 'react'
import { Lightbulb } from 'lucide-react'

function OSPIntroSlide({ swiper }) {
  const handleContinue = () => {
    if (swiper) {
      swiper.slideNext()
    }
  }

  return (
    <div className="slide-container osp-intro-slide">
      <div className="osp-logo">
        <img src="/UWOSP_Logo_White.png" alt="OSP Logo" className="osp-logo-img" />
      </div>
      <h1 className="osp-title">Orphan Sponsorship Program</h1>
      <p className="osp-tagline">Empowering orphans, transforming lives</p>
      
      <div className="osp-mission">
        <h2 className="mission-title">Our Mission</h2>
        <p className="mission-text">
          The Orphan Sponsorship Program (OSP) is dedicated to providing comprehensive support, 
          education, and care to orphaned children around the world. We believe every child 
          deserves a chance to thrive, regardless of their circumstances.
        </p>
      </div>

      <div className="osp-stats">
        <div className="stat-item">
          <div className="stat-number">10,000+</div>
          <div className="stat-label">Children Supported</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">25+</div>
          <div className="stat-label">Countries</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">15</div>
          <div className="stat-label">Years of Service</div>
        </div>
      </div>

      <div className="osp-cta">
        <p className="cta-text">Experience what orphans face every day through an interactive game</p>
        <button 
          className="btn btn-primary btn-large btn-continue"
          onClick={handleContinue}
        >
          Continue →
        </button>
      </div>

   
    </div>
  )
}

export default OSPIntroSlide
