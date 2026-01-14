import { Check } from 'lucide-react'

function Card({ title, description, icon, details }) {
  return (
    <div className="card">
      {icon && <div className="card-icon">{icon}</div>}
      <h3 className="card-title">{title}</h3>
      <p className="card-description">{description}</p>
      {details && details.length > 0 && (
        <ul className="card-details">
          {details.map((detail, index) => (
            <li key={index}><Check size={14} /> {detail}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Card
