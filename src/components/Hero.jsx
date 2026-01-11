import { Link } from 'react-router-dom'

function Hero({ title, subtitle, description, ctaText, ctaLink }) {
  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">{title}</h1>
          {subtitle && <h2 className="hero-subtitle">{subtitle}</h2>}
          {description && <p className="hero-description">{description}</p>}
          {ctaText && ctaLink && (
            <Link to={ctaLink} className="btn btn-primary btn-large">
              {ctaText}
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}

export default Hero
