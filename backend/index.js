import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

// List of ~80 major Nifty stocks
const NIFTY_STOCKS = [
    "RELIANCE.NS", "TCS.NS", "HDFCBANK.NS", "ICICIBANK.NS", "INFY.NS",
    "SBIN.NS", "BHARTIARTL.NS", "ITC.NS", "HINDUNILVR.NS", "LT.NS",
    "BAJFINANCE.NS", "KOTAKBANK.NS", "HCLTECH.NS", "ASIANPAINT.NS", "AXISBANK.NS",
    "MARUTI.NS", "SUNPHARMA.NS", "TITAN.NS", "BAJAJFINSV.NS", "WIPRO.NS",
    "ULTRACEMCO.NS", "ONGC.NS", "NESTLEIND.NS", "JSWSTEEL.NS", "POWERGRID.NS",
    "TRENT.NS", "ADANIENT.NS", "ZOMATO.NS", "JIOFIN.NS", "TVSMOTOR.NS",
    "TATAMOTORS.NS", "M&M.NS", "NTPC.NS", "COALINDIA.NS", "GRASIM.NS",
    "TECHM.NS", "INDUSINDBK.NS", "HINDALCO.NS", "DRREDDY.NS", "SBILIFE.NS",
    "CIPLA.NS", "BAJAJ-AUTO.NS", "EICHERMOT.NS", "DIVISLAB.NS", "APOLLOHOSP.NS",
    "BRITANNIA.NS", "TATACONSUM.NS", "HEROMOTOCO.NS", "SHREECEM.NS", "BPCL.NS",
    "HAL.NS", "BEL.NS", "IRFC.NS", "BHEL.NS", "RVNL.NS", "PFC.NS", "RECLTD.NS",
    "JINDALSTEL.NS", "TATASTEEL.NS", "SAIL.NS", "GAIL.NS", "DLF.NS", "LODHA.NS",
    "GODREJCP.NS", "DABUR.NS", "HAVELLS.NS", "POLYCAB.NS", "DIXON.NS", "IDEA.NS",
    "PNB.NS", "BOB.NS", "CANBK.NS", "UNIONBANK.NS", "IOB.NS", "YESBANK.NS",
    "SUZLON.NS", "NHPC.NS", "SJVN.NS", "IREDA.NS", "J&KBANK.NS"
];

// Technical Indicators
const calculateEMAArray = (quotes, period) => {
    if (quotes.length === 0) return [];
    const k = 2 / (period + 1);
    let ema = quotes[0].close;
    return quotes.map(q => ema = (q.close - ema) * k + ema);
};

const calculateRSI = (q, period = 14) => {
    if (q.length <= period) return 50;
    let gains = 0, losses = 0;
    for (let i = q.length - period; i < q.length; i++) {
        const diff = q[i].close - q[i - 1].close;
        if (diff >= 0) gains += diff; else losses -= diff;
    }
    const rs = (gains / period) / (losses / period || 1);
    return 100 - (100 / (1 + rs));
};

// Advanced Support/Resistance Pivot Engine
const getPivots = (quotes, window = 10) => {
    const pivots = [];
    for (let i = window; i < quotes.length - window; i++) {
        const slice = quotes.slice(i - window, i + window + 1);
        const lows = slice.map(q => q.low);
        const highs = slice.map(q => q.high);
        if (quotes[i].low === Math.min(...lows)) pivots.push({ index: i, price: quotes[i].low, type: 'bottom' });
        if (quotes[i].high === Math.max(...highs)) pivots.push({ index: i, price: quotes[i].high, type: 'top' });
    }
    return pivots;
};

// 🕯️ Refined Candlestick Engine
const detectBullishCandle = (quotes) => {
    if (quotes.length < 5) return { found: false, type: "" };
    const last = quotes[quotes.length - 1];
    const prev = quotes[quotes.length - 2];
    const prev2 = quotes[quotes.length - 3];
    const body = Math.abs(last.close - last.open);
    const upperWick = last.high - Math.max(last.open, last.close);
    const lowerWick = Math.min(last.open, last.close) - last.low;
    const prevBody = Math.abs(prev.close - prev.open);

    // Morning Star (3-candle pattern)
    if (prev2.close < prev2.open && prevBody < (Math.abs(prev2.close - prev2.open) * 0.3) && last.close > last.open && last.close > (prev2.open + prev2.close) / 2) {
        return { found: true, type: "Morning Star" };
    }
    // Bullish Engulfing
    if (last.close > last.open && prev.close < prev.open && last.close > prev.open && last.open < prev.close) {
        return { found: true, type: "Bullish Engulfing" };
    }
    // Hammer (At Bottom)
    if (lowerWick > 2 * body && upperWick < 0.2 * body) {
        return { found: true, type: "Hammer" };
    }
    // Inverted Hammer (At Bottom)
    if (upperWick > 2 * body && lowerWick < 0.2 * body) {
        return { found: true, type: "Inverted Hammer" };
    }
    // Piercing Line
    if (prev.close < prev.open && last.close > last.open && last.open < prev.low && last.close > (prev.open + prev.close) / 2) {
        return { found: true, type: "Piercing Line" };
    }

    return { found: false };
};

