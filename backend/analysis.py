import yfinance as yf
import pandas as pd
import numpy as np

# Sample list of Top Indian stocks (using .NS for NSE)
NIFTY_STOCKS = [
    "RELIANCE.NS", "TCS.NS", "HDFCBANK.NS", "ICICIBANK.NS", "INFY.NS", 
    "SBIN.NS", "BHARTIARTL.NS", "ITC.NS", "HINDUNILVR.NS", "LT.NS",
    "BAJFINANCE.NS", "KOTAKBANK.NS", "HCLTECH.NS", "ASIANPAINT.NS", "AXISBANK.NS",
    "MARUTI.NS", "SUNPHARMA.NS", "TITAN.NS", "BAJAJFINSV.NS", "WIPRO.NS",
    "ULTRACEMCO.NS", "ONGC.NS", "NESTLEIND.NS", "JSWSTEEL.NS", "POWERGRID.NS",
    "TRENT.NS", "ADANIENT.NS", "ZOMATO.NS", "JIOFIN.NS", "TVSMOTOR.NS"
]

def check_flat_breakout(df: pd.DataFrame, consolidation_period=10, max_range_pct=0.05, volume_multiplier=1.2):
    """
    Checks if there's a flat breakout today based on the provided logic.
    """
    if len(df) < consolidation_period + 1:
        return False, {}
    
    # Exclude the last row to find the consolidation range properties
    history = df.iloc[-(consolidation_period+1):-1]
    last_day = df.iloc[-1]
    
    # 1. Check Consolidation (Flat Zone)
    highest_high = history['High'].max()
    lowest_low = history['Low'].min()
    
    range_pct = (highest_high - lowest_low) / lowest_low
    
    # 2. Relax flat constraint slightly for general daily data in demo
    if range_pct > max_range_pct:
        return False, {} 
    
    # 3. Detect Breakout
    avg_volume = history['Volume'].mean()
    
    is_breakout = last_day['Close'] > highest_high
    is_high_volume = last_day['Volume'] > (volume_multiplier * avg_volume)
    is_bullish = last_day['Close'] > last_day['Open']  # Green candle
    
    if is_breakout and is_high_volume and is_bullish:
        return True, {
            "close": round(float(last_day['Close']), 2),
            "volume": int(last_day['Volume']),
            "avg_volume": int(avg_volume),
            "range_pct": round(float(range_pct * 100), 2),
            "resistance": round(float(highest_high), 2),
            "date": str(last_day.name.date() if hasattr(last_day.name, 'date') else last_day.name)
        }
        
    return False, {}

def scan_breakouts():
    breakout_stocks = []
    
    for symbol in NIFTY_STOCKS:
        try:
            # Fetch last 3 months data to get daily bars
            ticker = yf.Ticker(symbol)
            df = ticker.history(period="3mo")
            
            if df.empty:
                continue
                
            # Using slightly relaxed parameters so things show up as demos (e.g. 5% range instead of strict 3%)
            is_breakout, details = check_flat_breakout(df, consolidation_period=10, max_range_pct=0.10, volume_multiplier=1.1)
            
            if is_breakout:
                details['symbol'] = symbol.replace('.NS', '')
                breakout_stocks.append(details)
                
        except Exception as e:
            print(f"Error analyzing {symbol}: {e}")
            
    return breakout_stocks
