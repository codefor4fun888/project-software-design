import { useEffect, useState } from 'react'
import './App.css'

const API_URL = 'http://127.0.0.1:8000'

function App() {
  const [markets, setMarkets] = useState([])

  const [portfolio, setPortfolio] = useState({
    balance: 10000,
    positions: [],
  })

  const [selectedMarket, setSelectedMarket] = useState(null)
  const [selectedCandidate, setSelectedCandidate] = useState('')
  const [amount, setAmount] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [accountOpen, setAccountOpen] = useState(false)

  useEffect(() => {
    loadMarkets()
    loadPortfolio()
  }, [])

  const loadMarkets = async () => {
    try {
      const response = await fetch(`${API_URL}/markets`)

      if (!response.ok) {
        throw new Error('Could not load markets.')
      }

      const data = await response.json()
      setMarkets(data)
    } catch (error) {
      console.error('Error loading markets:', error)
    }
  }

  const loadPortfolio = async () => {
    try {
      const response = await fetch(`${API_URL}/portfolio`)

      if (!response.ok) {
        throw new Error('Could not load portfolio.')
      }

      const data = await response.json()
      setPortfolio(data)
    } catch (error) {
      console.error('Error loading portfolio:', error)
    }
  }

  const openMarket = (market) => {
    setSelectedMarket(market)
    setSelectedCandidate('')
    setAmount('')
    setMessage('')

    setTimeout(() => {
      document
        .getElementById('prediction-panel')
        ?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        })
    }, 100)
  }

  const closeMarket = () => {
    setSelectedMarket(null)
    setSelectedCandidate('')
    setAmount('')
    setMessage('')
  }

  const placePrediction = async (event) => {
    event.preventDefault()
    setMessage('')

    if (!selectedCandidate) {
      setMessage('Choose an outcome first.')
      return
    }

    const predictionAmount = Number(amount)

    if (!predictionAmount || predictionAmount <= 0) {
      setMessage('Enter an amount greater than $0.')
      return
    }

    if (predictionAmount > Number(portfolio.balance)) {
      setMessage('You do not have enough virtual currency.')
      return
    }

    try {
      setIsSubmitting(true)

      const response = await fetch(`${API_URL}/predict`, {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          market_id: selectedMarket.id,
          candidate: selectedCandidate,
          amount: predictionAmount,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setMessage(
          data.detail || 'Prediction could not be placed.'
        )
        return
      }

      setMessage(
        `Prediction placed: $${predictionAmount.toLocaleString()} on ${selectedCandidate}.`
      )

      setAmount('')

      await loadPortfolio()
    } catch (error) {
      console.error('Error placing prediction:', error)
      setMessage('Could not connect to the prediction API.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const getMarketTitle = (position) => {
    if (position.marketTitle) {
      return position.marketTitle
    }

    if (position.market_title) {
      return position.market_title
    }

    const marketId =
      position.market_id ?? position.marketId

    const market = markets.find(
      (item) => Number(item.id) === Number(marketId)
    )

    if (market) {
      return market.title
    }

    return `Market #${marketId ?? 'Unknown'}`
  }

  const getPositionCandidate = (position) => {
    return (
      position.candidate ||
      position.choice ||
      position.outcome ||
      'Unknown'
    )
  }

  const leaderboard = [
    {
      rank: 1,
      name: 'Alex M.',
      predictions: 14,
      balance: 14250,
    },
    {
      rank: 2,
      name: 'Jordan K.',
      predictions: 11,
      balance: 12800,
    },
    {
      rank: 3,
      name: 'Taylor R.',
      predictions: 9,
      balance: 11450,
    },
    {
      rank: 4,
      name: 'Morgan S.',
      predictions: 7,
      balance: 9420,
    },
  ]

  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-container">
          <a className="logo" href="#">
            CivicForecast
          </a>

          <div className="nav-links">
            <a href="#markets">Markets</a>
            <a href="#portfolio-section">Portfolio</a>
            <a href="#leaderboard">Leaderboard</a>
            <a href="#about">About</a>
          </div>

          <button
            className="account-button"
            type="button"
            onClick={() => setAccountOpen(true)}
          >
            My Account
            <span>›</span>
          </button>
        </div>
      </nav>

      <main>
        <section className="hero">
          <div className="gradient-orb orb-one"></div>
          <div className="gradient-orb orb-two"></div>

          <div className="hero-container">
            <div className="hero-content">
              <h1>
                Put your predictions
                <span> to the test.</span>
              </h1>

              <p>
                Forecast political outcomes, follow changing
                market probabilities, and compete using virtual
                currency.
              </p>

              <div className="hero-buttons">
                <a
                  className="primary-button"
                  href="#markets"
                >
                  Explore markets
                  <span>›</span>
                </a>

                <a
                  className="text-button"
                  href="#about"
                >
                  How it works
                  <span>›</span>
                </a>
              </div>
            </div>

            <div className="dashboard-preview">
              <div className="preview-header">
                <div>
                  <span className="preview-label">
                    VIRTUAL PORTFOLIO
                  </span>

                  <h3>
                    $
                    {Number(portfolio.balance).toLocaleString(
                      undefined,
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }
                    )}
                  </h3>
                </div>

                <span className="live-pill">Live</span>
              </div>

              <div className="preview-chart">
                <div className="chart-line line-one"></div>
                <div className="chart-line line-two"></div>
                <div className="chart-line line-three"></div>

                <svg
                  viewBox="0 0 500 140"
                  preserveAspectRatio="none"
                  className="chart-svg"
                >
                  <path
                    d="M0,115 C50,100 70,110 110,85 C150,60 170,90 215,65 C255,43 280,68 320,45 C360,20 390,45 430,24 C455,12 475,20 500,5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                </svg>
              </div>

              <div className="preview-stats">
                <div>
                  <span>Available</span>

                  <strong>
                    $
                    {Number(
                      portfolio.balance
                    ).toLocaleString()}
                  </strong>
                </div>

                <div>
                  <span>Positions</span>
                  <strong>{portfolio.positions.length}</strong>
                </div>

                <div>
                  <span>Markets</span>
                  <strong>{markets.length}</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="markets-section"
          id="markets"
        >
          <div className="section-heading">
            <div>
              <span className="small-heading">
                MARKETS
              </span>

              <h2>Make your forecast.</h2>

              <p>
                Explore active prediction markets and see
                the current probability for each outcome.
              </p>
            </div>

            <div className="market-total">
              {markets.length} active
            </div>
          </div>

          <div className="markets-grid">
            {markets.map((market) => (
              <article
                className="market-card"
                key={market.id}
              >
                <div className="card-header">
                  <span className="market-type">
                    Election
                  </span>

                  <div className="open-status">
                    <span></span>
                    Open
                  </div>
                </div>

                <h3>{market.title}</h3>

                <p className="market-question">
                  {market.question}
                </p>

                <div className="outcomes">
                  <div className="outcome">
                    <div className="outcome-top">
                      <span>{market.candidateA}</span>

                      <strong>
                        {market.candidateAProbability}%
                      </strong>
                    </div>

                    <div className="bar">
                      <div
                        className="bar-fill"
                        style={{
                          width: `${market.candidateAProbability}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="outcome">
                    <div className="outcome-top">
                      <span>{market.candidateB}</span>

                      <strong>
                        {market.candidateBProbability}%
                      </strong>
                    </div>

                    <div className="bar secondary">
                      <div
                        className="bar-fill"
                        style={{
                          width: `${market.candidateBProbability}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>

                <button
                  className="view-button"
                  type="button"
                  onClick={() => openMarket(market)}
                >
                  View market
                  <span>›</span>
                </button>
              </article>
            ))}
          </div>

          {selectedMarket && (
            <div
              className="prediction-panel"
              id="prediction-panel"
            >
              <div className="prediction-heading">
                <div>
                  <span className="small-heading">
                    PLACE A PREDICTION
                  </span>

                  <h2>{selectedMarket.title}</h2>
                  <p>{selectedMarket.question}</p>
                </div>

                <button
                  className="close-button"
                  onClick={closeMarket}
                  type="button"
                >
                  ×
                </button>
              </div>

              <form
                className="prediction-form"
                onSubmit={placePrediction}
              >
                <div className="prediction-options">
                  <button
                    type="button"
                    className={
                      selectedCandidate ===
                      selectedMarket.candidateA
                        ? 'prediction-option selected'
                        : 'prediction-option'
                    }
                    onClick={() =>
                      setSelectedCandidate(
                        selectedMarket.candidateA
                      )
                    }
                  >
                    <span>
                      {selectedMarket.candidateA}
                    </span>

                    <strong>
                      {
                        selectedMarket.candidateAProbability
                      }
                      %
                    </strong>
                  </button>

                  <button
                    type="button"
                    className={
                      selectedCandidate ===
                      selectedMarket.candidateB
                        ? 'prediction-option selected'
                        : 'prediction-option'
                    }
                    onClick={() =>
                      setSelectedCandidate(
                        selectedMarket.candidateB
                      )
                    }
                  >
                    <span>
                      {selectedMarket.candidateB}
                    </span>

                    <strong>
                      {
                        selectedMarket.candidateBProbability
                      }
                      %
                    </strong>
                  </button>
                </div>

                <div className="amount-section">
                  <label htmlFor="prediction-amount">
                    Prediction amount
                  </label>

                  <div className="amount-input">
                    <span>$</span>

                    <input
                      id="prediction-amount"
                      type="number"
                      min="1"
                      step="1"
                      placeholder="500"
                      value={amount}
                      onChange={(event) =>
                        setAmount(event.target.value)
                      }
                    />
                  </div>

                  <small>
                    Available: $
                    {Number(
                      portfolio.balance
                    ).toLocaleString()}
                  </small>
                </div>

                <button
                  className="submit-prediction"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? 'Placing prediction...'
                    : 'Place prediction'}

                  <span>›</span>
                </button>

                {message && (
                  <div className="prediction-message">
                    {message}
                  </div>
                )}
              </form>
            </div>
          )}
        </section>

        <section
          className="portfolio-section"
          id="portfolio-section"
        >
          <div className="portfolio-section-header">
            <div>
              <span className="small-heading">
                PORTFOLIO
              </span>

              <h2>Your predictions.</h2>

              <p>
                Track your virtual balance and all of
                your current positions.
              </p>
            </div>

            <div className="portfolio-balance-card">
              <span>AVAILABLE BALANCE</span>

              <strong>
                $
                {Number(
                  portfolio.balance
                ).toLocaleString()}
              </strong>
            </div>
          </div>

          <div className="portfolio-summary">
            <div className="summary-card">
              <span>Available</span>

              <strong>
                $
                {Number(
                  portfolio.balance
                ).toLocaleString()}
              </strong>
            </div>

            <div className="summary-card">
              <span>Positions</span>

              <strong>
                {portfolio.positions.length}
              </strong>
            </div>

            <div className="summary-card">
              <span>Active Markets</span>

              <strong>{markets.length}</strong>
            </div>
          </div>

          <div className="positions-container">
            <h3>Your positions</h3>

            {portfolio.positions.length === 0 ? (
              <div className="empty-portfolio">
                <h4>No predictions yet.</h4>

                <p>
                  Choose a market above and place a
                  prediction to get started.
                </p>

                <a
                  href="#markets"
                  className="primary-button"
                >
                  Explore markets
                  <span>›</span>
                </a>
              </div>
            ) : (
              <div className="positions-grid">
                {portfolio.positions.map(
                  (position, index) => (
                    <div
                      className="position-card"
                      key={index}
                    >
                      <div className="position-card-top">
                        <span className="position-label">
                          POSITION
                        </span>

                        <span className="open-status">
                          <span></span>
                          Active
                        </span>
                      </div>

                      <h4>
                        {getMarketTitle(position)}
                      </h4>

                      <div className="position-details">
                        <div>
                          <span>Prediction</span>

                          <strong>
                            {getPositionCandidate(
                              position
                            )}
                          </strong>
                        </div>

                        <div>
                          <span>Amount</span>

                          <strong>
                            $
                            {Number(
                              position.amount
                            ).toLocaleString()}
                          </strong>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </section>

        <section
          className="leaderboard-section"
          id="leaderboard"
        >
          <div className="leaderboard-heading">
            <div>
              <span className="small-heading">
                LEADERBOARD
              </span>

              <h2>Top forecasters.</h2>

              <p>
                Compare virtual portfolio balances and
                prediction activity.
              </p>
            </div>

            <div className="leaderboard-badge">
              Season 1
            </div>
          </div>

          <div className="leaderboard-card">
            <div className="leaderboard-table-header">
              <span>RANK</span>
              <span>FORECASTER</span>
              <span>PREDICTIONS</span>
              <span>BALANCE</span>
            </div>

            {leaderboard.map((user) => (
              <div
                className="leaderboard-row"
                key={user.rank}
              >
                <div className="rank-number">
                  {user.rank}
                </div>

                <div className="leaderboard-user">
                  <div className="avatar">
                    {user.name.charAt(0)}
                  </div>

                  <strong>{user.name}</strong>
                </div>

                <div className="prediction-count">
                  {user.predictions}
                </div>

                <div className="leaderboard-balance">
                  ${user.balance.toLocaleString()}
                </div>
              </div>
            ))}

            <div className="leaderboard-row you-row">
              <div className="rank-number">
                5
              </div>

              <div className="leaderboard-user">
                <div className="avatar you-avatar">
                  Y
                </div>

                <div>
                  <strong>You</strong>
                  <span className="you-label">
                    Your account
                  </span>
                </div>
              </div>

              <div className="prediction-count">
                {portfolio.positions.length}
              </div>

              <div className="leaderboard-balance">
                $
                {Number(
                  portfolio.balance
                ).toLocaleString()}
              </div>
            </div>
          </div>

          <p className="leaderboard-note">
            Demo leaderboard entries are shown for the
            proof of concept. Your row uses your live
            portfolio data.
          </p>
        </section>

        <section
          className="info-section"
          id="about"
        >
          <div className="info-content">
            <span className="small-heading">
              HOW IT WORKS
            </span>

            <h2>
              A simpler way to explore predictions.
            </h2>

            <p>
              Start with virtual currency, choose the
              outcomes you think will happen, and track
              your positions as market probabilities
              change.
            </p>
          </div>

          <div className="steps">
            <div className="step">
              <span className="step-number">
                01
              </span>

              <h3>Explore</h3>

              <p>
                Browse available prediction markets.
              </p>
            </div>

            <div className="step">
              <span className="step-number">
                02
              </span>

              <h3>Predict</h3>

              <p>
                Use virtual currency to take a position.
              </p>
            </div>

            <div className="step">
              <span className="step-number">
                03
              </span>

              <h3>Track</h3>

              <p>
                Follow your portfolio and market changes.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-content">
          <strong>CivicForecast</strong>

          <span>
            Built for educational prediction markets.
          </span>
        </div>
      </footer>

      {accountOpen && (
        <div
          className="account-overlay"
          onClick={() => setAccountOpen(false)}
        >
          <div
            className="account-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="account-modal-header">
              <div>
                <span className="small-heading">
                  MY ACCOUNT
                </span>

                <h2>Your account.</h2>
              </div>

              <button
                className="close-button"
                type="button"
                onClick={() =>
                  setAccountOpen(false)
                }
              >
                ×
              </button>
            </div>

            <div className="account-profile">
              <div className="account-avatar">
                Y
              </div>

              <div>
                <h3>CivicForecast User</h3>
                <p>Virtual forecasting account</p>
              </div>

              <span className="account-status">
                Active
              </span>
            </div>

            <div className="account-balance">
              <span>AVAILABLE VIRTUAL BALANCE</span>

              <strong>
                $
                {Number(
                  portfolio.balance
                ).toLocaleString(
                  undefined,
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }
                )}
              </strong>
            </div>

            <div className="account-stats">
              <div>
                <span>Positions</span>

                <strong>
                  {portfolio.positions.length}
                </strong>
              </div>

              <div>
                <span>Markets</span>

                <strong>
                  {markets.length}
                </strong>
              </div>
            </div>

            <button
              className="account-portfolio-button"
              type="button"
              onClick={() => {
                setAccountOpen(false)

                setTimeout(() => {
                  document
                    .getElementById(
                      'portfolio-section'
                    )
                    ?.scrollIntoView({
                      behavior: 'smooth',
                    })
                }, 50)
              }}
            >
              View my portfolio
              <span>›</span>
            </button>

            <p className="account-disclaimer">
              CivicForecast uses virtual currency only.
              No real money is involved.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default App