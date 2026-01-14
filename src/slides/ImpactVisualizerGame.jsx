import React, { useState } from 'react'

function ImpactVisualizerGame({ swiper }) {
  const [donationAmount, setDonationAmount] = useState(100)
  const [showImpact, setShowImpact] = useState(false)

  const impactData = {
    100: {
      children: { count: 2, label: 'Children Sponsored', icon: '👧🏽', color: '#ff6b9d' },
      meals: { count: 180, label: 'Meals Provided', icon: '🍽️', color: '#ffa94d' },
      education: { count: 2, label: 'Months Education', icon: '📚', color: '#74c0fc' },
      healthcare: { count: 1, label: 'Health Checkups', icon: '🏥', color: '#51cf66' },
      supplies: { count: 5, label: 'School Supply Kits', icon: '✏️', color: '#da77f2' },
      clothing: { count: 4, label: 'Clothing Sets', icon: '👕', color: '#ffd43b' }
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
            <span className="intro-emoji">💝</span>
            <h2>See Your Impact</h2>
            <p>Choose a donation amount to see exactly how it helps children in need</p>
          </div>

          <div className="donation-buttons">
            {[50, 100, 200, 500].map(amount => (
              <button
                key={amount}
                className={`donation-amount-btn ${amount === 100 ? 'featured' : ''}`}
                onClick={() => handleVisualize(amount)}
              >
                {amount === 100 && <span className="featured-tag">Most Popular</span>}
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
            ← Back
          </button>
          <h2>Your ${donationAmount} Creates Real Change</h2>
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
              <div className="card-icon">{item.icon}</div>
              <div className="card-count" style={{ color: item.color }}>{item.count}</div>
              <div className="card-label">{item.label}</div>
            </div>
          ))}
        </div>

        <div className="impact-story">
          <h3>What This Means</h3>
          <p>
            With <strong>${donationAmount}</strong>, you provide {impact[0].count} {impact[0].count === 1 ? 'child' : 'children'} with 
            <strong> {impact[1].count} meals</strong>, <strong>{impact[2].count} months of education</strong>, 
            and essential supplies they need to thrive.
          </p>
        </div>

        <div className="impact-cta">
          <button 
            className="donate-now-btn"
            onClick={() => window.open('https://uwosp.ca/donate', '_blank')}
          >
            💝 Donate ${donationAmount} Now
          </button>
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
