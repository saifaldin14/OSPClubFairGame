import { useState, useEffect } from 'react'

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
          emoji: '🍞', 
          text: 'Use your $2 to buy bread for today', 
          impact: 'hunger', 
          consequence: 'You eat, but school costs $1...',
          effects: { hunger: -30, education: 10, stress: 5, money: -2 }
        },
        { 
          id: 'school', 
          emoji: '📚', 
          text: 'Save money for school fees due tomorrow', 
          impact: 'education', 
          consequence: 'Your stomach growls through the morning...',
          effects: { hunger: 20, education: -20, stress: 15, money: 0 }
        },
        { 
          id: 'medicine', 
          emoji: '💊', 
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
          emoji: '🙏', 
          text: 'Ask a classmate to share their food', 
          impact: 'dignity', 
          consequence: 'They say yes, but you see the pity in their eyes...',
          effects: { hunger: -20, stress: 25, education: 5, money: 0 }
        },
        { 
          id: 'work', 
          emoji: '🧹', 
          text: 'Leave school to work at the market', 
          impact: 'labor', 
          consequence: 'You earn $3, but miss the lesson you needed...',
          effects: { hunger: -15, education: 30, stress: 20, money: 3 }
        },
        { 
          id: 'endure', 
          emoji: '😔', 
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
          emoji: '📖', 
          text: 'Study by candlelight, ignoring everything else', 
          impact: 'desperation', 
          consequence: 'You pass the exam but your brother cries all night...',
          effects: { education: -30, health: 20, stress: 35, money: 0 }
        },
        { 
          id: 'hospital', 
          emoji: '🏥', 
          text: 'Take your brother to the free clinic', 
          impact: 'sacrifice', 
          consequence: 'You miss the exam. Your future slips away...',
          effects: { education: 40, health: -30, stress: 25, money: 0 }
        },
        { 
          id: 'sleep', 
          emoji: '😢', 
          text: 'Give up for tonight and just hold your brother', 
          impact: 'hopeless', 
          consequence: 'You both cry yourselves to sleep, wondering if tomorrow will be different...',
          effects: { hunger: 10, health: 10, education: 20, stress: 40, money: 0 }
        }
      ]
    }
  }

  const getEndMessage = () => {
    const impacts = choices.map(c => c.impact)
    const choiceTexts = choices.map(c => c.text)
    
    // Create personalized ending based on the journey
    if (impacts.includes('health') && impacts.includes('sacrifice')) {
      return {
        title: "You Put Family First",
        message: "You chose your brother over everything else. The medicine helped, but you failed the exam. Next year, you'll have to work full-time. Your dreams of becoming a teacher fade away. Your brother will grow up knowing you gave up your future for him.",
        reality: "6,000 children die every day from preventable diseases because their families can't afford basic healthcare.",
        hope: "With just $50/month, you could sponsor a child and break this cycle."
      }
    } else if (impacts.includes('education') && impacts.includes('desperation')) {
      return {
        title: "You Fought for Your Education",
        message: "You passed the exam by staying up all night, ignoring your brother's cries. The next morning, his fever broke—but he'll never forget that night. Neither will you. The guilt weighs heavier than any textbook.",
        reality: "61 million children worldwide are denied education, not because they don't want to learn, but because survival comes first.",
        hope: "Your support can give a child both education AND the security to be a kid."
      }
    } else if (impacts.includes('dignity')) {
      return {
        title: "You Swallowed Your Pride",
        message: "Asking for food hurt more than the hunger. Every day, you see the way people look at you—like you're invisible, or worse, a burden. You're not a charity case. You're a 10-year-old girl who wants to laugh, play, and dream. But survival strips away your childhood, one humiliating moment at a time.",
        reality: "Orphans aren't just hungry for food—they're starving for dignity, hope, and a sense of belonging.",
        hope: "You can restore a child's dignity and give them a reason to dream again."
      }
    } else if (impacts.includes('labor') && impacts.includes('suffering')) {
      return {
        title: "You Became an Adult at 10",
        message: "While your classmates learned fractions, you learned how to negotiate with shop owners. While they played, you carried heavy boxes. Your hands are rough, your back aches, and you're only 10. Childhood isn't something you get to have—it's something you watch from the outside.",
        reality: "152 million children are trapped in child labor, robbed of their childhood and their future.",
        hope: "Together, we can give children back their right to be children."
      }
    } else if (impacts.includes('hopeless')) {
      return {
        title: "You Gave Up Tonight",
        message: "Sometimes, the weight is too heavy. You held your brother, and both of you cried. No exam, no food, no plan—just two children alone in the dark, wondering if anyone cares. Tomorrow will come, and you'll have to make impossible choices all over again. This is your life now.",
        reality: "150+ million orphans wake up every day not knowing if they'll eat, learn, or survive.",
        hope: "But you can be the answer to their prayers. You can be the reason they don't give up."
      }
    } else {
      return {
        title: "No Choice Was Right",
        message: "Every decision came at a cost. Feed yourself, neglect your brother. Help your brother, fail school. Work for money, lose education. There were no good options—only impossible choices that crush your spirit a little more each day. You're 10, but you feel ancient.",
        reality: "This isn't a game. This is the daily reality for millions of children right now.",
        hope: "Your donation can break this cycle and give a child a real childhood."
      }
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
          <div className="money-tracker">💵 ${money}</div>
          <div className="time-badge">{timeOfDay}</div>
          <div className="stage-badge">Choice {stageNumber} of 3</div>
        </div>

        {/* Consequence Meters */}
        <div className="consequence-meters">
          <div className="meter">
            <span className="meter-label">😔 Stress</span>
            <div className="meter-bar">
              <div className="meter-fill stress" style={{ width: `${consequences.stress}%` }}></div>
            </div>
          </div>
          <div className="meter">
            <span className="meter-label">😫 Hunger</span>
            <div className="meter-bar">
              <div className="meter-fill hunger" style={{ width: `${consequences.hunger}%` }}></div>
            </div>
          </div>
          <div className="meter">
            <span className="meter-label">📚 Education Loss</span>
            <div className="meter-bar">
              <div className="meter-fill education" style={{ width: `${consequences.education}%` }}></div>
            </div>
          </div>
          <div className="meter">
            <span className="meter-label">🤒 Health Issues</span>
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
              <div className="consequence-emoji">{selectedOption.emoji}</div>
              <p className="consequence-text">{selectedOption.consequence}</p>
            </div>
          </div>
        )}
        
        <div className="choice-grid">
          {data.options.map((option) => (
            <button
              key={option.id}
              className={`choice-button ${selectedOption?.id === option.id ? 'selected' : ''} ${showConsequence ? 'disabled' : ''}`}
              onClick={() => !showConsequence && handleChoice(option, stage)}
              disabled={showConsequence}
            >
              <span className="choice-emoji">{option.emoji}</span>
              <div className="choice-content">
                <span className="choice-text">{option.text}</span>
                <span className="choice-hint">{option.consequence}</span>
              </div>
            </button>
          ))}
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
    let endingEmoji = ''

    if (totalConsequences <= 150) {
      endingMessage = "Against all odds, Amira found moments of light in her difficult day. She made thoughtful choices that protected her wellbeing as much as possible. But even on her 'best' days, she still faces impossible decisions that no child should have to make."
      endingEmoji = '🌟'
    } else if (totalConsequences <= 250) {
      endingMessage = "Amira's day was filled with difficult compromises. She sacrificed her health for education, or her education for food. Every choice had a cost, and by the end of the day, the weight of these decisions shows in her tired eyes."
      endingEmoji = '😔'
    } else {
      endingMessage = "Amira's day was overwhelming. The choices she had to make left her hungry, exhausted, and falling further behind. This is the reality for millions of children—where survival comes at the cost of their future."
      endingEmoji = '💔'
    }

    return (
      <div className="game-screen end-screen">
        <div className="end-emoji">{endingEmoji}</div>
        <h2 className="end-title">Amira's Day Ends...</h2>
        <p className="end-message">{endingMessage}</p>

        {/* Consequence Summary */}
        <div className="end-consequences">
          <h3>The Weight of Her Choices:</h3>
          <div className="meter">
            <span className="meter-label">😔 Stress: {consequences.stress}%</span>
            <div className="meter-bar">
              <div className="meter-fill stress" style={{ width: `${consequences.stress}%` }}></div>
            </div>
          </div>
          <div className="meter">
            <span className="meter-label">😫 Hunger: {consequences.hunger}%</span>
            <div className="meter-bar">
              <div className="meter-fill hunger" style={{ width: `${consequences.hunger}%` }}></div>
            </div>
          </div>
          <div className="meter">
            <span className="meter-label">📚 Education Lost: {consequences.education}%</span>
            <div className="meter-bar">
              <div className="meter-fill education" style={{ width: `${consequences.education}%` }}></div>
            </div>
          </div>
          <div className="meter">
            <span className="meter-label">🤒 Health Problems: {consequences.health}%</span>
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
            {choices.map((choice, index) => (
              <div key={index} className="choice-recap">
                <span className="recap-emoji">{choice.emoji}</span>
                <span className="recap-text">{choice.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="end-actions">
          <button 
            className="btn btn-primary btn-large"
            onClick={() => window.open('https://uwosp.ca/donate', '_blank')}
          >
            💚 Sponsor a Child Like Amira
          </button>
          <button 
            className="btn btn-secondary"
            onClick={resetGame}
          >
            Experience Again
          </button>
        </div>

        <div className="share-section">
          <p className="share-text">This game opened your eyes. Share it to open others':</p>
          <div className="share-buttons">
            <button className="share-btn">📱 Share on Social Media</button>
            <button className="share-btn">💬 Tell Your Friends</button>
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
