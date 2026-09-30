import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [markets, setMarkets] = useState([])

  useEffect(() => {
    fetch('http://127.0.0.1:8000/markets')
      .then((response) => response.json())
      .then((data) => {
        setMarkets(data)
      })
      .catch((error) => {
        console.error('Error loading markets:', error)
      })
  }, [])

  return (
    <div>
      <h1>Civic Forecast</h1>

      <p>Predict political outcomes using virtual currency.</p>

      <h2>Prediction Markets</h2>

      <div className="markets-container">
        {markets.map((market) => (
          <div className="market-card" key={market.id}>
            <h3>{market.title}</h3>

            <p>{market.question}</p>

            <div className="candidate">
              <span>{market.candidateA}</span>
              <span className="probability">
                {market.candidateAProbability}%
              </span>
            </div>

            <div className="candidate">
              <span>{market.candidateB}</span>
              <span className="probability">
                {market.candidateBProbability}%
              </span>
            </div>

            <button>View Market</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App