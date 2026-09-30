from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(
    title="Civic Forecast API",
    description="Backend API for the Civic Forecast prediction market.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# -------------------------
# Fake in-memory data
# -------------------------

markets = [
    {
        "id": 1,
        "title": "Example Mayoral Election",
        "question": "Who will win the election?",
        "candidateA": "Candidate A",
        "candidateAProbability": 55,
        "candidateB": "Candidate B",
        "candidateBProbability": 45,
    },
    {
        "id": 2,
        "title": "Example Senate Election",
        "question": "Who will win the Senate election?",
        "candidateA": "Candidate C",
        "candidateAProbability": 62,
        "candidateB": "Candidate D",
        "candidateBProbability": 38,
    },
    {
        "id": 3,
        "title": "Example Governor Election",
        "question": "Who will win the governor election?",
        "candidateA": "Candidate E",
        "candidateAProbability": 48,
        "candidateB": "Candidate F",
        "candidateBProbability": 52,
    },
]

portfolio = {
    "balance": 10000.00,
    "positions": []
}


# -------------------------
# Request model
# -------------------------

class Prediction(BaseModel):
    market_id: int
    candidate: str
    amount: float


# -------------------------
# Routes
# -------------------------

@app.get("/")
def home():
    return {
        "message": "Civic Forecast API is running"
    }


@app.get("/markets")
def get_markets():
    return markets


@app.get("/markets/{market_id}")
def get_market(market_id: int):

    for market in markets:
        if market["id"] == market_id:
            return market

    raise HTTPException(
        status_code=404,
        detail="Market not found"
    )


@app.get("/portfolio")
def get_portfolio():
    return portfolio


@app.post("/predict")
def make_prediction(prediction: Prediction):

    if prediction.amount <= 0:
        raise HTTPException(
            status_code=400,
            detail="Prediction amount must be greater than zero"
        )

    if prediction.amount > portfolio["balance"]:
        raise HTTPException(
            status_code=400,
            detail="Not enough virtual currency"
        )

    market = None

    for item in markets:
        if item["id"] == prediction.market_id:
            market = item
            break

    if market is None:
        raise HTTPException(
            status_code=404,
            detail="Market not found"
        )

    valid_candidates = [
        market["candidateA"],
        market["candidateB"]
    ]

    if prediction.candidate not in valid_candidates:
        raise HTTPException(
            status_code=400,
            detail="Invalid candidate"
        )

    position = {
        "market_id": prediction.market_id,
        "market_title": market["title"],
        "candidate": prediction.candidate,
        "amount": prediction.amount,
    }

    portfolio["positions"].append(position)

    portfolio["balance"] -= prediction.amount

    return {
        "message": "Prediction placed successfully",
        "position": position,
        "balance": portfolio["balance"],
    }