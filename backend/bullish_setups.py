import yfinance as yf
import pandas as pd
import numpy as np
from typing import List, Dict, Any, Tuple

# Sample list of Top Indian stocks (using .NS for NSE)
NIFTY_STOCKS = [
    "RELIANCE.NS", "TCS.NS", "HDFCBANK.NS", "ICICIBANK.NS", "INFY.NS", 
    "SBIN.NS", "BHARTIARTL.NS", "ITC.NS", "HINDUNILVR.NS", "LT.NS",
    "BAJFINANCE.NS", "KOTAKBANK.NS", "HCLTECH.NS", "ASIANPAINT.NS", "AXISBANK.NS",
    "MARUTI.NS", "SUNPHARMA.NS", "TITAN.NS", "BAJAJFINSV.NS", "WIPRO.NS",
    "ULTRACEMCO.NS", "ONGC.NS", "NESTLEIND.NS", "JSWSTEEL.NS", "POWERGRID.NS",
    "TRENT.NS", "ADANIENT.NS", "ZOMATO.NS", "JIOFIN.NS", "TVSMOTOR.NS"
]

def calculate_ema(df: pd.DataFrame, period: int) -> pd.Series:
    return df['Close'].ewm(span=period, adjust=False).mean()

def is_bullish_candlestick(df: pd.DataFrame) -> Tuple[bool, str]:
    if len(df) < 5:
        return False, ""
    
    last = df.iloc[-1]
    prev = df.iloc[-2]
    prev2 = df.iloc[-3]
    
    # 1. Bullish Engulfing
    is_engulfing = (prev['Close'] < prev['Open'] and 
                    last['Close'] > last['Open'] and 
                    last['Open'] <= prev['Close'] and 
                    last['Close'] >= prev['Open'])
    if is_engulfing:
        return True, "Bullish Engulfing"
    
    # 2. Hammer
    body = abs(last['Close'] - last['Open'])
    lower_shadow = min(last['Open'], last['Close']) - last['Low']
    upper_shadow = last['High'] - max(last['Open'], last['Close'])
    is_hammer = (lower_shadow > 2 * body) and (upper_shadow < 0.5 * body)
    if is_hammer:
        return True, "Hammer"
    
    # 3. Morning Star
    is_morning_star = (prev2['Close'] < prev2['Open'] and 
                       abs(prev['Close'] - prev['Open']) < (prev2['Open'] - prev2['Close']) / 2 and
                       last['Close'] > last['Open'] and
                       last['Close'] > (prev2['Open'] + prev2['Close']) / 2)
    if is_morning_star:
        return True, "Morning Star"

    # 4. Bullish Piercing
    is_piercing = (prev['Close'] < prev['Open'] and
                   last['Open'] < prev['Low'] and
                   last['Close'] > (prev['Open'] + prev['Close']) / 2 and
                   last['Close'] < prev['Open'])
    if is_piercing:
        return True, "Bullish Piercing"

    # 5. Strong Green Candle
    if last['Close'] > last['Open'] and (last['Close'] - last['Open']) / (last['High'] - last['Low'] + 1e-6) > 0.7:
        return True, "Bullish Green Candle"

    return False, ""

def analyze_bullish_setup(symbol: str) -> Dict[str, Any]:
    try:
        ticker = yf.Ticker(symbol)
        
        # 1. TIDE (Monthly)
        df_monthly = ticker.history(period="2y", interval="1mo")
        if df_monthly.empty: return None
        df_monthly['EMA26'] = calculate_ema(df_monthly, 26)
        tide_uptrend = df_monthly['Close'].iloc[-1] > df_monthly['EMA26'].iloc[-1] or \
                       df_monthly['Close'].iloc[-1] > df_monthly['Close'].iloc[-2]
        
        if not tide_uptrend:
            return None # Tide must be bullish or flat-after-down (uptick)
            
        # 2. WAVE (Weekly)
        df_weekly = ticker.history(period="1y", interval="1wk")
        if df_weekly.empty: return None
        df_weekly['EMA5'] = calculate_ema(df_weekly, 5)
        df_weekly['EMA13'] = calculate_ema(df_weekly, 13)
        df_weekly['EMA26'] = calculate_ema(df_weekly, 26)
        
        wave_signal = df_weekly['EMA5'].iloc[-1] > df_weekly['EMA13'].iloc[-1] or \
                      df_weekly['EMA5'].iloc[-1] > df_weekly['EMA26'].iloc[-1]
        
        # 3. RIPPLE (Daily)
        df_daily = ticker.history(period="3mo", interval="1d")
        if df_daily.empty: return None
        
        is_bullish_candle, candle_type = is_bullish_candlestick(df_daily)
        
        # Volume Confirmation
        avg_vol = df_daily['Volume'].rolling(window=20).mean()
        high_volume = df_daily['Volume'].iloc[-1] > avg_vol.iloc[-1]
        
        # EMA Crossover (Ripple/Daily)
        df_daily['EMA5'] = calculate_ema(df_daily, 5)
        df_daily['EMA13'] = calculate_ema(df_daily, 13)
        df_daily['EMA26'] = calculate_ema(df_daily, 26)
        ema_crossover = df_daily['EMA5'].iloc[-1] > df_daily['EMA13'].iloc[-1]
        
        # Scoring
        score = 0
        if tide_uptrend: score += 1
        if wave_signal: score += 1
        if is_bullish_candle: score += 2
        if high_volume: score += 1
        if ema_crossover: score += 1

        if score >= 4: # Strong setup
            last_close = float(df_daily['Close'].iloc[-1])
            # Support/SL Calculation (Median of heavy volume candle or Low of pattern)
            support = float(df_daily['Low'].iloc[-3:].min())
            stop_loss = support * 0.99 # Slightly below support
            
            # Simple Target based on 3:1 RR
            risk = last_close - stop_loss
            target = last_close + (3 * risk)
            
            return {
                "symbol": symbol.replace(".NS", ""),
                "price": round(last_close, 2),
                "candle_type": candle_type,
                "score": score,
                "tide": "BULLISH",
                "wave": "BULLISH" if wave_signal else "NEUTRAL",
                "ripple": candle_type if is_bullish_candle else "EMA Cross",
                "volume_ratio": round(float(df_daily['Volume'].iloc[-1] / avg_vol.iloc[-1]), 2),
                "stop_loss": round(stop_loss, 2),
                "target": round(target, 2),
                "risk_reward": "3:1+",
                "date": str(df_daily.index[-1].date())
            }
            
    except Exception as e:
        print(f"Error analyzing {symbol}: {e}")
    return None

def scan_all_bullish_setups():
    results = []
    for symbol in NIFTY_STOCKS:
        setup = analyze_bullish_setup(symbol)
        if setup:
            results.append(setup)
    return results
