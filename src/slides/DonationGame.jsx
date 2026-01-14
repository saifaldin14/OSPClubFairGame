import React, { useState, useEffect } from 'react'
import { 
  HandHeart, BookOpen, Apple, Shirt, Hospital, Pencil, Droplet, GraduationCap, 
  Salad, MousePointerClick, Heart, Clock, Rocket, PartyPopper, Star, Sparkles
} from 'lucide-react'

// Icon mapping for children needs
const needIconMap = {
  "📚": BookOpen,
  "🍎": Apple,
  "🧥": Shirt,
  "🏥": Hospital,
  "✏️": Pencil,
  "💧": Droplet,
  "🎓": GraduationCap,
  "🥗": Salad
}

function DonationGame({ swiper }) {
  const [gameState, setGameState] = useState('intro') // intro, playing, results
  const [donations, setDonations] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [clickPosition, setClickPosition] = useState(null)
  const [hearts, setHearts] = useState([])
  const [childrenHelped, setChildrenHelped] = useState([])
  const [score, setScore] = useState(0)

  const children = [
    { name: "Sarah", country: "Syria", need: "School supplies", emoji: "📚", color: "#4a90e2" },
    { name: "Ahmed", country: "Yemen", need: "Food & water", emoji: "🍎", color: "#e24a4a" },
    { name: "Fatima", country: "Palestine", need: "Winter clothes", emoji: "🧥", color: "#e2a24a" },
    { name: "Omar", country: "Somalia", need: "Medical care", emoji: "🏥", color: "#4ae2a2" },
    { name: "Aisha", country: "Afghanistan", need: "Education", emoji: "✏️", color: "#a24ae2" },
    { name: "Yusuf", country: "Bangladesh", need: "Clean water", emoji: "💧", color: "#4ac7e2" },
    { name: "Zahra", country: "Iraq", need: "School fees", emoji: "🎓", color: "#e24a90" },
    { name: "Ibrahim", country: "Sudan", need: "Nutrition", emoji: "🥗", color: "#90e24a" }
  ]

  useEffect(() => {
    let timer
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1)
      }, 1000)
    } else if (timeLeft === 0 && gameState === 'playing') {
      setGameState('results')
    }
    return () => clearInterval(timer)
  }, [gameState, timeLeft])

  useEffect(() => {
    if (clickPosition) {
      const timeout = setTimeout(() => setClickPosition(null), 800)
      return () => clearTimeout(timeout)
    }
  }, [clickPosition])

  const handleDonate = (e) => {
    if (gameState !== 'playing') return

    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setClickPosition({ x, y })
    setDonations(prev => prev + 1)
    setScore(prev => prev + 10)

    // Add floating heart animation
    const heartId = Date.now()
    setHearts(prev => [...prev, { id: heartId, x, y }])
    setTimeout(() => {
      setHearts(prev => prev.filter(h => h.id !== heartId))
    }, 1000)

    // Every 5 donations helps a child
    if ((donations + 1) % 5 === 0) {
      const childIndex = Math.floor(donations / 5) % children.length
      setChildrenHelped(prev => [...prev, children[childIndex]])
    }
  }

  const handleStart = () => {
    setGameState('playing')
    setDonations(0)
    setTimeLeft(30)
    setChildrenHelped([])
    setScore(0)
    setHearts([])
  }

  const handleReset = () => {
    setGameState('intro')
    setDonations(0)
    setTimeLeft(30)
    setChildrenHelped([])
    setScore(0)
    setHearts([])
  }

  if (gameState === 'intro') {
    return (
      <div className="slide-container donation-game-slide">
        <div className="donation-game-intro">
          <div className="game-icon"><HandHeart size={48} color="var(--accent-color)" /></div>
          <h2 className="game-title-main">The Giving Challenge</h2>
          <p className="game-description">
            Tap as fast as you can for 30 seconds to make donations!
          </p>
          <div className="game-rules">
            <div className="rule-item">
              <span className="rule-icon"><MousePointerClick size={24} /></span>
              <p>Each tap = $10 donation</p>
            </div>
            <div className="rule-item">
              <span className="rule-icon"><Heart size={24} /></span>
              <p>Every 5 donations helps a child</p>
            </div>
            <div className="rule-item">
              <span className="rule-icon"><Clock size={24} /></span>
              <p>You have 30 seconds</p>
            </div>
          </div>
          <div className="mission-snippet">
            <p>
              <strong>OSP at University of Waterloo</strong> sponsors orphans worldwide through registered charities, 
              providing nutrition, healthcare, and education to break the cycle of poverty.
            </p>
          </div>
          <button className="btn btn-primary btn-large" onClick={handleStart}>
            Start Challenge <Rocket size={18} />
          </button>
        </div>
      </div>
    )
  }

  if (gameState === 'results') {
    const totalDonated = donations * 10
    const childrenCount = Math.floor(donations / 5)

    return (
      <div className="slide-container donation-game-slide">
        <div className="donation-game-results">
          <h2 className="results-title">Your Impact! <PartyPopper size={24} /></h2>
          
          <div className="stats-grid">
            <div className="stat-box">
              <div className="stat-number">${totalDonated}</div>
              <div className="stat-label">Total Donated</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">{donations}</div>
              <div className="stat-label">Taps Made</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">{childrenCount}</div>
              <div className="stat-label">Children Helped</div>
            </div>
          </div>

          {childrenHelped.length > 0 && (
            <div className="helped-children">
              <h3>You Made a Difference For:</h3>
              <div className="children-grid">
                {childrenHelped.map((child, index) => {
                  const ChildIcon = needIconMap[child.emoji] || Heart
                  return (
                    <div key={index} className="helped-child-card" style={{ borderColor: child.color }}>
                      <div className="child-icon"><ChildIcon size={24} color={child.color} /></div>
                      <div className="child-name">{child.name}</div>
                      <div className="child-country">{child.country}</div>
                      <div className="child-need">{child.need}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          <div className="impact-message">
            <p className="message-text">
              {totalDonated >= 200 ? (
                <><Sparkles size={16} /> Amazing! Your generosity can provide months of support for these children!</>
              ) : totalDonated >= 100 ? (
                <><Star size={16} /> Great work! You've made a real difference in children's lives!</>
              ) : totalDonated >= 50 ? (
                <><Sparkles size={16} /> Good effort! Every donation helps break the cycle of poverty!</>
              ) : (
                <><Heart size={16} /> Thank you! Even small donations make a big impact!</>
              )}
            </p>
          </div>

          <div className="osp-info">
            <h3>About OSP</h3>
            <p>
              The Orphan Sponsorship Program at University of Waterloo provides financial support 
              for orphans' needs and well-being worldwide. Through registered charities like 
              Human Concern International and Islamic Relief, we sponsor children orphaned by war, 
              poverty, or disease—helping them reach their goals through access to nutrition, 
              healthcare, and quality education.
            </p>
          </div>

          <div className="results-actions">
            <button className="btn btn-secondary" onClick={handleReset}>
              Play Again
            </button>
            <button 
              className="btn btn-primary"
              onClick={() => window.open('https://uwaterloo.ca/orphan-sponsorship-program/', '_blank')}
            >
              Support OSP
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="slide-container donation-game-slide">
      <div className="donation-game-playing">
        <div className="game-header-bar">
          <div className="timer-display">
            <span className="timer-icon"><Clock size={16} /></span>
            <span className="timer-text">{timeLeft}s</span>
          </div>
          <div className="score-display">
            <span className="score-label">Donations:</span>
            <span className="score-number">{donations}</span>
          </div>
        </div>

        <div className="donation-button-container">
          <button 
            className="donation-button"
            onClick={handleDonate}
            onTouchStart={handleDonate}
          >
            <div className="button-content">
              <div className="button-icon"><HandHeart size={48} /></div>
              <div className="button-text">TAP TO DONATE!</div>
              <div className="button-amount">$10 per tap</div>
            </div>
            
            {clickPosition && (
              <div 
                className="click-ripple"
                style={{ left: clickPosition.x, top: clickPosition.y }}
              />
            )}

            {hearts.map(heart => (
              <div
                key={heart.id}
                className="floating-heart"
                style={{ left: heart.x, top: heart.y }}
              >
                <Heart size={20} fill="currentColor" />
              </div>
            ))}
          </button>
        </div>

        <div className="progress-tracker">
          <div className="progress-label">
            Next child at {Math.ceil(donations / 5) * 5} donations
          </div>
          <div className="progress-bar-wrapper">
            <div 
              className="progress-bar-inner"
              style={{ width: `${(donations % 5) * 20}%` }}
            />
          </div>
        </div>

        {childrenHelped.length > 0 && (
          <div className="recent-help">
            <div className="help-notification">
              <PartyPopper size={16} /> You just helped {childrenHelped[childrenHelped.length - 1].name} from {childrenHelped[childrenHelped.length - 1].country}!
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DonationGame
