from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from ntscraper import Nitter
import uvicorn
from typing import List, Optional

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TweetRequest(BaseModel):
    username: str
    count: int = 10

class Tweet(BaseModel):
    text: str
    user: dict

class TweetResponse(BaseModel):
    tweets: List[Tweet]

@app.post("/api/scrape", response_model=TweetResponse)
async def scrape_tweets(request: TweetRequest):
    try:
        scraper = Nitter(log_level=1, skip_instance_check=False)
        tweets_data = scraper.get_tweets(request.username, mode='user', number=request.count)
        return {"tweets": tweets_data['tweets']}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)