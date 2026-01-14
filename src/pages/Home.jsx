import Hero from '../components/Hero'
import Card from '../components/Card'
import { Heart, BookOpen, Hospital, Users, Gamepad2 } from 'lucide-react'

function Home() {
  return (
    <div className="page home-page">
      <Hero 
        title="Welcome to OSP"
        subtitle="Orphan Sponsorship Program"
        description="Making a difference in the lives of orphans around the world through compassion, support, and Islamic values."
        ctaText="Support Our Cause"
        ctaLink="/donate"
      />
      
      <section className="section">
        <div className="container">
          <h2 className="section-title">Our Mission</h2>
          <p className="section-description">
            OSP (Orphan Sponsorship Program) is dedicated to supporting orphans globally by providing 
            essential resources, education, and care. We work within the framework of Islamic values 
            to ensure every child receives the love, support, and opportunities they deserve.
          </p>
        </div>
      </section>

      <section className="section bg-light">
        <div className="container">
          <h2 className="section-title">What We Do</h2>
          <div className="card-grid">
            <Card 
              title="Orphan Sponsorship"
              description="Provide monthly support to orphans including food, clothing, education, and healthcare."
              icon={<Heart size={32} />}
            />
            <Card 
              title="Educational Programs"
              description="Ensure orphans have access to quality education and learning materials."
              icon={<BookOpen size={32} />}
            />
            <Card 
              title="Healthcare Support"
              description="Provide medical care, regular checkups, and essential healthcare services."
              icon={<Hospital size={32} />}
            />
            <Card 
              title="Community Building"
              description="Create supportive communities where orphans can thrive and grow."
              icon={<Users size={32} />}
            />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Make an Impact Today</h2>
          <p className="section-description">
            Your donation can change a child's life. Join us in our mission to provide hope, 
            dignity, and a brighter future for orphans around the world.
          </p>
          <div className="cta-buttons">
            <a href="/donate" className="btn btn-primary">Donate Now</a>
            <a href="/programs" className="btn btn-secondary">Learn More</a>
          </div>
        </div>
      </section>

      <section className="section bg-light">
        <div className="container">
          <h2 className="section-title">Walk in Their Shoes</h2>
          <p className="section-description">
            Experience what it's like to be an orphan facing impossible choices every single day.
          </p>
          <div className="game-preview-card">
            <div className="game-preview-icon"><Gamepad2 size={48} color="var(--accent-color)" /></div>
            <h3>"3 Choices" - Interactive Experience</h3>
            <p>A powerful 15-second game that shows the reality of daily decisions orphans must make.</p>
            <a href="/game" className="btn btn-primary">Try the Experience</a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
