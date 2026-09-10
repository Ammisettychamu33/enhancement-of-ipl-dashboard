import './index.css'

const LatestMatch = props => {
  const { latestMatchData } = props
  const {
    competingTeam,
    date,
    venue,
    result,
    competingTeamLogo,
    firstInnings,
    secondInnings,
    manOfTheMatch,
    umpires,
  } = latestMatchData

  return (
    <div className="latest-match-card-container">
      <h2 className="latest-match-heading">Latest Matches</h2>
      <div className="latest-match-card">
        <div className="latest-match-details-logo-container">
          <div className="latest-match-details-main">
            <p className="latest-match-team-name">{competingTeam}</p>
            <p className="latest-match-date">{date}</p>
            <p className="latest-match-venue">{venue}</p>
            <p className="latest-match-result">{result}</p>
          </div>
          <img
            src={competingTeamLogo}
            alt={`latest match ${competingTeam}`}
            className="latest-match-team-logo"
          />
        </div>
        <hr className="separator" />
        <div className="latest-match-details-info">
          <div className="info-group">
            <p className="info-label">First Innings</p>
            <p className="info-value">{firstInnings}</p>
          </div>
          <div className="info-group">
            <p className="info-label">Second Innings</p>
            <p className="info-value">{secondInnings}</p>
          </div>
          <div className="info-group">
            <p className="info-label">Man Of The Match</p>
            <p className="info-value">{manOfTheMatch}</p>
          </div>
          <div className="info-group">
            <p className="info-label">Umpires</p>
            <p className="info-value">{umpires}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LatestMatch
