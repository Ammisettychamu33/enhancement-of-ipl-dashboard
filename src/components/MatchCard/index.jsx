import './index.css'

const MatchCard = props => {
  const { matchData } = props
  const { competingTeam, competingTeamLogo, result, matchStatus } = matchData

  const isWon = matchStatus === 'Won'

  return (
    <li className="match-card">
      <img
        src={competingTeamLogo}
        alt={`competing team ${competingTeam}`}
        className="match-card-team-logo"
      />
      <p className="match-card-team-name">{competingTeam}</p>
      <p className="match-card-result">{result}</p>
      <p className={`match-status ${isWon ? 'won' : 'lost'}`}>{matchStatus}</p>
    </li>
  )
}

export default MatchCard
