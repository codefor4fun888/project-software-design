from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def test_home():
    response = client.get("/")

    assert response.status_code == 200
    assert response.json() == {
        "message": "Civic Forecast API is running"
    }


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