import React, { useState } from 'react'
import { Heart, Users, Utensils, BookOpen, Stethoscope, Pencil, Shirt, ArrowLeft } from 'lucide-react'

function ImpactVisualizerGame({ swiper }) {
  const [donationAmount, setDonationAmount] = useState(100)
  const [showImpact, setShowImpact] = useState(false)

  const impactData = {
    100: {
      children: { count: 2, label: 'Children Sponsored', Icon: Users, color: '#e8927c' },
      meals: { count: 180, label: 'Meals Provided', Icon: Utensils, color: '#88b3e6' },
      education: { count: 2, label: 'Months Education', Icon: BookOpen, color: '#4a6fa5' },
      healthcare: { count: 1, label: 'Health Checkups', Icon: Stethoscope, color: '#6dd5a0' },
      supplies: { count: 5, label: 'School Supply Kits', Icon: Pencil, color: '#a8d4f0' },
      clothing: { count: 4, label: 'Clothing Sets', Icon: Shirt, color: '#e8927c' }
    }
  }

  const calculateImpact = (amount) => {
    const multiplier = amount / 100
    const base = impactData[100]
    return Object.keys(base).map(key => ({
      ...base[key],
      count: Math.max(1, Math.floor(base[key].count * multiplier))
    }))
  }

  const handleVisualize = (amount) => {
    setDonationAmount(amount)
    setShowImpact(true)
  }

  const impact = calculateImpact(donationAmount)

  if (!showImpact) {
    return (
      <div className="slide-container impact-visualizer-slide">
        <div className="impact-intro-content">
          <div className="intro-header">
            <span className="intro-icon"><Heart size={48} color="var(--accent-warm)" /></span>
            <h2 style={{ color: 'var(--accent-color)' }}>See Your Impact</h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Choose a donation amount to see exactly how it helps children in need</p>
          </div>

          <div className="donation-buttons">
            {[50, 100, 200, 500].map(amount => (
              <button
                key={amount}
                className={`donation-amount-btn`}
                onClick={() => handleVisualize(amount)}
              >
                <span className="btn-amount">${amount}</span>
                <span className="btn-impact">{Math.max(1, Math.floor(amount / 50))} child{amount >= 100 ? 'ren' : ''}/month</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="slide-container impact-visualizer-slide">
      <div className="impact-results-content">
        <div className="results-header">
          <button className="back-btn" onClick={() => setShowImpact(false)}>
            <ArrowLeft size={16} /> Back
          </button>
          <h2 style={{ color: 'var(--accent-color)' }}>Your ${donationAmount} Creates Real Change</h2>
        </div>

        <div className="impact-cards-grid">
          {impact.map((item, index) => (
            <div 
              key={index} 
              className="impact-card"
              style={{ 
                borderColor: item.color,
                animationDelay: `${index * 0.1}s`
              }}
            >
              <div className="card-icon">
                {item.Icon && <item.Icon size={28} color={item.color} />}
              </div>
              <div className="card-count" style={{ color: item.color }}>{item.count}</div>
              <div className="card-label">{item.label}</div>
            </div>
          ))}
        </div>

        <div className="impact-story">
          <h3 style={{ color: 'var(--accent-color)' }}>What This Means</h3>
          <p style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
            With <strong style={{ color: 'var(--accent-color)' }}>${donationAmount}</strong>, you provide {impact[0].count} {impact[0].count === 1 ? 'child' : 'children'} with 
            <strong style={{ color: 'var(--accent-color)' }}> {impact[1].count} meals</strong>, <strong style={{ color: 'var(--accent-color)' }}>{impact[2].count} months of education</strong>, 
            and essential supplies they need to thrive.
          </p>
        </div>

        <div className="impact-cta">
          <button 
            className="try-another-btn"
            onClick={() => setShowImpact(false)}
          >
            Try Different Amount
          </button>
        </div>
      </div>
    </div>
  )
}

export default ImpactVisualizerGame
