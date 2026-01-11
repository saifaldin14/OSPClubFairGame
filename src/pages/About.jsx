function About() {
  return (
    <div className="page about-page">
      <div className="page-hero">
        <div className="container">
          <h1 className="page-title">About OSP</h1>
          <p className="page-subtitle">Orphan Sponsorship Program</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Our Story</h2>
          <p className="section-description">
            OSP (Orphan Sponsorship Program) was founded with a simple yet powerful mission: 
            to provide hope and support to orphans around the world. Rooted in Islamic values 
            of compassion, charity, and community, we work tirelessly to ensure that every 
            orphaned child has access to the resources and care they need to thrive.
          </p>
        </div>
      </section>

      <section className="section bg-light">
        <div className="container">
          <h2 className="section-title">Our Values</h2>
          <div className="values-grid">
            <div className="value-item">
              <h3>🤲 Faith & Compassion</h3>
              <p>Guided by Islamic principles of mercy and kindness</p>
            </div>
            <div className="value-item">
              <h3>💚 Transparency</h3>
              <p>Open and honest in all our operations and donations</p>
            </div>
            <div className="value-item">
              <h3>🌍 Global Reach</h3>
              <p>Supporting orphans across continents and communities</p>
            </div>
            <div className="value-item">
              <h3>🎯 Impact Focused</h3>
              <p>Every donation directly improves a child's life</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">What Makes Us Different</h2>
          <div className="content-block">
            <p>
              At OSP, we believe in holistic support that addresses not just the physical needs 
              of orphans, but also their emotional, educational, and spiritual wellbeing. Our 
              programs are designed with Islamic values at their core, ensuring that children 
              receive care that respects their faith and cultural heritage.
            </p>
            <p>
              We work with local partners in communities around the world to ensure our support 
              is culturally appropriate and sustainable. Our team is committed to transparency, 
              and we provide regular updates to our donors about how their contributions are 
              making a difference.
            </p>
          </div>
        </div>
      </section>

      <section className="section stats-section">
        <div className="container">
          <h2 className="section-title">Our Impact</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Orphans Supported</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">25+</div>
              <div className="stat-label">Countries Reached</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">1000+</div>
              <div className="stat-label">Donors</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">100%</div>
              <div className="stat-label">Donation Impact</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
