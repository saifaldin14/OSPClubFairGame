import React, { useState } from 'react'
import { User, AlertTriangle, Heart, Clock } from 'lucide-react'
import Game from '../pages/Game'

function GameSlide({ swiper }) {
  const [showGame, setShowGame] = useState(false)

  const handleStart = () => {
    setShowGame(true)
  }

  if (showGame) {
    return (
      <div className="slide-container game-slide">
        <Game isCarousel={true} swiper={swiper} />
      </div>
    )
  }

  return (
    <div className="slide-container game-intro-slide">
      {/* Hero Section */}
      <div className="game-hero-section">
        <div className="game-illustration-modern">
          <div className="illustration-circle">
            <User size={64} strokeWidth={1.5} />
          </div>
        </div>
        <h1 className="game-title-modern">Walk in Amira's Shoes</h1>
        <p className="game-subtitle-modern">Experience a day in the life of a 10-year-old orphan</p>
      </div>
      
      {/* Info Cards */}
      <div className="intro-cards-grid">
        <div className="intro-info-card">
          <div className="card-icon-wrapper">
            <User size={28} />
          </div>
          <h3>Meet Amira</h3>
          <p>A 10-year-old girl who lost her parents and faces impossible choices every day</p>
        </div>
        
        <div className="intro-info-card">
          <div className="card-icon-wrapper">
            <Clock size={28} />
          </div>
          <h3>3 Decisions</h3>
          <p>Make real choices that orphans face daily with no perfect answers</p>
        </div>
        
        <div className="intro-info-card">
          <div className="card-icon-wrapper">
            <Heart size={28} />
          </div>
          <h3>Real Impact</h3>
          <p>Every choice has consequences that reveal the harsh reality of survival</p>
        </div>
      </div>

      {/* Emphasis Box */}
      <div className="emphasis-box">
        <p className="emphasis-text">There are no "good" options. Just survival.</p>
      </div>

      {/* Warning Notice */}
      <div className="intro-warning-modern">
        <AlertTriangle size={20} />
        <div className="warning-content">
          <p className="warning-title">This experience may be emotionally challenging</p>
          <p className="warning-subtitle">Every choice you make has real consequences</p>
        </div>
      </div>

      {/* CTA Button */}
      <button 
        className="btn btn-primary btn-large btn-game-start-modern"
        onClick={handleStart}
      >
        Begin Amira's Day
      </button>
    </div>
  )
}

export default GameSlide
