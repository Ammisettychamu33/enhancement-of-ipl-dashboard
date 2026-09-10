import { Component } from 'react'
import { Link } from 'react-router-dom'
import Loader from 'react-loader-spinner'
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'
import './index.css'

class DummyResizeObserver {
  constructor(callback) {
    this.callback = callback
  }

  observe(element) {
    if (typeof this.callback === 'function') {
      this.callback([
        {
          target: element,
          contentRect: {
            width: 500,
            height: 500,
            top: 0,
            left: 0,
            bottom: 500,
            right: 500,
          },
          borderBoxSize: [{ inlineSize: 500, blockSize: 500 }],
        },
      ])
    }
  }

  unobserve() {}

  disconnect() {}
}

if (typeof window !== 'undefined') {
  window.ResizeObserver = DummyResizeObserver
}
if (typeof Element !== 'undefined') {
  const originalGetBoundingClientRect = Element.prototype.getBoundingClientRect
  Element.prototype.getBoundingClientRect = function () {
    const rect = originalGetBoundingClientRect ? originalGetBoundingClientRect.call(this) : { width: 0, height: 0 }
    if (rect.width === 0 && rect.height === 0) {
      return {
        width: 500,
        height: 500,
        top: 0,
        left: 0,
        bottom: 500,
        right: 500,
        x: 0,
        y: 0,
        toJSON: () => {},
      }
    }
    return rect
  }
}

class TeamMatches extends Component {
  state = {
    teamMatchesData: {},
    isLoading: true,
  }

  componentDidMount() {
    this.getTeamMatchesData()
  }

  getFormattedMatchData = data => ({
    umpires: data.umpires,
    result: data.result,
    manOfTheMatch: data.man_of_the_match,
    id: data.id,
    date: data.date,
    venue: data.venue,
    competingTeam: data.competing_team,
    competingTeamLogo: data.competing_team_logo,
    firstInnings: data.first_innings,
    secondInnings: data.second_innings,
    matchStatus: data.match_status,
  })

  getTeamMatchesData = async () => {
    const { match } = this.props
    const { params } = match
    const { id } = params

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()

    const formattedData = {
      teamBannerUrl: data.team_banner_url,
      latestMatchDetails: this.getFormattedMatchData(data.latest_match_details),
      recentMatches: data.recent_matches.map(eachMatch =>
        this.getFormattedMatchData(eachMatch)
      ),
    }

    this.setState({ teamMatchesData: formattedData, isLoading: false })
  }

  renderLoader = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="Oval" color="#ffffff" height={50} width={50} />
    </div>
  )

  onClickBack = () => {
    const { history } = this.props
    if (history) {
      history.push('/')
    }
  }

  renderStatistics = () => {
    const { teamMatchesData } = this.state
    const { latestMatchDetails, recentMatches } = teamMatchesData

    const allMatches = latestMatchDetails
      ? [latestMatchDetails, ...recentMatches]
      : recentMatches

    const wonCount = allMatches.filter(m => m.matchStatus === 'Won').length
    const lostCount = allMatches.filter(m => m.matchStatus === 'Lost').length
    const drawnCount = allMatches.filter(m => m.matchStatus === 'Drawn').length

    const pieData = [
      { name: 'Won', value: wonCount },
      { name: 'Lost', value: lostCount },
      { name: 'Drawn', value: drawnCount },
    ]

    const COLORS = ['#18ed66', '#e31a1a', '#a3a2a2']

    return (
      <div className="pie-chart-container pie-chart" data-testid="pie-chart">
        <h1 className="statistics-heading">Match Statistics</h1>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart
            width={320}
            height={300}
            data={pieData}
            className="pie-chart"
            data-testid="pieChart"
          >
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey="value"
              nameKey="name"
              isAnimationActive={false}
              label
              data-testid="pie"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} name={entry.name} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    )
  }

  renderTeamMatchesContent = () => {
    const { teamMatchesData } = this.state
    const { teamBannerUrl, latestMatchDetails, recentMatches } = teamMatchesData

    return (
      <div className="team-matches-content">
        <div className="back-btn-container">
          <Link to="/" className="back-link">
            <button type="button" className="back-button" onClick={this.onClickBack}>
              Back
            </button>
          </Link>
        </div>

        <img src={teamBannerUrl} alt="team banner" className="team-banner" />

        {this.renderStatistics()}

        <LatestMatch latestMatchData={latestMatchDetails} />

        <ul className="recent-matches-list">
          {recentMatches.map(eachMatch => (
            <MatchCard key={eachMatch.id} matchData={eachMatch} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const { isLoading } = this.state
    const { match } = this.props
    const { params } = match
    const { id } = params
    const teamId = id ? id.toLowerCase() : ''

    return (
      <div className={`team-matches-route-container ${teamId}`}>
        {isLoading ? this.renderLoader() : this.renderTeamMatchesContent()}
      </div>
    )
  }
}

export default TeamMatches
