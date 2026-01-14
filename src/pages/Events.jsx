import { PartyPopper, Moon, BookOpen, Footprints, Calendar, Clock, MapPin } from 'lucide-react'

// Event icon mapping
const eventIconMap = {
  '🎉': PartyPopper,
  '🌙': Moon,
  '📚': BookOpen,
  '🚶': Footprints
}

function Events() {
  const upcomingEvents = [
    {
      id: 1,
      title: "Annual Fundraising Gala",
      date: "March 15, 2026",
      time: "6:00 PM - 10:00 PM",
      location: "Grand Ballroom, Community Center",
      description: "Join us for an evening of inspiration, dinner, and fundraising to support orphans worldwide.",
      iconKey: '🎉'
    },
    {
      id: 2,
      title: "Ramadan Iftar Drive",
      date: "April 1-30, 2026",
      time: "Sunset Daily",
      location: "Multiple Locations",
      description: "Volunteer to prepare and serve iftar meals to orphans during the blessed month of Ramadan.",
      iconKey: '🌙'
    },
    {
      id: 3,
      title: "Educational Workshop Series",
      date: "May 10, 2026",
      time: "2:00 PM - 5:00 PM",
      location: "OSP Community Center",
      description: "Learn about orphan care, Islamic charity, and how to make a lasting impact.",
      iconKey: '📚'
    },
    {
      id: 4,
      title: "Charity Walk for Orphans",
      date: "June 5, 2026",
      time: "8:00 AM - 12:00 PM",
      location: "City Park",
      description: "Participate in our 5K charity walk to raise awareness and funds for orphan support programs.",
      iconKey: '🚶'
    }
  ]

  const pastEvents = [
    {
      id: 1,
      title: "Winter Clothing Drive 2025",
      date: "December 2025",
      description: "Successfully collected and distributed over 1,000 winter clothing items to orphans.",
      impact: "1,000+ children served"
    },
    {
      id: 2,
      title: "Back to School Campaign 2025",
      date: "September 2025",
      description: "Provided school supplies and backpacks to 500 orphans starting the new school year.",
      impact: "500 students supported"
    },
    {
      id: 3,
      title: "Eid Celebration 2025",
      date: "July 2025",
      description: "Organized Eid festivities with gifts, new clothes, and celebrations for orphans.",
      impact: "750 children celebrated"
    }
  ]

  return (
    <div className="page events-page">
      <div className="page-hero">
        <div className="container">
          <h1 className="page-title">Events & Activities</h1>
          <p className="page-subtitle">Join us in making a difference</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Upcoming Events</h2>
          <div className="events-grid">
            {upcomingEvents.map(event => {
              const IconComponent = eventIconMap[event.iconKey] || PartyPopper
              return (
                <div key={event.id} className="event-card">
                  <div className="event-icon"><IconComponent size={32} color="var(--accent-color)" /></div>
                  <div className="event-content">
                    <h3 className="event-title">{event.title}</h3>
                    <div className="event-details">
                      <p className="event-date"><Calendar size={14} /> {event.date}</p>
                      <p className="event-time"><Clock size={14} /> {event.time}</p>
                      <p className="event-location"><MapPin size={14} /> {event.location}</p>
                    </div>
                    <p className="event-description">{event.description}</p>
                    <button className="btn btn-secondary">Register Now</button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section bg-light">
        <div className="container">
          <h2 className="section-title">Past Events & Impact</h2>
          <div className="past-events-grid">
            {pastEvents.map(event => (
              <div key={event.id} className="past-event-card">
                <h3>{event.title}</h3>
                <p className="past-event-date">{event.date}</p>
                <p className="past-event-description">{event.description}</p>
                <div className="past-event-impact">{event.impact}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Get Involved</h2>
          <p className="section-description">
            Want to volunteer at our events or organize your own fundraiser? We'd love to have you join our team!
          </p>
          <div className="volunteer-options">
            <div className="volunteer-card">
              <h3>Volunteer</h3>
              <p>Help at our events and programs. No experience necessary!</p>
              <a href="/contact" className="btn btn-secondary">Sign Up</a>
            </div>
            <div className="volunteer-card">
              <h3>Host an Event</h3>
              <p>Organize a fundraiser in your community with our support.</p>
              <a href="/contact" className="btn btn-secondary">Learn More</a>
            </div>
            <div className="volunteer-card">
              <h3>Corporate Partnership</h3>
              <p>Engage your team in meaningful corporate social responsibility.</p>
              <a href="/contact" className="btn btn-secondary">Partner With Us</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Events
