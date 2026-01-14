import { Backpack, Hospital, Moon, PartyPopper, Laptop, Circle, Utensils, Palette, Shirt, BookOpen, Users, Heart } from 'lucide-react'

// Gallery icon mapping
const galleryIconMap = {
  '🎒': Backpack,
  '🏥': Hospital,
  '🌙': Moon,
  '🎉': PartyPopper,
  '💻': Laptop,
  '⚽': Circle,
  '🍽️': Utensils,
  '🎨': Palette,
  '🧥': Shirt,
  '📚': BookOpen,
  '🤝': Users,
  '💚': Heart
}

function Gallery() {
  const galleryItems = [
    {
      id: 1,
      category: "Education",
      title: "Back to School 2025",
      description: "Students receiving their new school supplies and backpacks",
      iconKey: "🎒"
    },
    {
      id: 2,
      category: "Healthcare",
      title: "Medical Checkup Day",
      description: "Annual health screenings for orphans",
      iconKey: "🏥"
    },
    {
      id: 3,
      category: "Events",
      title: "Ramadan Iftar",
      description: "Breaking fast together during Ramadan",
      iconKey: "🌙"
    },
    {
      id: 4,
      category: "Events",
      title: "Eid Celebration",
      description: "Children celebrating Eid with new clothes and gifts",
      iconKey: "🎉"
    },
    {
      id: 5,
      category: "Education",
      title: "Computer Lab",
      description: "Learning essential technology skills",
      iconKey: "💻"
    },
    {
      id: 6,
      category: "Community",
      title: "Sports Day",
      description: "Building friendships through sports and games",
      iconKey: "⚽"
    },
    {
      id: 7,
      category: "Food Program",
      title: "Nutritious Meals",
      description: "Daily meal program providing healthy food",
      iconKey: "🍽️"
    },
    {
      id: 8,
      category: "Community",
      title: "Art Class",
      description: "Creative expression through art and crafts",
      iconKey: "🎨"
    },
    {
      id: 9,
      category: "Events",
      title: "Winter Clothing Drive",
      description: "Distributing warm clothing for winter",
      iconKey: "🧥"
    },
    {
      id: 10,
      category: "Education",
      title: "Library Reading Hour",
      description: "Encouraging literacy and love for reading",
      iconKey: "📚"
    },
    {
      id: 11,
      category: "Community",
      title: "Volunteer Day",
      description: "Community members volunteering their time",
      iconKey: "🤝"
    },
    {
      id: 12,
      category: "Events",
      title: "Annual Fundraiser",
      description: "Community gathering to support our cause",
      iconKey: "💚"
    }
  ]

  return (
    <div className="page gallery-page">
      <div className="page-hero">
        <div className="container">
          <h1 className="page-title">Gallery</h1>
          <p className="page-subtitle">Moments of hope and transformation</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <p className="section-description center">
            See the impact of your support through these moments captured from our programs 
            and events. Every photo tells a story of hope, compassion, and positive change 
            in the lives of orphans around the world.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="gallery-grid">
            {galleryItems.map(item => {
              const IconComponent = galleryIconMap[item.iconKey] || Heart
              return (
                <div key={item.id} className="gallery-item">
                  <div className="gallery-image">
                    <div className="gallery-icon"><IconComponent size={48} color="var(--accent-color)" /></div>
                  </div>
                  <div className="gallery-content">
                    <div className="gallery-category">{item.category}</div>
                    <h3 className="gallery-title">{item.title}</h3>
                    <p className="gallery-description">{item.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section bg-light">
        <div className="container">
          <h2 className="section-title">Be Part of Our Story</h2>
          <p className="section-description">
            These moments are made possible by the generosity of donors like you. 
            Your support creates lasting memories and brighter futures for orphans worldwide.
          </p>
          <div className="cta-buttons">
            <a href="/donate" className="btn btn-primary">Support Our Mission</a>
            <a href="/events" className="btn btn-secondary">Attend Our Events</a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="testimonials">
            <h2 className="section-title">Stories of Impact</h2>
            <div className="testimonial-grid">
              <div className="testimonial-card">
                <p className="testimonial-text">
                  "OSP has given me hope for a better future. Through their education program, 
                  I'm now able to pursue my dreams of becoming a teacher."
                </p>
                <p className="testimonial-author">- Amina, Age 16</p>
              </div>
              <div className="testimonial-card">
                <p className="testimonial-text">
                  "The monthly sponsorship has made a world of difference. I can focus on my 
                  studies knowing that my basic needs are taken care of."
                </p>
                <p className="testimonial-author">- Hassan, Age 14</p>
              </div>
              <div className="testimonial-card">
                <p className="testimonial-text">
                  "Being part of the OSP community has given me a sense of belonging. 
                  I've made friends and feel supported every day."
                </p>
                <p className="testimonial-author">- Fatima, Age 12</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Gallery
