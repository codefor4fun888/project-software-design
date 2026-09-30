# CivicForecast

CivicForecast is a browser-based political prediction market built as a software design proof of concept.

Users can explore fictional election markets, view market probabilities, make predictions using virtual currency, track their positions, manage their portfolio, and compare results on a leaderboard.

> **Note:** CivicForecast uses virtual currency only. No real money or real betting is involved.

---

## Features

- Explore active prediction markets
- View probabilities for each market outcome
- Make predictions using virtual currency
- Track available virtual balance
- View prediction positions in a portfolio
- Add virtual funds to an account
- View a leaderboard
- View account information
- Backend request validation
- REST API communication between React and FastAPI
- Automated backend testing with Pytest

---

## Technology Stack

| Area | Technologies |
|---|---|
| Frontend | React, JavaScript, Vite, CSS |
| Backend | Python, FastAPI, Pydantic, Uvicorn |
| API Communication | Fetch API, HTTP, JSON |
| Testing | Pytest, FastAPI TestClient, HTTPX |
| Version Control | Git, GitHub |
| Current Storage | In-memory Python data |

---

## Project Structure

```text
CivicForecast/
│
├── backend/
│   ├── main.py
│   ├── test_main.py
│   └── venv/
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.css
│   │
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

---

# Getting Started

The frontend and backend must both be running for CivicForecast to work.

## 1. Clone the Repository

```bash
git clone https://github.com/codefor4fun888/project-software-design.git
cd project-software-design
```

---

## 2. Backend Setup

Enter the backend directory:

```powershell
cd backend
```

### Create a Virtual Environment

If you do not already have one:

```powershell
python -m venv venv
```

### Install Dependencies

```powershell
.\venv\Scripts\python.exe -m pip install fastapi uvicorn pytest httpx
```

### Start the FastAPI Server

```powershell
.\venv\Scripts\python.exe -m uvicorn main:app --reload
```

The backend will run at:

```text
http://127.0.0.1:8000
```

Opening the backend URL should return:

```json
{
  "message": "Civic Forecast API is running"
}
```

FastAPI's interactive API documentation is available at:

```text
http://127.0.0.1:8000/docs
```

Keep the backend terminal running.

---

## 3. Frontend Setup

Open a **second PowerShell terminal** and enter the frontend directory:

```powershell
cd frontend
```

### Install Dependencies

The first time the project is run:

```powershell
npm.cmd install
```

### Start the React Application

```powershell
npm.cmd run dev -- --host 127.0.0.1 --port 5173
```

The frontend will run at:

```text
http://127.0.0.1:5173
```

Keep both the frontend and backend terminals running while using CivicForecast.

---

# Application Architecture

CivicForecast uses a client-server architecture:

```text
┌──────────────────────┐
│        User          │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│    React Frontend    │
│   localhost:5173     │
└──────────┬───────────┘
           │
           │ HTTP / JSON
           ▼
┌──────────────────────┐
│   FastAPI Backend    │
│   localhost:8000     │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│  Application Logic   │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│   In-Memory Data     │
└──────────────────────┘
```

### React Frontend

The frontend is responsible for:

- Displaying markets
- Handling user interaction
- Submitting predictions
- Displaying portfolio information
- Displaying the leaderboard
- Displaying account information
- Communicating with FastAPI

### FastAPI Backend

The backend is responsible for:

- Providing REST API endpoints
- Validating incoming requests
- Managing markets
- Processing predictions
- Updating virtual balances
- Managing portfolio positions
- Returning JSON responses

---

# API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/` | Verify that the API is running |
| `GET` | `/markets` | Retrieve all markets |
| `GET` | `/markets/{market_id}` | Retrieve a specific market |
| `GET` | `/portfolio` | Retrieve balance and positions |
| `POST` | `/predict` | Place a virtual prediction |
| `POST` | `/funds` | Add virtual funds |

---

## GET `/`

Checks whether the CivicForecast API is running.

### Example Response

```json
{
  "message": "Civic Forecast API is running"
}
```

---

## GET `/markets`

Returns all available prediction markets.

Each market contains information such as:

- Market ID
- Title
- Question
- Candidate A
- Candidate A probability
- Candidate B
- Candidate B probability

---

## GET `/markets/{market_id}`

Returns a specific market using its ID.

Example:

```http
GET /markets/1
```

---

## GET `/portfolio`

Returns the current virtual balance and prediction positions.

### Example Response

```json
{
  "balance": 10000.0,
  "positions": []
}
```

---

## POST `/predict`

Places a prediction using virtual currency.

### Example Request

```json
{
  "market_id": 1,
  "candidate": "Candidate A",
  "amount": 500
}
```

Before accepting a prediction, the backend verifies that:

- The prediction amount is greater than zero
- The user has enough virtual currency
- The requested market exists
- The selected candidate belongs to that market

After a successful prediction:

1. A position is added to the portfolio.
2. The prediction amount is deducted from the available balance.
3. The updated information is returned to the frontend.