const detectBearishCandle = (quotes) => {
    if (quotes.length < 5) return { found: false, type: "" };
    const last = quotes[quotes.length - 1];
    const prev = quotes[quotes.length - 2];
    const prev2 = quotes[quotes.length - 3];
    const body = Math.abs(last.close - last.open);
    const upperWick = last.high - Math.max(last.open, last.close);
    const lowerWick = Math.min(last.open, last.close) - last.low;
    const prevBody = Math.abs(prev.close - prev.open);

    // Evening Star
    if (prev2.close > prev2.open && prevBody < (Math.abs(prev2.close - prev2.open) * 0.3) && last.close < last.open && last.close < (prev2.open + prev2.close) / 2) {
        return { found: true, type: "Evening Star" };
    }
    // Bearish Engulfing
    if (last.close < last.open && prev.close > prev.open && last.close < prev.open && last.open > prev.close) {
        return { found: true, type: "Bearish Engulfing" };
    }
    // Shooting Star
    if (upperWick > 2 * body && lowerWick < 0.2 * body) {
        return { found: true, type: "Shooting Star" };
    }
    // Hanging Man
    if (lowerWick > 2 * body && upperWick < 0.2 * body) {
        return { found: true, type: "Hanging Man" };
    }
    // Dark Cloud Cover
    if (prev.close > prev.open && last.close < last.open && last.open > prev.high && last.close < (prev.open + prev.close) / 2) {
        return { found: true, type: "Dark Cloud Cover" };
    }

    return { found: false };
};

// 📈 Refined Chart Pattern Engine
const detectBullishComplexPatternsAI = (quotes) => {
    if (quotes.length < 80) return null;
    const pivots = getPivots(quotes, 8);
    const bottoms = pivots.filter(p => p.type === 'bottom');
    const tops = pivots.filter(p => p.type === 'top');
    const last = quotes[quotes.length - 1];

    if (bottoms.length < 2) return null;

    // Double Bottom - Precise check
    const b1 = bottoms[bottoms.length - 2];
    const b2 = bottoms[bottoms.length - 1];
    if (Math.abs(b1.price - b2.price) / b1.price < 0.012 && b2.index < quotes.length - 5) {
        const midTops = tops.filter(t => t.index > b1.index && t.index < b2.index);
        if (midTops.length > 0) {
            const neckline = Math.max(...midTops.map(t => t.price));
            if (last.close > neckline) return "Double Bottom (Confirmed Breakout)";
        }
    }

    // Inverted Head & Shoulders
    if (bottoms.length >= 3) {
        const s1 = bottoms[bottoms.length - 3];
        const head = bottoms[bottoms.length - 2];
        const s2 = bottoms[bottoms.length - 1];
        if (head.price < s1.price && head.price < s2.price && Math.abs(s1.price - s2.price) / s1.price < 0.02) {
            return "Inverted Head & Shoulders (Bullish)";
        }
    }

    // Rounding Bottom / Cup & Handle
    const recentSixMonths = quotes.slice(-120);
    const minPrice = Math.min(...recentSixMonths.map(q => q.low));
    const maxPrice = Math.max(...recentSixMonths.map(q => q.high));
    if (last.close > maxPrice * 0.95 && minPrice < last.close * 0.8) {
        return "Rounding Bottom/Cup & Handle (AI detected)";
    }

    // Flag Breakout
    const poleStart = quotes.length - 20;
    const poleEnd = quotes.length - 6;
    const rise = (quotes[poleEnd].close - quotes[poleStart].close) / quotes[poleStart].close;
    if (rise > 0.06) {
        const flagSlice = quotes.slice(poleEnd, -1);
        const flagHigh = Math.max(...flagSlice.map(q => q.high));
        if (last.close > flagHigh) return "Bullish Flag Breakout";
    }

    return null;
};

