import React from 'react'
import { User, AlertTriangle, Lightbulb } from 'lucide-react'

function GameIntroSlide({ swiper }) {
  const handleStart = () => {
    if (swiper) {
      swiper.slideNext()
    }
  }

  return (
    <div className="slide-container game-intro-slide">
      <div className="game-illustration"><User size={80} strokeWidth={1.5} /></div>
      <h1 className="game-title">Walk in Amira's Shoes</h1>
      <p className="game-subtitle">Experience a day in the life of a 10-year-old orphan</p>
      
      <div className="intro-text">
        <p className="intro-main">For the next few minutes, you are Amira. A 10-year-old girl who lost her parents.</p>
        <p className="intro-main">You'll face 3 real choices orphans make every single day.</p>
        <p className="intro-emphasis">There are no "good" options. Just survival.</p>
      </div>

      <div className="intro-warning">
        <p><AlertTriangle size={16} /> This experience may be emotionally challenging.</p>
        <p>Every choice you make has real consequences.</p>
      </div>

      <button 
        className="btn btn-primary btn-large btn-game-start"
        onClick={handleStart}
      >
        Begin Amira's Day
      </button>

      <div style={{ marginTop: '2rem', fontSize: '0.875rem', opacity: 0.8 }}>
        <p><Lightbulb size={14} /> Use arrow keys or swipe to navigate between slides</p>
      </div>
    </div>
  )
}

export default GameIntroSlide