### Example

```text
Starting Balance:     $10,000
Prediction Amount:       -500
                       -------
Remaining Balance:     $9,500
```

---

## POST `/funds`

Adds additional **virtual currency** to the portfolio.

### Example Request

```json
{
  "amount": 1000
}
```

The amount must be greater than zero.

### Example

```text
Current Balance:       $9,500
Virtual Funds Added:  +$1,000
                       -------
New Balance:          $10,500
```

No real payment information is used.

---

# Portfolio

The portfolio tracks:

- Available virtual balance
- Number of positions
- Active markets
- Market associated with each prediction
- Selected candidate
- Amount predicted

The initial portfolio is:

```python
portfolio = {
    "balance": 10000.00,
    "positions": []
}
```

When a prediction is placed, the new position is stored and the amount is deducted from the balance.

---

# Leaderboard

The leaderboard provides a visual comparison of forecasters.

It displays:

- Rank
- Forecaster
- Number of predictions
- Virtual balance

The current proof of concept uses demonstration users for the leaderboard while the **You** row uses the current portfolio information.

---

# My Account

The **My Account** interface provides a summary of the user's CivicForecast account, including:

- Account status
- Available virtual balance
- Number of positions
- Number of markets
- Access to the portfolio
- Virtual fund management

CivicForecast does not currently use real-money payments.

---

# Automated Testing

Backend testing is performed using:

- Pytest
- FastAPI TestClient
- HTTPX

## Run the Tests

From the backend directory:

```powershell
cd backend
```

Run:

```powershell
.\venv\Scripts\python.exe -m pytest -v
```

---

## Test 1 — API Home Endpoint

```python
def test_home():
    response = client.get("/")

    assert response.status_code == 200
    assert response.json() == {
        "message": "Civic Forecast API is running"
    }
```

### Verifies

- The FastAPI application responds successfully
- The `/` endpoint returns HTTP status `200`
- The expected API message is returned

---

## Test 2 — Retrieve Markets

```python
def test_get_markets():
    response = client.get("/markets")

    assert response.status_code == 200

    markets = response.json()

    assert len(markets) == 3
    assert markets[0]["title"] == "Example Mayoral Election"
    assert markets[0]["candidateA"] == "Candidate A"
    assert markets[0]["candidateAProbability"] == 55
    assert markets[0]["candidateB"] == "Candidate B"
    assert markets[0]["candidateBProbability"] == 45
```

### Verifies

- `/markets` responds successfully
- Three markets are returned
- Market information is correct
- Candidate information is correct
- Probability information is correct

---

## Test 3 — Market Probabilities Equal 100%

```python
def test_market_probabilities_equal_100():
    response = client.get("/markets")

    assert response.status_code == 200

    markets = response.json()

    for market in markets:
        total = (
            market["candidateAProbability"]
            + market["candidateBProbability"]
        )

        assert total == 100
```

### Verifies

The two candidate probabilities for every market add up to `100%`.

---

## Test Results

The implemented backend tests were executed successfully:

```text
test_home PASSED
test_get_markets PASSED
test_market_probabilities_equal_100 PASSED

3 passed
```

**Result: 3/3 tests passed.**

---

# Manual Testing

The complete application can also be tested through the browser.

### Prediction Workflow

1. Start the FastAPI backend.
2. Start the React frontend.
3. Open CivicForecast.
4. Verify that all three markets appear.
5. Select **View Market**.
6. Choose a candidate.
7. Enter a virtual prediction amount.
8. Select **Place Prediction**.
9. Verify that the available balance decreases.
10. Open **Portfolio**.
11. Verify that the new position appears.

### Account Workflow

1. Open **My Account**.
2. Review the available virtual balance.
3. Add virtual funds.
4. Verify that the available balance increases.
5. Open the portfolio and verify the updated account information.

### Leaderboard Workflow

1. Open **Leaderboard**.
2. Verify that leaderboard entries appear.
3. Verify that the **You** row displays the current portfolio information.

---

# Current Data Storage

CivicForecast currently uses **in-memory Python data**.

This means portfolio information remains available while the backend process is running, but changes are reset when the backend process is restarted.

For example:

```python
portfolio = {
    "balance": 10000.00,
    "positions": []
}
```

A persistent database is not currently implemented.

---

# Current Limitations

CivicForecast is currently a proof of concept.

Current limitations include:

- In-memory data storage
- Data resets when the backend restarts
- No user authentication
- One shared portfolio
- Demo leaderboard users
- Fictional election markets
- No real-money transactions
- No persistent database

---

# Future Improvements

Potential future improvements include:

- PostgreSQL database integration
- Persistent portfolios
- User registration and authentication
- Multiple user accounts
- Dynamic leaderboard data
- Additional prediction markets
- Market creation
- Historical probability tracking
- External election data sources
- Additional automated tests
- Docker deployment
- Cloud deployment

