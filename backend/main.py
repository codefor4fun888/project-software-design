from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"message": "Civic Forecast API is running"}


@app.get("/markets")
def get_markets():
    return [
        {
            "id": 1,
            "title": "Example Mayoral Election",
            "question": "Who will win the election?",
            "candidateA": "Candidate A",
            "candidateAProbability": 55,
            "candidateB": "Candidate B",
            "candidateBProbability": 45
        },
        {
            "id": 2,
            "title": "Example Senate Election",
            "question": "Who will win the Senate election?",
            "candidateA": "Candidate C",
            "candidateAProbability": 62,
            "candidateB": "Candidate D",
            "candidateBProbability": 38
        },
        {
            "id": 3,
            "title": "Example Governor Election",
            "question": "Who will win the governor election?",
            "candidateA": "Candidate E",
            "candidateAProbability": 48,
            "candidateB": "Candidate F",
            "candidateBProbability": 52
        }
    ]