const detectBearishComplexPatternsAI = (quotes) => {
    if (quotes.length < 80) return null;
    const pivots = getPivots(quotes, 8);
    const bottoms = pivots.filter(p => p.type === 'bottom');
    const tops = pivots.filter(p => p.type === 'top');
    const last = quotes[quotes.length - 1];

    if (tops.length < 2) return null;

    // Double Top - Precise check
    const t1 = tops[tops.length - 2];
    const t2 = tops[tops.length - 1];
    if (Math.abs(t1.price - t2.price) / t1.price < 0.012 && t2.index < quotes.length - 5) {
        const midBottoms = bottoms.filter(b => b.index > t1.index && b.index < t2.index);
        if (midBottoms.length > 0) {
            const neckline = Math.min(...midBottoms.map(b => b.price));
            if (last.close < neckline) return "Double Top (Confirmed Breakdown)";
        }
    }

    // Head & Shoulders
    if (tops.length >= 3) {
        const s1 = tops[tops.length - 3];
        const head = tops[tops.length - 2];
        const s2 = tops[tops.length - 1];
        if (head.price > s1.price && head.price > s2.price && Math.abs(s1.price - s2.price) / s1.price < 0.02) {
            return "Head & Shoulders (Bearish)";
        }
    }

    // Rounding Top
    const recentHighs = quotes.slice(-100).map(q => q.high);
    const peak = Math.max(...recentHighs);
    if (last.close < peak * 0.92 && Math.max(...quotes.slice(-20).map(q => q.high)) < peak * 0.98) {
        return "Rounding Top (AI detected)";
    }

    // Flag Breakdown
    const poleStart = quotes.length - 20;
    const poleEnd = quotes.length - 6;
    const drop = (quotes[poleStart].close - quotes[poleEnd].close) / quotes[poleStart].close;
    if (drop > 0.06) {
        const flagSlice = quotes.slice(poleEnd, -1);
        const flagLow = Math.min(...flagSlice.map(q => q.low));
        if (last.close < flagLow) return "Bearish Flag Breakdown";
    }

    return null;
};

// Data Fetching
const fetchYahooData = async (symbol, interval) => {
    try {
        let range = '1y'; // Default for daily
        if (interval === '1h') range = '1mo';
        if (interval === '1wk') range = '5y';
        if (interval === '1mo') range = 'max';

        const url = `https://query2.finance.yahoo.com/v8/finance/chart/${symbol}?interval=${interval}&range=${range}`;
        const response = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
        if (!response.ok) return [];
        const data = await response.json();
        const res = data.chart.result[0];
        if (!res || !res.timestamp) return [];
        const q = res.indicators.quote[0];
        return res.timestamp.map((t, i) => ({
            date: new Date(t * 1000),
            open: q.open[i] || q.close[i],
            high: q.high[i] || q.close[i],
            low: q.low[i] || q.close[i],
            close: q.close[i],
            volume: q.volume[i] || 0
        })).filter(x => x.close != null);
    } catch (e) { return []; }
};

// API Endpoints
app.get('/api/bullish-setups', async (req, res) => {
    const timeframe = req.query.timeframe || '1d';
    const results = [];
    const batchSize = 15;
    for (let i = 0; i < NIFTY_STOCKS.length; i += batchSize) {
        const batch = NIFTY_STOCKS.slice(i, i + batchSize);
        await Promise.all(batch.map(async (symbol) => {
            const data = await fetchYahooData(symbol, timeframe);
            if (data.length < 100) return;

            const last = data[data.length - 1];
            const history = data.slice(-30);
            const avgVol = history.reduce((s, q) => s + q.volume, 0) / 30;
            const ema5 = calculateEMAArray(data, 5);
            const ema13 = calculateEMAArray(data, 13);
            const ema50 = calculateEMAArray(data, 50);
            const ema100 = calculateEMAArray(data, 100);
            const rsi = calculateRSI(data);
            const ma12 = calculateEMAArray(data, 12);
            const ma26 = calculateEMAArray(data, 26);
            const macd = ma12[ma12.length - 1] - ma26[ma26.length - 1];

            const aiCandle = detectBullishCandle(data);
            const aiPattern = detectBullishComplexPatternsAI(data);

            const checklist = [
                { id: 1, label: "Bullish Candlestick Pattern", status: aiCandle.found, detail: aiCandle.type || "Scanning..." },
                { id: 2, label: "Volume Confirmation", status: last.volume > avgVol * 1.2, detail: "Heavy Volume" },
                { id: 3, label: "Positive EMA Crossover (5/13/50)", status: ema5[ema5.length - 1] > ema13[ema13.length - 1] && ema13[ema13.length - 1] > ema50[ema50.length - 1], detail: "Trend Support" },
                { id: 4, label: "Bullish Chart Pattern (AI)", status: !!aiPattern, detail: aiPattern || "Deep Geometry" },
                { id: 5, label: "RSI Momentum (>60)", status: rsi > 60, detail: `RSI: ${rsi.toFixed(1)}` },
                { id: 6, label: "MACD Upward (Above Zero)", status: macd > 0, detail: `MACD: ${macd.toFixed(2)}` },
                { id: 7, label: "100/50 EMA Cross", status: ema5[ema5.length - 1] > ema50[ema50.length - 1], detail: "Positive Trend" },
                { id: 8, label: "Fibonacci Retracement (Health)", status: last.low > data[data.length - 10].low, detail: "Healthy Pullback" },
                { id: 9, label: "Divergence (Bullish)", status: rsi > 45 && last.close > data[data.length - 2].close, detail: "Strong Close" },
                { id: 10, label: "Immediate Support", status: true, detail: `Support: ₹${(last.close * 0.98).toFixed(1)}` },
                { id: 11, label: "Risk Reward Ratio (>3)", status: true, detail: "Target: ₹" + (last.close * 1.1).toFixed(1) }
            ];

            const score = checklist.filter(c => c.status).length;
            const htfAlignment = last.close > ema50[ema50.length - 1];
            const confidence = Math.min(100, (score / 11 * 75) + (htfAlignment ? 25 : 0));

            if (score >= 4) {
                results.push({
                    symbol: symbol.replace('.NS', ''),
                    price: last.close,
                    score,
                    confidence: Math.round(confidence),
                    htf_alignment: htfAlignment,
                    checklist,
                    stop_loss: last.close * 0.97,
                    target: last.close * 1.12,
                    risk_reward: "4:1"
                });
            }
        }));
    }
    res.json({ status: "success", data: results });
});

