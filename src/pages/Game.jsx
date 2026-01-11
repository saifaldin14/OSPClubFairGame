import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Game() {
  const [gameState, setGameState] = useState('intro') // intro, choice1, choice2, choice3, end
  const [choices, setChoices] = useState([])
  const [progressBar, setProgressBar] = useState(0)
  const [timer, setTimer] = useState(null)

  const gameData = {
    choice1: {
      question: "You're 10 years old. You have $2 today.",
      options: [
        { id: 'food', emoji: '🍞', text: 'Buy food', impact: 'hunger' },
        { id: 'school', emoji: '📚', text: 'Go to school', impact: 'education' },
        { id: 'medicine', emoji: '💊', text: 'Save for medicine', impact: 'health' }
      ]
    },
    choice2: {
      question: "Tomorrow arrives. You're tired and hungry.",
      options: [
        { id: 'walk', emoji: '🚶', text: 'Walk to school\n(skip food)', impact: 'weak' },
        { id: 'work', emoji: '🧹', text: 'Work for money\n(miss class)', impact: 'labor' },
        { id: 'ignore', emoji: '😷', text: 'Ignore illness', impact: 'sick' }
      ]
    },
    choice3: {
      question: "It's getting harder. What now?",
      options: [
        { id: 'rest', emoji: '🛌', text: 'Rest', impact: 'behind' },
        { id: 'study', emoji: '📖', text: 'Study', impact: 'exhausted' },
        { id: 'work-again', emoji: '💼', text: 'Work again', impact: 'sacrifice' }
      ]
    }
  }

  const getEndMessage = () => {
    const impacts = choices.map(c => c.impact)
    
    // Analyze the choices
    if (impacts.includes('education') && impacts.includes('study')) {
      return {
        title: "You chose education.",
        message: "But you went hungry. You fell behind in class from exhaustion. Tomorrow, you'll face the same impossible choices.",
        reality: "This is the reality for millions of orphans every day."
      }
    } else if (impacts.includes('labor') && impacts.includes('sacrifice')) {
      return {
        title: "You chose survival.",
        message: "You worked to eat. But you missed school again. Your dreams feel further away. The cycle continues.",
        reality: "No child should have to choose between food and education."
      }
    } else if (impacts.includes('health')) {
      return {
        title: "You tried to prepare.",
        message: "But you couldn't afford both medicine AND food. Tomorrow, you'll be weaker. The choices get harder.",
        reality: "Healthcare shouldn't be a luxury for any child."
      }
    } else {
      return {
        title: "Every choice had a cost.",
        message: "There were no good options. Only impossible decisions that no child should have to make alone.",
        reality: "This is their daily reality."
      }
    }
  }

  const handleChoice = (choice, stage) => {
    setChoices([...choices, choice])
    setProgressBar(prev => prev + 33.33)

    // Move to next stage
    setTimeout(() => {
      if (stage === 'choice1') {
        setGameState('choice2')
      } else if (stage === 'choice2') {
        setGameState('choice3')
      } else if (stage === 'choice3') {
        setGameState('end')
      }
    }, 600)
  }

  const resetGame = () => {
    setGameState('intro')
    setChoices([])
    setProgressBar(0)
  }

  useEffect(() => {
    // Auto-advance intro after 3 seconds
    if (gameState === 'intro') {
      const timeout = setTimeout(() => {
        // Don't auto-advance, let user click
      }, 3000)
      return () => clearTimeout(timeout)
    }
  }, [gameState])

  const renderIntro = () => (
    <div className="game-screen intro-screen">
      <div className="game-illustration">👦</div>
      <h1 className="game-title">3 Choices</h1>
      <p className="game-subtitle">A 15-second glimpse into an orphan's daily life</p>
      <div className="intro-text">
        <p className="intro-main">You're 10 years old.</p>
        <p className="intro-main">You have $2 today.</p>
        <p className="intro-emphasis">Choose wisely.</p>
      </div>
      <button 
        className="btn btn-primary btn-game-start"
        onClick={() => setGameState('choice1')}
      >
        START
      </button>
    </div>
  )

  const renderChoice = (stage) => {
    const data = gameData[stage]
    return (
      <div className="game-screen choice-screen">
        <div className="progress-bar-container">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${progressBar}%` }}
          />
        </div>
        
        <h2 className="choice-question">{data.question}</h2>
        
        <div className="choice-grid">
          {data.options.map((option) => (
            <button
              key={option.id}
              className="choice-button"
              onClick={() => handleChoice(option, stage)}
            >
              <span className="choice-emoji">{option.emoji}</span>
              <span className="choice-text">{option.text}</span>
            </button>
          ))}
        </div>
        
        <div className="choice-instruction">Tap to choose</div>
      </div>
    )
  }

  const renderEnd = () => {
    const result = getEndMessage()
    return (
      <div className="game-screen end-screen">
        <div className="end-animation">
          <div className="end-icon">💔</div>
        </div>
        
        <h2 className="end-title">{result.title}</h2>
        <p className="end-message">{result.message}</p>
        
        <div className="end-reality">
          <p className="reality-text">{result.reality}</p>
        </div>

        <div className="end-stats">
          <div className="stat-box">
            <div className="stat-number">150M+</div>
            <div className="stat-label">Orphans worldwide</div>
          </div>
          <div className="stat-box">
            <div className="stat-number">Every day</div>
            <div className="stat-label">They face these choices</div>
          </div>
        </div>

        <div className="end-impact">
          <h3>But you can change this story.</h3>
          <p>With your support, orphans don't have to choose between food, education, and health.</p>
        </div>

        <div className="end-actions">
          <Link to="/donate" className="btn btn-primary btn-large">
            Help Change Their Story
          </Link>
          <button 
            className="btn btn-secondary"
            onClick={resetGame}
          >
            Play Again
          </button>
        </div>

        <div className="share-section">
          <p className="share-text">Share this experience:</p>
          <div className="share-buttons">
            <button className="share-btn">📱 Share</button>
            <button className="share-btn">🔗 Copy Link</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page game-page">
      <div className="game-container">
        {gameState === 'intro' && renderIntro()}
        {gameState === 'choice1' && renderChoice('choice1')}
        {gameState === 'choice2' && renderChoice('choice2')}
        {gameState === 'choice3' && renderChoice('choice3')}
        {gameState === 'end' && renderEnd()}
      </div>
    </div>
  )
}

export default Game
