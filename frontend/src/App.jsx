import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [markets, setMarkets] = useState([])

  useEffect(() => {
    fetch('http://127.0.0.1:8000/markets')
      .then((response) => response.json())
      .then((data) => setMarkets(data))
      .catch((error) => console.error('Error loading markets:', error))
  }, [])

  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-container">
          <a className="logo" href="#">
            CivicForecast
          </a>

          <div className="nav-links">
            <a href="#markets">Markets</a>
            <a href="#portfolio">Portfolio</a>
            <a href="#leaderboard">Leaderboard</a>
            <a href="#about">About</a>
          </div>

          <button className="account-button">
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
              <div className="hero-badge">
                Prediction markets with virtual currency
                <span>›</span>
              </div>

              <h1>
                Put your predictions
                <span> to the test.</span>
              </h1>

              <p>
                Forecast political outcomes, follow changing market
                probabilities, and compete using virtual currency.
              </p>

              <div className="hero-buttons">
                <a className="primary-button" href="#markets">
                  Explore markets
                  <span>›</span>
                </a>

                <a className="text-button" href="#about">
                  How it works
                  <span>›</span>
                </a>
              </div>
            </div>

            <div className="dashboard-preview">
              <div className="preview-header">
                <div>
                  <span className="preview-label">VIRTUAL PORTFOLIO</span>
                  <h3>$10,000.00</h3>
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
                  <strong>$10,000</strong>
                </div>

                <div>
                  <span>Positions</span>
                  <strong>0</strong>
                </div>

                <div>
                  <span>Markets</span>
                  <strong>{markets.length}</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="markets-section" id="markets">
          <div className="section-heading">
            <div>
              <span className="small-heading">MARKETS</span>
              <h2>Make your forecast.</h2>
              <p>
                Explore active prediction markets and see the current
                probability for each outcome.
              </p>
            </div>

            <div className="market-total">
              {markets.length} active
            </div>
          </div>

          <div className="markets-grid">
            {markets.map((market) => (
              <article className="market-card" key={market.id}>
                <div className="card-header">
                  <span className="market-type">Election</span>

                  <div className="open-status">
                    <span></span>
                    Open
                  </div>
                </div>

                <h3>{market.title}</h3>
                <p className="market-question">{market.question}</p>

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

                <button className="view-button">
                  View market
                  <span>›</span>
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="info-section" id="about">
          <div className="info-content">
            <span className="small-heading">HOW IT WORKS</span>

            <h2>A simpler way to explore predictions.</h2>

            <p>
              Start with virtual currency, choose the outcomes you think
              will happen, and track your positions as market
              probabilities change.
            </p>
          </div>

          <div className="steps">
            <div className="step">
              <span className="step-number">01</span>
              <h3>Explore</h3>
              <p>Browse available prediction markets.</p>
            </div>

            <div className="step">
              <span className="step-number">02</span>
              <h3>Predict</h3>
              <p>Use virtual currency to take a position.</p>
            </div>

            <div className="step">
              <span className="step-number">03</span>
              <h3>Track</h3>
              <p>Follow your portfolio and market changes.</p>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-content">
          <strong>CivicForecast</strong>
          <span>Built for educational prediction markets.</span>
        </div>
      </footer>
    </div>
  )
}

export default App