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
