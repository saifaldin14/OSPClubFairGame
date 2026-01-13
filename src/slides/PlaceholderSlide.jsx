import React from 'react'

function PlaceholderSlide({ title, subtitle, slideNumber }) {
  return (
    <div className="slide-container placeholder-slide">
      <div className="slide-number">{slideNumber}</div>
      <h2>{title}</h2>
      <p>{subtitle}</p>
      <div className="coming-soon">
        🚧 Coming Soon 🚧
      </div>
    </div>
  )
}

export default PlaceholderSlide