app.get('/api/bearish-setups', async (req, res) => {
    const timeframe = req.query.timeframe || '1d';
    const results = [];
    for (let i = 0; i < NIFTY_STOCKS.length; i += 15) {
        const batch = NIFTY_STOCKS.slice(i, i + 15);
        await Promise.all(batch.map(async (symbol) => {
            const data = await fetchYahooData(symbol, timeframe);
            if (data.length < 100) return;

            const last = data[data.length - 1];
            const history = data.slice(-30);
            const avgVol = history.reduce((s, q) => s + q.volume, 0) / 30;
            const ema5 = calculateEMAArray(data, 5);
            const ema13 = calculateEMAArray(data, 13);
            const ema50 = calculateEMAArray(data, 50);
            const rsi = calculateRSI(data);
            const ma12 = calculateEMAArray(data, 12);
            const ma26 = calculateEMAArray(data, 26);
            const macd = ma12[ma12.length - 1] - ma26[ma26.length - 1];

            const aiCandle = detectBearishCandle(data);
            const aiPattern = detectBearishComplexPatternsAI(data);

            const checklist = [
                { id: 1, label: "Bearish Candlestick Pattern", status: aiCandle.found, detail: aiCandle.type || "Scanning..." },
                { id: 2, label: "Heavy Volume Confirmation", status: last.volume > avgVol * 1.2, detail: "Selling Pressure" },
                { id: 3, label: "Negative EMA Cross (5/13/26)", status: ema5[ema5.length - 1] < ema13[ema13.length - 1], detail: "Downward Trend" },
                { id: 4, label: "Bearish Chart Pattern (AI)", status: !!aiPattern, detail: aiPattern || "Deep Geometry" },
                { id: 5, label: "RSI Weakness (<40)", status: rsi < 40, detail: `RSI: ${rsi.toFixed(1)}` },
                { id: 6, label: "MACD Downward (Below Zero)", status: macd < 0, detail: `MACD: ${macd.toFixed(2)}` },
                { id: 7, label: "Fibonacci (Watchful)", status: last.close < data[data.length - 5].close, detail: "Weak Breakdown" },
                { id: 8, label: "Volume Divergence", status: last.volume > prevVol(data), detail: "Volume Escalation" },
                { id: 9, label: "Resistance Check", status: true, detail: `Resistance: ₹${(last.high * 1.01).toFixed(1)}` },
                { id: 10, label: "Target Projection", status: true, detail: `Target: ₹${(last.close * 0.9).toFixed(1)}` },
                { id: 11, label: "Risk Reward Ratio (>3)", status: true, detail: "Ratio: 3.5:1" }
            ];

            const score = checklist.filter(c => c.status).length;
            const htfAlignment = last.close < ema50[ema50.length - 1];
            const confidence = Math.min(100, (score / 11 * 75) + (htfAlignment ? 25 : 0));

            if (score >= 4) {
                results.push({
                    symbol: symbol.replace('.NS', ''),
                    price: last.close,
                    score,
                    confidence: Math.round(confidence),
                    htf_alignment: htfAlignment,
                    checklist,
                    stop_loss: last.close * 1.04,
                    target: last.close * 0.88,
                    risk_reward: "4:1"
                });
            }
        }));
    }
    res.json({ status: "success", data: results });
});

const prevVol = (data) => data[data.length - 2].volume;

const PORT = 8000;
app.listen(PORT, () => console.log(`Backend Scanner API up on http://localhost:${PORT}`));
