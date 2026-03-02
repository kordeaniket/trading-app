const calculateSMA = (data, period) => {
    let sma = [];
    for (let i = 0; i < data.length; i++) {
        if (i < period - 1) {
            sma.push(null);
            continue;
        }
        let sum = 0;
        for (let j = 0; j < period; j++) {
            sum += data[i - j];
        }
        sma.push(sum / period);
    }
    return sma;
};

const calculateEMA = (data, period) => {
    const k = 2 / (period + 1);
    let ema = data[0].close || data[0];
    const emaValues = [ema];

    for (let i = 1; i < data.length; i++) {
        const c = data[i].close || data[i];
        ema = (c - ema) * k + ema;
        emaValues.push(ema);
    }
    return emaValues;
};

const calculateRSI = (data, period = 14) => {
    const rsi = [];
    const gains = [], losses = [];

    for (let i = 1; i < data.length; i++) {
        const c0 = data[i - 1].close || data[i - 1];
        const c1 = data[i].close || data[i];
        const diff = c1 - c0;
        gains.push(Math.max(diff, 0));
        losses.push(Math.max(-diff, 0));
    }

    let avgGain = gains.slice(0, period).reduce((a, b) => a + b) / period;
    let avgLoss = losses.slice(0, period).reduce((a, b) => a + b) / period;

    for (let i = period; i < data.length; i++) {
        let rs = avgGain / (avgLoss === 0 ? 1e-10 : avgLoss);
        rsi.push(100 - (100 / (1 + rs)));

        avgGain = ((avgGain * (period - 1)) + gains[i - 1]) / period;
        avgLoss = ((avgLoss * (period - 1)) + losses[i - 1]) / period;
    }

    return rsi;
};

async function testStock() {
    const symbol = 'RELIANCE.NS';
    const interval = '1d';
    const range = '1y';
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=${interval}&range=${range}`;

    console.log("Fetching", url);
    const response = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const jsonData = await response.json();
    const res = jsonData.chart.result?.[0];
    const q = res.indicators.quote[0];
    const adj = res.indicators.adjclose?.[0]?.adjclose || q.close;

    const data = res.timestamp.map((t, i) => ({
        date: new Date(t * 1000),
        open: q.open[i] || q.close[i],
        high: q.high[i] || q.close[i],
        low: q.low[i] || q.close[i],
        close: q.close[i] || adj[i],
        volume: q.volume[i] || 0
    })).filter(x => x.close != null && !isNaN(x.close));

    const closes = data.map(d => d.close);
    const highs = data.map(d => d.high);
    const lows = data.map(d => d.low);
    const volumes = data.map(d => d.volume);

    const lastIdx = data.length - 1;
    const currentClose = closes[lastIdx];
    const currentHigh = highs[lastIdx];
    const currentVolume = volumes[lastIdx];

    const sma20Vol = calculateSMA(volumes.slice(0, lastIdx), 20)[19] || currentVolume;
    const rsiValues = calculateRSI(closes, 14);
    const rsi = rsiValues[rsiValues.length - 1];

    const ema50Values = calculateEMA(data, 50);
    const ema200Values = calculateEMA(data, 200);
    const ema50 = ema50Values[ema50Values.length - 1];
    const ema200 = ema200Values[ema200Values.length - 1];

    console.log({ currentClose, sma20Vol, rsi, ema200 });

    if (rsi < 20 || rsi > 90) return console.log("Fail RSI", rsi);
    if (currentClose < ema200 * 0.95) return console.log("Fail EMA200", currentClose, ema200);

    let minCupLen = 20, maxCupLen = 130;

    for (let handleLen = 2; handleLen <= 20; handleLen++) {
        const rightPeakIdx = lastIdx - handleLen;
        if (rightPeakIdx <= 0) continue;

        const rightPeak = highs[rightPeakIdx];
        const handleLows = lows.slice(rightPeakIdx + 1, lastIdx);
        let handleLow = Math.min(...handleLows);

        if (rightPeak - handleLow > rightPeak * 0.25) continue;

        for (let cupLen = minCupLen; cupLen <= maxCupLen; cupLen++) {
            const leftPeakIdx = rightPeakIdx - cupLen;
            if (leftPeakIdx <= 30) continue;

            const leftPeak = highs[leftPeakIdx];
            const resistance = Math.max(leftPeak, rightPeak);

            if (currentClose < resistance * 0.90 || currentClose > resistance * 1.15) continue;

            const cupLows = lows.slice(leftPeakIdx, rightPeakIdx);
            if (cupLows.length === 0) continue;

            const cupLowest = Math.min(...cupLows);
            const depthPct = (leftPeak - cupLowest) / leftPeak;

            if (depthPct < 0.08 || depthPct > 0.50) continue;
            if (Math.abs(leftPeak - rightPeak) / Math.max(leftPeak, rightPeak) > 0.15) continue;

            const preCupClose = closes[leftPeakIdx];
            let preCupLookback = Math.max(0, leftPeakIdx - 30);
            const preCupLows = lows.slice(preCupLookback, leftPeakIdx);
            if (preCupLows.length === 0) continue;

            const preCupLow = Math.min(...preCupLows);
            if ((preCupClose - preCupLow) / preCupLow < 0.05) continue;

            console.log("FOUND SETUP!", { rightPeakIdx, leftPeakIdx, handleLen, cupLen });
            return;
        }
    }
}

testStock().catch(console.error);
