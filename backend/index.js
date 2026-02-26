import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

// List of ~80 major Nifty stocks for reasonable scan times over API
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

const getPatternStats = (lastDay, avgVolume) => ({
    close: parseFloat(lastDay.close.toFixed(2)),
    volume: parseInt(lastDay.volume),
    avg_volume: parseInt(avgVolume),
    date: new Date(lastDay.date).toISOString().split('T')[0]
});

const checkFlatBreakout = (quotes, volumeMultiplier) => {
    const history = quotes.slice(-15, -1);
    const lastDay = quotes[quotes.length - 1];

    const highestHigh = Math.max(...history.map(q => q.high));
    const lowestLow = Math.min(...history.map(q => q.low));
    const rangePct = (highestHigh - lowestLow) / lowestLow;

    if (rangePct > 0.15) return false; // Relaxed from 0.08 to 0.15

    const avgVolume = history.reduce((sum, q) => sum + q.volume, 0) / history.length;
    // Breakout meaning closing very near or above resistance with decent volume and green candle
    const isBreakout = lastDay.close >= highestHigh * 0.98 && lastDay.volume >= (volumeMultiplier * avgVolume * 0.8) && lastDay.close >= lastDay.open;
    const isBreakdown = lastDay.close <= lowestLow * 1.02 && lastDay.close <= lastDay.open;

    if (isBreakout) return { ...getPatternStats(lastDay, avgVolume), type: 'FLAT_BREAKOUT', resistance: parseFloat(highestHigh.toFixed(2)), range_pct: parseFloat((rangePct * 100).toFixed(2)) };
    if (isBreakdown) return { ...getPatternStats(lastDay, avgVolume), type: 'FLAT_BREAKDOWN', resistance: parseFloat(lowestLow.toFixed(2)), range_pct: parseFloat((rangePct * 100).toFixed(2)) };
    return false;
};

const checkDoubleTopBottomBreakout = (quotes, volumeMultiplier) => {
    const history = quotes.slice(-30, -1);
    const lastDay = quotes[quotes.length - 1];

    let highestHigh = 0;
    let lowestLow = Infinity;
    history.forEach(q => {
        if (q.high > highestHigh) highestHigh = q.high;
        if (q.low < lowestLow) lowestLow = q.low;
    });

    let topPeaks = 0;
    let bottomPeaks = 0;
    const topThreshold = highestHigh * 0.98; // within 2%
    const bottomThreshold = lowestLow * 1.02;

    history.forEach((q, i) => {
        if (i > 0 && i < history.length - 1) {
            if (q.high >= topThreshold && q.high > history[i - 1].high && q.high > history[i + 1].high) topPeaks++;
            if (q.low <= bottomThreshold && q.low < history[i - 1].low && q.low < history[i + 1].low) bottomPeaks++;
        }
    });

    const avgVolume = history.reduce((sum, q) => sum + q.volume, 0) / history.length;

    const isTopBreakout = topPeaks >= 1 && lastDay.close >= highestHigh * 0.99 && lastDay.close >= lastDay.open;
    const isBottomBreakdown = bottomPeaks >= 1 && lastDay.close <= lowestLow * 1.01 && lastDay.close <= lastDay.open;

    if (isTopBreakout) return { ...getPatternStats(lastDay, avgVolume), type: 'DOUBLE_TOP_BREAKOUT', resistance: parseFloat(highestHigh.toFixed(2)) };
    if (isBottomBreakdown) return { ...getPatternStats(lastDay, avgVolume), type: 'DOUBLE_BOTTOM_BREAKDOWN', resistance: parseFloat(lowestLow.toFixed(2)) };
    return false;
};

