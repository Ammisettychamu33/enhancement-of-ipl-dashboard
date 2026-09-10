import { Link } from 'react-router-dom'
import './index.css'

const TeamCard = props => {
  const { teamData } = props
  const { name, id, teamImageUrl } = teamData

  return (
    <li className="team-card">
      <Link to={`/team-matches/${id}`} className="team-card-link">
        <img src={teamImageUrl} alt={name} className="team-card-image" />
        <p className="team-card-name">{name}</p>
      </Link>
    </li>
  )
}

export default TeamCard
