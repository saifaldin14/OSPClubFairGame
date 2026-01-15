import React, { useState, useEffect } from 'react'
import { 
  Sandwich, BookOpen, Pill, HandHeart, Paintbrush, Frown, 
  Book, Stethoscope, Moon, DollarSign, AlertCircle,
  GraduationCap, Thermometer, Star, Heart, HeartCrack,
  Share2, MessageCircle
} from 'lucide-react'

// Icon mapping for choices
const iconMap = {
  food: Sandwich,
  school: BookOpen,
  medicine: Pill,
  beg: HandHeart,
  work: Paintbrush,
  endure: Frown,
  study: Book,
  hospital: Stethoscope,
  sleep: Moon
}

function Game({ isCarousel = false, swiper = null }) {
  const [gameState, setGameState] = useState(isCarousel ? 'choice1' : 'intro') // intro, choice1, choice2, choice3, end
  const [choices, setChoices] = useState([])
  const [progressBar, setProgressBar] = useState(0)
  const [money, setMoney] = useState(2)
  const [consequences, setConsequences] = useState({
    hunger: 0,
    health: 0,
    education: 0,
    stress: 0
  })
  const [selectedOption, setSelectedOption] = useState(null)
  const [showConsequence, setShowConsequence] = useState(false)

  const gameData = {
    choice1: {
      question: "It's 6 AM. You wake up in a cramped room with 4 other children. Your stomach aches from hunger.",
      context: "You're Amira, 10 years old. Your parents passed away 2 years ago.",
      timeLimit: 15,
      options: [
        { 
          id: 'food', 
          text: 'Use your $2 to buy bread for today', 
          impact: 'hunger', 
          consequence: 'You eat, but school costs $1...',
          effects: { hunger: -30, education: 10, stress: 5, money: -2 }
        },
        { 
          id: 'school', 
          text: 'Save money for school fees due tomorrow', 
          impact: 'education', 
          consequence: 'Your stomach growls through the morning...',
          effects: { hunger: 20, education: -20, stress: 15, money: 0 }
        },
        { 
          id: 'medicine', 
          text: 'Buy medicine for your younger brother\'s fever', 
          impact: 'health', 
          consequence: 'He needs you, but you both go hungry...',
          effects: { hunger: 15, health: -25, stress: 10, money: -2 }
        }
      ]
    },
    choice2: {
      question: "It's noon. Other kids are eating lunch. You're dizzy from hunger and your brother is still sick.",
      context: "The teacher is explaining math, but you can't focus. Your vision blurs.",
      timeLimit: 12,
      options: [
        { 
          id: 'beg', 
          text: 'Ask a classmate to share their food', 
          impact: 'dignity', 
          consequence: 'They say yes, but you see the pity in their eyes...',
          effects: { hunger: -20, stress: 25, education: 5, money: 0 }
        },
        { 
          id: 'work', 
          text: 'Leave school to work at the market', 
          impact: 'labor', 
          consequence: 'You earn $3, but miss the lesson you needed...',
          effects: { hunger: -15, education: 30, stress: 20, money: 3 }
        },
        { 
          id: 'endure', 
          text: 'Push through the pain and stay in class', 
          impact: 'suffering', 
          consequence: 'You collapse during recess. The nurse sends you home...',
          effects: { hunger: 25, health: 15, stress: 30, money: 0 }
        }
      ]
    },
    choice3: {
      question: "Evening comes. You're exhausted. Tomorrow's exam determines if you can continue school.",
      context: "Your brother's fever is worse. The landlord is demanding rent. You have $0.50 left.",
      timeLimit: 10,
      options: [
        { 
          id: 'study', 
          text: 'Study by candlelight, ignoring everything else', 
          impact: 'desperation', 
          consequence: 'You pass the exam but your brother cries all night...',
          effects: { education: -30, health: 20, stress: 35, money: 0 }
        },
        { 
          id: 'hospital', 
          text: 'Take your brother to the free clinic', 
          impact: 'sacrifice', 
          consequence: 'You miss the exam. Your future slips away...',
          effects: { education: 40, health: -30, stress: 25, money: 0 }
        },
        { 
          id: 'sleep', 
          text: 'Give up for tonight and just hold your brother', 
          impact: 'hopeless', 
          consequence: 'You both cry yourselves to sleep, wondering if tomorrow will be different...',
          effects: { hunger: 10, health: 10, education: 20, stress: 40, money: 0 }
        }
      ]
    }
  }

  const handleChoice = (choice, stage) => {
    if (selectedOption) return // Prevent double clicks
    
    setSelectedOption(choice)
    setShowConsequence(true)
    
    // Update consequences and money
    setConsequences(prev => ({
      hunger: Math.min(100, Math.max(0, prev.hunger + (choice.effects.hunger || 0))),
      health: Math.min(100, Math.max(0, prev.health + (choice.effects.health || 0))),
      education: Math.min(100, Math.max(0, prev.education + (choice.effects.education || 0))),
      stress: Math.min(100, Math.max(0, prev.stress + (choice.effects.stress || 0)))
    }))
    setMoney(prev => Math.max(0, prev + (choice.effects.money || 0)))

    // Show consequence for 2 seconds before moving on
    setTimeout(() => {
      setChoices([...choices, choice])
      setProgressBar(prev => prev + 33.33)
      setShowConsequence(false)
      setSelectedOption(null)
      
      // Move to next stage
      setTimeout(() => {
        if (stage === 'choice1') {
          setGameState('choice2')
        } else if (stage === 'choice2') {
          setGameState('choice3')
        } else if (stage === 'choice3') {
          setGameState('end')
        }
      }, 300)
    }, 2500)
  }

  const resetGame = () => {
    setGameState(isCarousel ? 'choice1' : 'intro')
    setChoices([])
    setProgressBar(0)
    setMoney(2)
    setConsequences({
      hunger: 0,
      health: 0,
      education: 0,
      stress: 0
    })
    setSelectedOption(null)
    setShowConsequence(false)
    
    // Navigate back to slide 1 (game intro/game slide) in carousel mode and reload
    if (isCarousel && swiper) {
      swiper.slideTo(1)
      // Trigger a page reload to reset the GameSlide component state
      window.location.reload()
    }
  }

  const renderIntro = () => {
    return (
      <div className="game-screen intro-screen">
        <div className="intro-content">
          <h1 className="game-title">Walk in Amira's Shoes</h1>
          <p className="game-subtitle">Experience a day in the life of a 10-year-old orphan</p>
          <button 
            className="btn btn-primary btn-large start-button"
            onClick={() => setGameState('choice1')}
          >
            Begin Amira's Day
          </button>
        </div>
      </div>
    )
  }

  const renderChoice = (stage) => {
    const data = gameData[stage]
    const stageNumber = stage === 'choice1' ? 1 : stage === 'choice2' ? 2 : 3
    const timeOfDay = stage === 'choice1' ? '6:00 AM' : stage === 'choice2' ? '12:00 PM' : '8:00 PM'
    
    return (
      <div className="game-screen choice-screen">
        <div className="progress-bar-container">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${progressBar}%` }}
          />
        </div>
        
        <div className="choice-header">
          <div className="money-tracker"> ${money}</div>
          <div className="time-badge">{timeOfDay}</div>
          <div className="stage-badge">Choice {stageNumber} of 3</div>
        </div>

        {/* Consequence Meters */}
        <div className="consequence-meters">
          <div className="meter">
            <span className="meter-label"><AlertCircle size={14} /> Stress</span>
            <div className="meter-bar">
              <div className="meter-fill stress" style={{ width: `${consequences.stress}%` }}></div>
            </div>
          </div>
          <div className="meter">
            <span className="meter-label"><Frown size={14} /> Hunger</span>
            <div className="meter-bar">
              <div className="meter-fill hunger" style={{ width: `${consequences.hunger}%` }}></div>
            </div>
          </div>
          <div className="meter">
            <span className="meter-label"><GraduationCap size={14} /> Education Loss</span>
            <div className="meter-bar">
              <div className="meter-fill education" style={{ width: `${consequences.education}%` }}></div>
            </div>
          </div>
          <div className="meter">
            <span className="meter-label"><Thermometer size={14} /> Health Issues</span>
            <div className="meter-bar">
              <div className="meter-fill health" style={{ width: `${consequences.health}%` }}></div>
            </div>
          </div>
        </div>
        
        <div className="context-box">
          <p className="context-text">{data.context}</p>
        </div>
        
        <h2 className="choice-question">{data.question}</h2>
        
        {showConsequence && selectedOption && (
          <div className="consequence-popup">
            <div className="consequence-content">
              <div className="consequence-icon">
                {iconMap[selectedOption.id] && React.createElement(iconMap[selectedOption.id], { size: 32, color: 'var(--accent-color)' })}
              </div>
              <p className="consequence-text">{selectedOption.consequence}</p>
            </div>
          </div>
        )}
        
        <div className="choice-grid">
          {data.options.map((option) => {
            const IconComponent = iconMap[option.id]
            return (
              <button
                key={option.id}
                className={`choice-button ${selectedOption?.id === option.id ? 'selected' : ''} ${showConsequence ? 'disabled' : ''}`}
                onClick={() => !showConsequence && handleChoice(option, stage)}
                disabled={showConsequence}
              >
                <span className="choice-icon">
                  {IconComponent && <IconComponent size={24} />}
                </span>
                <div className="choice-content">
                  <span className="choice-text">{option.text}</span>
                  <span className="choice-hint">{option.consequence}</span>
                </div>
              </button>
            )
          })}
        </div>
        
        <div className="choice-instruction">
          {showConsequence ? 'Processing your choice...' : 'Each choice shapes Amira\'s day...'}
        </div>
      </div>
    )
  }

  const renderEnd = () => {
    const totalConsequences = consequences.stress + consequences.hunger + consequences.education + consequences.health
    let endingMessage = ''
    let EndingIcon = Star

    if (totalConsequences <= 150) {
      endingMessage = "Against all odds, Amira found moments of light in her difficult day. She made thoughtful choices that protected her wellbeing as much as possible. But even on her 'best' days, she still faces impossible decisions that no child should have to make."
      EndingIcon = Star
    } else if (totalConsequences <= 250) {
      endingMessage = "Amira's day was filled with difficult compromises. She sacrificed her health for education, or her education for food. Every choice had a cost, and by the end of the day, the weight of these decisions shows in her tired eyes."
      EndingIcon = Frown
    } else {
      endingMessage = "Amira's day was overwhelming. The choices she had to make left her hungry, exhausted, and falling further behind. This is the reality for millions of children—where survival comes at the cost of their future."
      EndingIcon = HeartCrack
    }

    return (
      <div className="game-screen end-screen">
        <div className="end-icon">
          <EndingIcon size={48} color="var(--accent-color)" />
        </div>
        <h2 className="end-title">Amira's Day Ends...</h2>
        <p className="end-message">{endingMessage}</p>

        {/* Consequence Summary */}
        <div className="end-consequences">
          <h3>The Weight of Her Choices:</h3>
          <div className="meter">
            <span className="meter-label"><AlertCircle margin-right={10} size={14} /> Stress: {consequences.stress}%</span>
            <div className="meter-bar">
              <div className="meter-fill stress" style={{ width: `${consequences.stress}%` }}></div>
            </div>
          </div>
          <div className="meter">
            <span className="meter-label"><Frown margin-right={10} size={14} /> Hunger: {consequences.hunger}%</span>
            <div className="meter-bar">
              <div className="meter-fill hunger" style={{ width: `${consequences.hunger}%` }}></div>
            </div>
          </div>
          <div className="meter">
            <span className="meter-label"><GraduationCap margin-right={10} size={14} /> Education Lost: {consequences.education}%</span>
            <div className="meter-bar">
              <div className="meter-fill education" style={{ width: `${consequences.education}%` }}></div>
            </div>
          </div>
          <div className="meter">
            <span className="meter-label"><Thermometer margin-right={10} size={14} /> Health Problems: {consequences.health}%</span>
            <div className="meter-bar">
              <div className="meter-fill health" style={{ width: `${consequences.health}%` }}></div>
            </div>
          </div>
        </div>

        <div className="end-impact">
          <h3>This doesn't have to be Amira's story.</h3>
          <p>With your support, children like Amira get food, education, healthcare, and most importantly—hope. They get to be kids again.</p>
        </div>

        <div className="your-choices">
          <h4>Your journey as Amira:</h4>
          <div className="choices-list">
            {choices.map((choice, index) => {
              const IconComponent = iconMap[choice.id]
              return (
                <div key={index} className="choice-recap">
                  <span className="recap-icon">
                    {IconComponent && <IconComponent size={18} />}
                  </span>
                  <span className="recap-text">{choice.text}</span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="end-actions">
          <button 
            className="share-btn"
            onClick={() => window.open('https://uwosp.ca/donate', '_blank')}
          >
            <Heart size={18} margin-right={20} /> Sponsor a Child Like Amira
          </button>
          <button 
            className="share-btn"
            onClick={resetGame}
          >
            Experience Again
          </button>
        </div>

        <div className="share-section">
          <p className="share-text">This game opened your eyes. Share it to open others':</p>
          <div className="share-buttons">
            <button className="share-btn"><Share2 size={16} /> Share on Social Media</button>
            <button className="share-btn"><MessageCircle size={16} /> Tell Your Friends</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={isCarousel ? "game-page-carousel" : "page game-page"}>
      <div className={isCarousel ? "game-container-carousel" : "game-container"}>
        {!isCarousel && gameState === 'intro' && renderIntro()}
        {gameState === 'choice1' && renderChoice('choice1')}
        {gameState === 'choice2' && renderChoice('choice2')}
        {gameState === 'choice3' && renderChoice('choice3')}
        {gameState === 'end' && renderEnd()}
      </div>
    </div>
  )
}

export default Game