const checkFlagAndPole = (quotes, volumeMultiplier) => {
    if (quotes.length < 20) return false;
    const poleStart = quotes[quotes.length - 15];
    const poleEnd = quotes[quotes.length - 6];
    const poleUpClimb = (poleEnd.high - poleStart.low) / poleStart.low;
    const poleDownClimb = (poleStart.high - poleEnd.low) / poleStart.high;

    const flagHistory = quotes.slice(-5, -1);
    const flagHigh = Math.max(...flagHistory.map(q => q.high));
    const flagLow = Math.min(...flagHistory.map(q => q.low));

    const lastDay = quotes[quotes.length - 1];
    const avgVolume = flagHistory.reduce((sum, q) => sum + q.volume, 0) / flagHistory.length;

    if (poleUpClimb >= 0.05) { // Bullish flag
        if (lastDay.close >= flagHigh * 0.99 && lastDay.close >= lastDay.open) {
            return { ...getPatternStats(lastDay, avgVolume), type: 'FLAG_POLE_BREAKOUT', resistance: parseFloat(flagHigh.toFixed(2)) };
        }
    }

    if (poleDownClimb >= 0.05) { // Bearish pennant
        if (lastDay.close <= flagLow * 1.01 && lastDay.close <= lastDay.open) {
            return { ...getPatternStats(lastDay, avgVolume), type: 'FLAG_POLE_BREAKDOWN', resistance: parseFloat(flagLow.toFixed(2)) };
        }
    }
    return false;
};

const checkFakeBreakout = (quotes) => {
    const history = quotes.slice(-20, -1);
    const lastDay = quotes[quotes.length - 1];
    const prevDay = history[history.length - 1];

    const earlierHistory = history.slice(0, -1); // Exclude prevDay
    const resistance = Math.max(...earlierHistory.map(q => q.high));

    // Previous day broke out
    const prevBrokeOut = prevDay.close > resistance && prevDay.close > prevDay.open;

    // Today sharply fell back below resistance with red candle
    const todayFake = lastDay.close < resistance && lastDay.close < lastDay.open;

    if (prevBrokeOut && todayFake) {
        const avgVolume = history.reduce((sum, q) => sum + q.volume, 0) / history.length;
        return { ...getPatternStats(lastDay, avgVolume), type: 'FAKE_BREAKOUT_DOWN', resistance: parseFloat(resistance.toFixed(2)) };
    }
    return false;
};

const checkEqualHighsLows = (quotes) => {
    const history = quotes.slice(-25, -1);
    const lastDay = quotes[quotes.length - 1];
    const avgVolume = history.reduce((sum, q) => sum + q.volume, 0) / history.length;

    // Find local peak in history (not just max, but a clear peak)
    const prevHighs = history.map(q => q.high);
    const prevLows = history.map(q => q.low);

    const maxPrevHigh = Math.max(...prevHighs);
    const minPrevLow = Math.min(...prevLows);

    // Equal High Detection (Potential Bearish Reversal)
    // Within 0.15% threshold
    const isEqualHigh = Math.abs(lastDay.high - maxPrevHigh) / maxPrevHigh <= 0.0015;
    const isRedCandle = lastDay.close < lastDay.open;

    if (isEqualHigh && isRedCandle) {
        return {
            ...getPatternStats(lastDay, avgVolume),
            type: 'BEARISH_REVERSAL',
            resistance: parseFloat(maxPrevHigh.toFixed(2)),
            message: 'Equal Highs Detected (Potential Bearish Reversal)'
        };
    }

    // Equal Low Detection (Potential Bullish Reversal)
    const isEqualLow = Math.abs(lastDay.low - minPrevLow) / minPrevLow <= 0.0015;
    const isGreenCandle = lastDay.close > lastDay.open;

    if (isEqualLow && isGreenCandle) {
        return {
            ...getPatternStats(lastDay, avgVolume),
            type: 'BULLISH_REVERSAL',
            resistance: parseFloat(minPrevLow.toFixed(2)),
            message: 'Equal Lows Detected (Potential Bullish Reversal)'
        };
    }

    return false;
};

const analyzeStock = (quotes, targetCategory) => {
    if (quotes.length < 35) return [];

    let findings = [];
    const volumeMultiplier = 1.0;

    const flat = checkFlatBreakout(quotes, volumeMultiplier);
    if (flat) findings.push(flat);

    const double = checkDoubleTopBottomBreakout(quotes, volumeMultiplier);
    if (double) findings.push(double);

    const flagPole = checkFlagAndPole(quotes, volumeMultiplier);
    if (flagPole) findings.push(flagPole);

    const fake = checkFakeBreakout(quotes);
    if (fake) findings.push(fake);

    const reversal = checkEqualHighsLows(quotes);
    if (reversal) findings.push(reversal);

    if (targetCategory && targetCategory !== 'ALL') {
        findings = findings.filter(f => f.type === targetCategory);
    }

    return findings;
};

