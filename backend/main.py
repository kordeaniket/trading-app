from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from analysis import scan_breakouts
from bullish_setups import scan_all_bullish_setups

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/scan")
async def scan():
    breakouts = scan_breakouts()
    return {"status": "success", "data": breakouts}

@app.get("/api/bullish-setups")
async def bullish_setups():
    setups = scan_all_bullish_setups()
    return {"status": "success", "data": setups}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
