import React, { useState, useEffect } from 'react'

function OrphanageSimGame({ swiper }) {
  const [gameState, setGameState] = useState('intro') // intro, playing, event, results
  const [month, setMonth] = useState(1)
  const [resources, setResources] = useState({
    funds: 1000,
    food: 50,
    education: 50,
    health: 50,
    happiness: 50
  })
  const [children, setChildren] = useState([
    { id: 1, name: "Sarah", age: 9, country: "Syria", needs: ["education"], emoji: "👧🏽", satisfied: true },
    { id: 2, name: "Ahmed", age: 12, country: "Yemen", needs: ["food"], emoji: "👦🏽", satisfied: true },
    { id: 3, name: "Fatima", age: 7, country: "Palestine", needs: ["health"], emoji: "👧🏾", satisfied: true },
    { id: 4, name: "Omar", age: 14, country: "Somalia", needs: ["education"], emoji: "👦🏿", satisfied: true },
  ])
  const [currentEvent, setCurrentEvent] = useState(null)
  const [decisions, setDecisions] = useState([])
  const [gameLog, setGameLog] = useState([])
  const [showNotification, setShowNotification] = useState(null)

  const events = [
    {
      id: 1,
      title: "Winter Is Coming",
      description: "A harsh winter approaches. Children need warm clothes and heating.",
      icon: "❄️",
      choices: [
        {
          text: "Buy winter supplies (-$300)",
          effects: { funds: -300, happiness: 20, health: 15 },
          outcome: "Children stay warm and healthy through winter."
        },
        {
          text: "Make do with what we have",
          effects: { health: -20, happiness: -10 },
          outcome: "Some children get sick from the cold."
        },
        {
          text: "Ask for community donations",
          effects: { funds: 100, happiness: 10 },
          outcome: "Community rallies with some support."
        }
      ]
    },
    {
      id: 2,
      title: "Medical Emergency",
      description: "One of the children needs urgent medical attention.",
      icon: "🏥",
      choices: [
        {
          text: "Take to hospital immediately (-$400)",
          effects: { funds: -400, health: 25, happiness: 10 },
          outcome: "Quick treatment prevents serious complications."
        },
        {
          text: "Use basic first aid",
          effects: { health: -15, happiness: -15 },
          outcome: "Condition worsens without proper care."
        },
        {
          text: "Seek free clinic (time lost)",
          effects: { health: 5, education: -10 },
          outcome: "Treatment received but missed school days."
        }
      ]
    },
    {
      id: 3,
      title: "Education Opportunity",
      description: "A scholarship program offers free tutoring for gifted students.",
      icon: "📚",
      choices: [
        {
          text: "Enroll all children",
          effects: { education: 30, happiness: 20, funds: -100 },
          outcome: "Children excel academically and gain confidence."
        },
        {
          text: "Enroll only top performers",
          effects: { education: 15, happiness: -5 },
          outcome: "Some children feel left behind."
        },
        {
          text: "Decline - focus on basics",
          effects: { funds: 50 },
          outcome: "Saved money but missed opportunity."
        }
      ]
    },
    {
      id: 4,
      title: "Food Shortage",
      description: "Supply chain issues have made food prices skyrocket.",
      icon: "🍎",
      choices: [
        {
          text: "Buy at high prices (-$350)",
          effects: { funds: -350, food: 30, happiness: 10 },
          outcome: "Children well-fed despite the cost."
        },
        {
          text: "Ration current supplies",
          effects: { food: -25, happiness: -20, health: -10 },
          outcome: "Hunger affects health and morale."
        },
        {
          text: "Start community garden",
          effects: { funds: -150, food: 20, happiness: 15, education: 5 },
          outcome: "Long-term solution that teaches responsibility."
        }
      ]
    },
    {
      id: 5,
      title: "New Arrivals",
      description: "Three more orphaned children need shelter.",
      icon: "👶",
      choices: [
        {
          text: "Welcome them all (-$500)",
          effects: { funds: -500, happiness: 25, food: -15, education: -10 },
          outcome: "More children to care for, resources stretched."
        },
        {
          text: "Accept only two",
          effects: { funds: -300, happiness: -10 },
          outcome: "Guilt over turning away a child in need."
        },
        {
          text: "Refer to another facility",
          effects: { funds: 0 },
          outcome: "Practical but heartbreaking decision."
        }
      ]
    },
    {
      id: 6,
      title: "Donor Visit",
      description: "A potential major donor wants to visit the orphanage.",
      icon: "💼",
      choices: [
        {
          text: "Prepare impressive presentation (-$200)",
          effects: { funds: 600, happiness: 10 },
          outcome: "Donor impressed, commits to ongoing support!"
        },
        {
          text: "Show honest reality",
          effects: { funds: 300, education: 10 },
          outcome: "Donor appreciates transparency, modest donation."
        },
        {
          text: "Decline visit - too busy",
          effects: { happiness: 5 },
          outcome: "Missed funding opportunity."
        }
      ]
    },
    {
      id: 7,
      title: "Health Inspection",
      description: "Government health inspectors are coming tomorrow.",
      icon: "🔍",
      choices: [
        {
          text: "Deep clean and upgrade (-$300)",
          effects: { funds: -300, health: 20, happiness: 15 },
          outcome: "Pass with flying colors, receive grant."
        },
        {
          text: "Basic preparations (-$100)",
          effects: { funds: -100, health: 5 },
          outcome: "Barely pass, warned to improve."
        },
        {
          text: "Hope for the best",
          effects: { health: -20, happiness: -15 },
          outcome: "Violations noted, at risk of closure."
        }
      ]
    },
    {
      id: 8,
      title: "Holiday Season",
      description: "Children hope for gifts and celebrations.",
      icon: "🎁",
      choices: [
        {
          text: "Organize big celebration (-$400)",
          effects: { funds: -400, happiness: 30 },
          outcome: "Unforgettable memories created."
        },
        {
          text: "Simple gathering (-$150)",
          effects: { funds: -150, happiness: 15 },
          outcome: "Modest but meaningful celebration."
        },
        {
          text: "Skip celebrations",
          effects: { happiness: -25, health: -5 },
          outcome: "Children heartbroken and withdrawn."
        }
      ]
    }
  ]

  useEffect(() => {
    if (gameState === 'playing' && month <= 12) {
      // Check resource levels
      checkResourceLevels()
    }
  }, [resources])

  const checkResourceLevels = () => {
    const warnings = []
    if (resources.funds < 200) warnings.push("💰 Funds critically low!")
    if (resources.food < 20) warnings.push("🍎 Food shortage!")
    if (resources.health < 30) warnings.push("🏥 Health declining!")
    if (resources.education < 30) warnings.push("📚 Education suffering!")
    if (resources.happiness < 30) warnings.push("😢 Children unhappy!")
    
    if (warnings.length > 0 && !showNotification) {
      setShowNotification(warnings[0])
      setTimeout(() => setShowNotification(null), 3000)
    }
  }

  const startGame = () => {
    setGameState('playing')
    setMonth(1)
    setResources({ funds: 1000, food: 50, education: 50, health: 50, happiness: 50 })
    setDecisions([])
    setGameLog([])
    triggerEvent()
  }

  const triggerEvent = () => {
    const randomEvent = events[Math.floor(Math.random() * events.length)]
    setCurrentEvent(randomEvent)
    setGameState('event')
  }

  const makeDecision = (choice) => {
    const newResources = { ...resources }
    Object.keys(choice.effects).forEach(key => {
      newResources[key] = Math.max(0, Math.min(100, newResources[key] + choice.effects[key]))
    })
    
    setResources(newResources)
    setDecisions([...decisions, { month, event: currentEvent.title, choice: choice.text }])
    setGameLog([...gameLog, `Month ${month}: ${currentEvent.title} - ${choice.outcome}`])
    
    if (month >= 12 || newResources.funds <= 0) {
      setGameState('results')
    } else {
      setMonth(month + 1)
      setGameState('playing')
      setTimeout(() => triggerEvent(), 2000)
    }
  }

  const calculateScore = () => {
    const total = resources.food + resources.education + resources.health + resources.happiness
    const funded = resources.funds > 0 ? 1 : 0
    return Math.floor(total / 4) + (funded * 20)
  }

  if (gameState === 'intro') {
    return (
      <div className="slide-container orphanage-sim-slide">
        <div className="sim-intro">
          <div className="sim-icon">🏠</div>
          <h2 className="sim-title">Orphanage Manager Simulation</h2>
          <p className="sim-description">
            You run an orphanage caring for vulnerable children. Make tough decisions over 12 months 
            to balance funds, food, education, health, and happiness.
          </p>
          
          <div className="sim-features">
            <div className="feature-item">
              <span className="feature-emoji">💰</span>
              <p>Manage Limited Budget</p>
            </div>
            <div className="feature-item">
              <span className="feature-emoji">⚖️</span>
              <p>Balance Multiple Needs</p>
            </div>
            <div className="feature-item">
              <span className="feature-emoji">📊</span>
              <p>Face Real Challenges</p>
            </div>
            <div className="feature-item">
              <span className="feature-emoji">🎯</span>
              <p>Make Impactful Decisions</p>
            </div>
          </div>

          <div className="starting-resources">
            <h3>Starting Resources:</h3>
            <div className="resource-preview">
              <span>💰 Funds: $1,000</span>
              <span>🍎 Food: 50%</span>
              <span>📚 Education: 50%</span>
              <span>🏥 Health: 50%</span>
              <span>😊 Happiness: 50%</span>
            </div>
          </div>

          <div className="osp-context">
            <p>
              <strong>This is what OSP does every day.</strong> At University of Waterloo, 
              the Orphan Sponsorship Program works with charities to provide real support 
              for orphaned children worldwide - balancing nutrition, healthcare, and education 
              to break the cycle of poverty.
            </p>
          </div>

          <button className="btn btn-primary btn-large" onClick={startGame}>
            Start Managing 🚀
          </button>
        </div>
      </div>
    )
  }

  if (gameState === 'event') {
    return (
      <div className="slide-container orphanage-sim-slide">
        <div className="sim-event">
          <div className="event-header">
            <div className="month-badge">Month {month}/12</div>
            <div className="funds-display">${resources.funds}</div>
          </div>

          <div className="event-card">
            <div className="event-icon">{currentEvent.icon}</div>
            <h3 className="event-title">{currentEvent.title}</h3>
            <p className="event-description">{currentEvent.description}</p>
          </div>

          <div className="event-choices">
            {currentEvent.choices.map((choice, index) => (
              <button
                key={index}
                className="choice-card"
                onClick={() => makeDecision(choice)}
              >
                <div className="choice-text">{choice.text}</div>
                <div className="choice-effects">
                  {Object.entries(choice.effects).map(([key, value]) => (
                    <span 
                      key={key} 
                      className={`effect-badge ${value > 0 ? 'positive' : 'negative'}`}
                    >
                      {value > 0 ? '+' : ''}{value} {key}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>

          <div className="current-resources">
            <div className="resource-bar">
              <span className="resource-label">🍎 Food</span>
              <div className="bar-container">
                <div className="bar-fill" style={{ width: `${resources.food}%`, backgroundColor: '#e24a4a' }}></div>
              </div>
              <span className="resource-value">{resources.food}%</span>
            </div>
            <div className="resource-bar">
              <span className="resource-label">📚 Education</span>
              <div className="bar-container">
                <div className="bar-fill" style={{ width: `${resources.education}%`, backgroundColor: '#4a90e2' }}></div>
              </div>
              <span className="resource-value">{resources.education}%</span>
            </div>
            <div className="resource-bar">
              <span className="resource-label">🏥 Health</span>
              <div className="bar-container">
                <div className="bar-fill" style={{ width: `${resources.health}%`, backgroundColor: '#4ae2a2' }}></div>
              </div>
              <span className="resource-value">{resources.health}%</span>
            </div>
            <div className="resource-bar">
              <span className="resource-label">😊 Happiness</span>
              <div className="bar-container">
                <div className="bar-fill" style={{ width: `${resources.happiness}%`, backgroundColor: '#e2a24a' }}></div>
              </div>
              <span className="resource-value">{resources.happiness}%</span>
            </div>
          </div>

          {showNotification && (
            <div className="warning-notification">
              {showNotification}
            </div>
          )}
        </div>
      </div>
    )
  }

  if (gameState === 'results') {
    const score = calculateScore()
    const survived = resources.funds > 0
    const rating = score >= 80 ? "Exceptional! 🌟" : score >= 60 ? "Great Job! 👏" : score >= 40 ? "Good Effort 💪" : "Struggling 😔"

    return (
      <div className="slide-container orphanage-sim-slide">
        <div className="sim-results">
          <h2 className="results-header">Your Impact Report</h2>
          
          <div className="final-score">
            <div className="score-number">{score}</div>
            <div className="score-rating">{rating}</div>
            <div className="score-status">{survived ? "✅ Orphanage Sustained" : "❌ Ran Out of Funds"}</div>
          </div>

          <div className="final-resources">
            <h3>Final Status (Month {month}/12):</h3>
            <div className="resources-grid">
              <div className="resource-final">
                <div className="resource-icon">💰</div>
                <div className="resource-info">
                  <span className="resource-name">Funds</span>
                  <span className="resource-final-value">${resources.funds}</span>
                </div>
              </div>
              <div className="resource-final">
                <div className="resource-icon">🍎</div>
                <div className="resource-info">
                  <span className="resource-name">Food</span>
                  <span className="resource-final-value">{resources.food}%</span>
                </div>
              </div>
              <div className="resource-final">
                <div className="resource-icon">📚</div>
                <div className="resource-info">
                  <span className="resource-name">Education</span>
                  <span className="resource-final-value">{resources.education}%</span>
                </div>
              </div>
              <div className="resource-final">
                <div className="resource-icon">🏥</div>
                <div className="resource-info">
                  <span className="resource-name">Health</span>
                  <span className="resource-final-value">{resources.health}%</span>
                </div>
              </div>
              <div className="resource-final">
                <div className="resource-icon">😊</div>
                <div className="resource-info">
                  <span className="resource-name">Happiness</span>
                  <span className="resource-final-value">{resources.happiness}%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="decision-log">
            <h3>Your Journey:</h3>
            <div className="log-entries">
              {gameLog.map((entry, index) => (
                <div key={index} className="log-entry">{entry}</div>
              ))}
            </div>
          </div>

          <div className="reality-check">
            <h3>The Reality</h3>
            <p>
              This simulation only scratches the surface of what organizations like OSP face daily. 
              Real orphanages deal with these challenges continuously, often with fewer resources 
              and more children.
            </p>
            <p>
              The Orphan Sponsorship Program at University of Waterloo partners with registered 
              charities to provide consistent support - ensuring children have access to nutrition, 
              healthcare, and education to build better futures.
            </p>
          </div>

          <div className="results-actions">
            <button className="btn btn-secondary" onClick={startGame}>
              Play Again
            </button>
            <button 
              className="btn btn-primary"
              onClick={() => window.open('https://uwaterloo.ca/orphan-sponsorship-program/', '_blank')}
            >
              Support Real Orphans
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="slide-container orphanage-sim-slide">
      <div className="sim-loading">
        <div className="loading-spinner">⏳</div>
        <p>Preparing next challenge...</p>
      </div>
    </div>
  )
}

export default OrphanageSimGame