const fetchYahooData = async (symbol, interval, timeframe) => {
    let range = '6mo';
    if (interval === '15m' || interval === '1h') range = '1mo';
    if (interval === '1mo') range = '5y';
    if (interval === '1wk') range = '2y';

    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=${interval}&range=${range}`;
    const response = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();

    if (!data.chart || !data.chart.result || !data.chart.result[0]) return [];

    const result = data.chart.result[0];
    const timestamps = result.timestamp;
    const quotes = result.indicators.quote[0];

    if (!timestamps || !quotes) return [];

    const formatted = [];
    for (let i = 0; i < timestamps.length; i++) {
        if (quotes.close[i] !== null && quotes.volume[i] !== null) {
            formatted.push({
                date: new Date(timestamps[i] * 1000),
                open: quotes.open[i],
                high: quotes.high[i],
                low: quotes.low[i],
                close: quotes.close[i],
                volume: quotes.volume[i]
            });
        }
    }
    return formatted;
};

const scanBreakouts = async (timeframe, category) => {
    const breakoutStocks = [];

    const batchSize = 10;
    for (let i = 0; i < NIFTY_STOCKS.length; i += batchSize) {
        const batch = NIFTY_STOCKS.slice(i, i + batchSize);
        const promises = batch.map(async (symbol) => {
            try {
                const interval = timeframe === '1d' ? '1d' : timeframe;
                const result = await fetchYahooData(symbol, interval, timeframe);

                if (result && result.length > 0) {
                    const findings = analyzeStock(result, category);
                    findings.forEach(f => {
                        breakoutStocks.push({ symbol: symbol.replace('.NS', ''), ...f });
                    });
                }
            } catch (e) {
                console.error(`Error for ${symbol}:`, e.message);
            }
        });
        await Promise.all(promises);
    }

    return breakoutStocks;
};

app.get('/api/scan', async (req, res) => {
    try {
        const timeframe = req.query.timeframe || '1d';
        const category = req.query.category || 'ALL';
        console.log(`Scanning: Timeframe=${timeframe}, Category=${category}`);

        const breakouts = await scanBreakouts(timeframe, category);
        res.json({ status: "success", data: breakouts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", message: error.message });
    }
});

const checkHeikinAshiSetup = (quotes) => {
    if (quotes.length < 50) return false;

    // Calculate EMA(20)
    const k = 2 / (20 + 1);
    let ema = quotes[0].close;
    const emaArray = [ema];
    for (let i = 1; i < quotes.length; i++) {
        ema = (quotes[i].close - ema) * k + ema;
        emaArray.push(ema);
    }

    // Calculate RSI(14)
    let gains = 0, losses = 0;
    const period = 14;
    for (let i = 1; i <= period; i++) {
        const diff = quotes[i].close - quotes[i - 1].close;
        if (diff > 0) gains += diff; else losses -= diff;
    }
    let avgGain = gains / period;
    let avgLoss = losses / period;
    let rsiArray = new Array(period).fill(50);
    const firstRs = avgLoss === 0 ? 100 : avgGain / avgLoss;
    rsiArray.push(100 - (100 / (1 + firstRs)));

    for (let i = period + 1; i < quotes.length; i++) {
        const diff = quotes[i].close - quotes[i - 1].close;
        const gain = diff > 0 ? diff : 0;
        const loss = diff < 0 ? -diff : 0;
        avgGain = (avgGain * (period - 1) + gain) / period;
        avgLoss = (avgLoss * (period - 1) + loss) / period;
        const rs = avgGain / avgLoss;
        rsiArray.push(avgLoss === 0 ? 100 : 100 - (100 / (1 + rs)));
    }

    // Calculate Heikin-Ashi
    const ha = [];
    ha.push({
        open: (quotes[0].open + quotes[0].close) / 2,
        high: quotes[0].high,
        low: quotes[0].low,
        close: (quotes[0].open + quotes[0].high + quotes[0].low + quotes[0].close) / 4
    });
    for (let i = 1; i < quotes.length; i++) {
        const prev = ha[i - 1];
        const close = (quotes[i].open + quotes[i].high + quotes[i].low + quotes[i].close) / 4;
        const open = (prev.open + prev.close) / 2;
        const high = Math.max(quotes[i].high, open, close);
        const low = Math.min(quotes[i].low, open, close);
        ha.push({ open, high, low, close });
    }

    const lastIdx = quotes.length - 1;
    const prevIdx = quotes.length - 2;

    // Current setup
    const currentHA = ha[lastIdx];
    const prevHA = ha[prevIdx];

    const currentEMA = emaArray[lastIdx];
    const prevEMA = emaArray[prevIdx];

    const currentRSI = rsiArray[lastIdx];
    const originalQuote = quotes[lastIdx];
    const scoreBase = parseFloat(currentRSI.toFixed(1));

    // AI Rules for BUY:
    // 1. EMA sloping UP (current > prev)
    // 2. HA candles turn Green (current and prev are green: close > open)
    // 3. No lower wick on the current green candle (HA low == HA open)
    // 4. RSI > 50
    const emaUp = currentEMA > prevEMA;
    const bothGreen = currentHA.close > currentHA.open && prevHA.close > prevHA.open;
    // float rounding forgiveness for wicks
    const noLowerWick = Math.abs(currentHA.low - Math.min(currentHA.open, currentHA.close)) < 0.05;

    if (emaUp && bothGreen && noLowerWick && currentRSI > 50) {
        // Stop Loss: Below last red candle low
        let sl = quotes[lastIdx].low;
        for (let i = lastIdx; i >= 0; i--) {
            if (ha[i].close < ha[i].open) {
                sl = quotes[i].low;
                break;
            }
        }

        return {
            close: parseFloat(originalQuote.close.toFixed(2)),
            ai_score: scoreBase,
            trend: 'BULLISH',
            stop_loss: parseFloat(sl.toFixed(2)),
            take_profit: 'Trail until red HA with upper wick',
            date: new Date(originalQuote.date).toISOString().split('T')[0],
            message: 'EMA Upward Sloping, RSI > 50, No Lower Wick (Confirmed Entry)'
        };
    }

    // AI Rules for SELL:
    // 1. EMA sloping DOWN (current < prev)
    // 2. HA candles turn Red (prev and current Red)
    // 3. No upper wick on current red (HA high == HA open)
    // 4. RSI < 50
    const emaDown = currentEMA < prevEMA;
    const bothRed = currentHA.close < currentHA.open && prevHA.close < prevHA.open;
    const noUpperWick = Math.abs(currentHA.high - Math.max(currentHA.open, currentHA.close)) < 0.05;

    if (emaDown && bothRed && noUpperWick && currentRSI < 50) {
        // Stop Loss: Above last green candle high
        let sl = quotes[lastIdx].high;
        for (let i = lastIdx; i >= 0; i--) {
            if (ha[i].close > ha[i].open) {
                sl = quotes[i].high;
                break;
            }
        }

        return {
            close: parseFloat(originalQuote.close.toFixed(2)),
            ai_score: scoreBase,
            trend: 'BEARISH',
            stop_loss: parseFloat(sl.toFixed(2)),
            take_profit: 'Trail until green HA with lower wick',
            date: new Date(originalQuote.date).toISOString().split('T')[0],
            message: 'EMA Downward Sloping, RSI < 50, No Upper Wick (Confirmed Entry)'
        };
    }

    return false;
};

app.get('/api/scan-ha', async (req, res) => {
    try {
        const timeframe = req.query.timeframe || '1d';
        console.log(`Scanning HA Setup: Timeframe=${timeframe}`);

        const haStocks = [];
        const batchSize = 10;
        for (let i = 0; i < NIFTY_STOCKS.length; i += batchSize) {
            const batch = NIFTY_STOCKS.slice(i, i + batchSize);
            const promises = batch.map(async (symbol) => {
                try {
                    const interval = timeframe === '1d' ? '1d' : timeframe;
                    const result = await fetchYahooData(symbol, interval, timeframe);

                    if (result && result.length > 0) {
                        const setup = checkHeikinAshiSetup(result);
                        if (setup) {
                            haStocks.push({ symbol: symbol.replace('.NS', ''), ...setup });
                        }
                    }
                } catch (e) {
                    console.error(`HA Error for ${symbol}:`, e.message);
                }
            });
            await Promise.all(promises);
        }
        res.json({ status: "success", data: haStocks });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", message: error.message });
    }
});

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Backend Scanner API up on http://localhost:${PORT}`);
});
