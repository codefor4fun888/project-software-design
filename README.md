# CivicForecast

CivicForecast is a browser-based political prediction market built as a software design proof of concept. Users can explore fictional election markets, view market probabilities, make predictions using virtual currency, and track their positions through a portfolio.

The application uses virtual currency only. No real money or real betting is involved.

## Features

- View active prediction markets
- View probabilities for each market outcome
- Make predictions using virtual currency
- Track available virtual balance
- View prediction positions in a portfolio
- Add virtual funds to an account
- View a leaderboard
- View account information
- Backend input validation
- REST API communication between the frontend and backend
- Automated backend testing with Pytest

## Technology Stack

### Frontend

- React
- JavaScript
- Vite
- CSS
- Fetch API

### Backend

- Python
- FastAPI
- Pydantic
- Uvicorn

### Testing

- Pytest
- FastAPI TestClient
- HTTPX

### Version Control

- Git
- GitHub

---

# Project Structure

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
How to Run CivicForecast
The frontend and backend must both be running at the same time.
1. Clone the Repository
git clone https://github.com/codefor4fun888/project-software-design.git

Enter the project:
cd project-software-design

Backend Setup
2. Enter the Backend Folder
On Windows PowerShell:
cd backend

3. Create a Python Virtual Environment
If a virtual environment has not already been created:
python -m venv venv

4. Install Backend Dependencies
.\venv\Scripts\python.exe -m pip install fastapi uvicorn pytest httpx

5. Start the FastAPI Backend
.\venv\Scripts\python.exe -m uvicorn main:app --reload

The backend should start at:
http://127.0.0.1:8000

Opening that address should return:
{
  "message": "Civic Forecast API is running"
}

FastAPI's interactive API documentation is available at:
http://127.0.0.1:8000/docs

Keep this terminal running while using CivicForecast.
Frontend Setup
6. Open a Second PowerShell Terminal
From the project root, enter the frontend directory:
cd frontend

7. Install Frontend Dependencies
The first time the project is run:
npm.cmd install

8. Start the React Frontend
npm.cmd run dev -- --host 127.0.0.1 --port 5173

The frontend should now be available at:
http://127.0.0.1:5173

Keep both the frontend and backend terminals running.
Application Flow
CivicForecast uses a client-server architecture:
User
  |
  v
React Frontend
  |
  | HTTP / JSON
  v
FastAPI Backend
  |
  v
Application Logic
  |
  v
In-Memory Data

React handles the user interface and sends HTTP requests to FastAPI.
FastAPI validates the requests, performs the application logic, updates the portfolio, and returns JSON responses to React.
API Endpoints
GET /
Checks whether the CivicForecast API is running.
Example response:
{
  "message": "Civic Forecast API is running"
}

GET /markets
Returns all available prediction markets.
GET /markets/{market_id}
Returns a specific prediction market using its ID.
Example:
GET /markets/1

GET /portfolio
Returns the current virtual balance and prediction positions.
Example:
{
  "balance": 10000.0,
  "positions": []
}

POST /predict
Places a virtual prediction.
Example request:
{
  "market_id": 1,
  "candidate": "Candidate A",
  "amount": 500
}

The backend validates that:
- The prediction amount is greater than zero
- The user has enough virtual currency
- The requested market exists
- The selected candidate belongs to the market
After a successful prediction, the position is added to the portfolio and the prediction amount is deducted from the available virtual balance.
POST /funds
Adds additional virtual currency to the portfolio.
Example request:
{
  "amount": 1000
}

The amount must be greater than zero.
If the current balance is $9,500 and the user adds $1,000, the new virtual balance becomes $10,500.
No real payment information is used.
Running the Automated Tests
The backend contains automated tests using Pytest and FastAPI's TestClient.
Enter the backend directory:
cd backend

Run:
.\venv\Scripts\python.exe -m pytest -v

Tests Completed
The current test suite contains three automated tests.
Test 1 - API Home Endpoint
def test_home():    response = client.get("/")    assert response.status_code == 200    assert response.json() == {        "message": "Civic Forecast API is running"    }


This verifies that:
- The FastAPI application is running
- The / endpoint returns HTTP status 200
- The expected API message is returned
Test 2 - Retrieve Markets
def test_get_markets():    response = client.get("/markets")    assert response.status_code == 200    markets = response.json()    assert len(markets) == 3    assert markets[0]["title"] == "Example Mayoral Election"    assert markets[0]["candidateA"] == "Candidate A"    assert markets[0]["candidateAProbability"] == 55    assert markets[0]["candidateB"] == "Candidate B"    assert markets[0]["candidateBProbability"] == 45


This verifies that:
- /markets responds successfully
- Three markets are returned
- Market information is returned correctly
- Candidate information is correct
- Probability information is correct
Test 3 - Market Probabilities
def test_market_probabilities_equal_100():    response = client.get("/markets")    assert response.status_code == 200    markets = response.json()    for market in markets:        total = (            market["candidateAProbability"]            + market["candidateBProbability"]        )        assert total == 100


This verifies that the two outcome probabilities for every market add up to 100%.
Test Results
The test suite was executed successfully.
test_home PASSED
test_get_markets PASSED
test_market_probabilities_equal_100 PASSED

3 passed

All three implemented backend tests passed.
Manual Testing
The application can also be tested manually through the following workflow:
1. Start the FastAPI backend.
2. Start the React frontend.
3. Open CivicForecast in the browser.
4. Verify that all three markets appear.
5. Select View Market.
6. Select a candidate.
7. Enter a prediction amount.
8. Select Place Prediction.
9. Verify that the virtual balance decreases.
10. Open Portfolio.
11. Verify that the new position appears.
12. Open Leaderboard.
13. Verify that the user's portfolio information is displayed.
14. Open My Account.
15. Add virtual funds.
16. Verify that the available virtual balance increases.
Current Data Storage
CivicForecast currently uses in-memory Python data for its proof of concept.
This means that market and portfolio information exists while the backend is running, but portfolio changes will reset when the backend process is restarted.
For example:
portfolio = {    "balance": 10000.00,    "positions": []}


A persistent database is not currently implemented.
Future Improvements
Potential future improvements include:
- PostgreSQL database integration
- Persistent portfolios
- User registration and authentication
- Multiple user accounts
- Dynamic leaderboard data
- Additional prediction markets
- Market creation
- Historical probability tracking
- External election data
- Additional automated tests
- Docker deployment
- Cloud deployment
Disclaimer
CivicForecast is an educational software project and proof of concept.
All current election markets and candidates are examples used to demonstrate the software.
The application uses virtual currency only and does not support real-money betting.

Then save it as:

```text
CivicForecast\README.md

Since you're pushing everything tonight, after saving it run from the project root:
git add README.md
git commit -m "Add project README with setup and testing instructions"
git push origin main

Then:
git status

You want to finish with:
nothing to commit, working tree clean
