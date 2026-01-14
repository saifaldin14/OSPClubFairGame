import Card from '../components/Card'
import { Heart, GraduationCap, Stethoscope, Moon, Wrench, Siren } from 'lucide-react'

function Programs() {
  return (
    <div className="page programs-page">
      <div className="page-hero">
        <div className="container">
          <h1 className="page-title">Our Programs</h1>
          <p className="page-subtitle">Supporting orphans through comprehensive care</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="card-grid">
            <Card 
              title="Monthly Sponsorship"
              description="Sponsor an orphan with monthly support covering basic needs, education, and healthcare. Your consistent support creates lasting change."
              icon={<Heart size={32} />}
              details={[
                "Food and nutrition",
                "Clothing and necessities",
                "Educational supplies",
                "Healthcare access"
              ]}
            />
            <Card 
              title="Education Fund"
              description="Provide orphans with access to quality education, school supplies, and tutoring to help them succeed academically."
              icon={<GraduationCap size={32} />}
              details={[
                "School tuition fees",
                "Books and supplies",
                "Tutoring programs",
                "Technology access"
              ]}
            />
            <Card 
              title="Medical Care"
              description="Ensure orphans receive proper medical care, regular checkups, and emergency healthcare when needed."
              icon={<Stethoscope size={32} />}
              details={[
                "Regular health checkups",
                "Vaccinations",
                "Emergency medical care",
                "Mental health support"
              ]}
            />
            <Card 
              title="Ramadan Support"
              description="Special program during Ramadan to provide iftar meals, new clothes, and Eid gifts for orphans."
              icon={<Moon size={32} />}
              details={[
                "Daily iftar meals",
                "Eid clothing",
                "Special gifts",
                "Community events"
              ]}
            />
            <Card 
              title="Vocational Training"
              description="Prepare older orphans for independence with vocational training and skill development programs."
              icon={<Wrench size={32} />}
              details={[
                "Job skills training",
                "Apprenticeship programs",
                "Career counseling",
                "Job placement support"
              ]}
            />
            <Card 
              title="Emergency Relief"
              description="Rapid response to crises affecting orphans including natural disasters, conflicts, and emergencies."
              icon={<Siren size={32} />}
              details={[
                "Emergency shelter",
                "Food and water",
                "Medical assistance",
                "Trauma support"
              ]}
            />
          </div>
        </div>
      </section>

      <section className="section bg-light">
        <div className="container">
          <h2 className="section-title">How to Get Involved</h2>
          <p className="section-description">
            Choose a program that resonates with you and start making a difference today. 
            Every contribution, no matter the size, helps transform a child's life.
          </p>
          <div className="cta-buttons">
            <a href="/donate" className="btn btn-primary">Support a Program</a>
            <a href="/contact" className="btn btn-secondary">Learn More</a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Programs
