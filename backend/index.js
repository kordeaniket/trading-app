import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/api/health', (req, res) => res.json({ status: 'live', stocks: NIFTY_STOCKS.length }));

const NIFTY_STOCKS = [
    "TATASTEEL.NS", "JSWSTEEL.NS", "JINDALSTEL.NS", "SAIL.NS", "RELIANCE.NS", "TCS.NS", "HDFCBANK.NS", "ICICIBANK.NS", "INFY.NS", "SBIN.NS",
    "BHARTIARTL.NS", "ITC.NS", "HINDUNILVR.NS", "LT.NS", "BAJFINANCE.NS", "KOTAKBANK.NS", "HCLTECH.NS", "ASIANPAINT.NS", "AXISBANK.NS", "MARUTI.NS",
    "SUNPHARMA.NS", "TITAN.NS", "BAJAJFINSV.NS", "WIPRO.NS", "ULTRACEMCO.NS", "ONGC.NS", "NESTLEIND.NS", "POWERGRID.NS", "TRENT.NS", "ADANIENT.NS",
    "ZOMATO.NS", "JIOFIN.NS", "TVSMOTOR.NS", "TATAMOTORS.NS", "M&M.NS", "NTPC.NS", "COALINDIA.NS", "GRASIM.NS", "TECHM.NS", "INDUSINDBK.NS",
    "HINDALCO.NS", "DRREDDY.NS", "SBILIFE.NS", "CIPLA.NS", "BAJAJ-AUTO.NS", "EICHERMOT.NS", "DIVISLAB.NS", "APOLLOHOSP.NS", "BRITANNIA.NS", "TATACONSUM.NS",
    "HEROMOTOCO.NS", "SHREECEM.NS", "BPCL.NS", "HAL.NS", "BEL.NS", "IRFC.NS", "BHEL.NS", "RVNL.NS", "PFC.NS", "RECLTD.NS",
    "DLF.NS", "LODHA.NS", "GAIL.NS", "GODREJCP.NS", "DABUR.NS", "HAVELLS.NS", "POLYCAB.NS", "DIXON.NS", "IDEA.NS", "PNB.NS",
    "BOB.NS", "CANBK.NS", "UNIONBANK.NS", "IOB.NS", "YESBANK.NS", "SUZLON.NS", "NHPC.NS", "SJVN.NS", "IREDA.NS", "J&KBANK.NS",
    "ADANIPOWER.NS", "ADANIPORTS.NS", "AMBUJACEM.NS", "APOLLOTYRE.NS", "ASHOKLEY.NS", "AUIP.NS", "AUBANK.NS", "AUROPHARMA.NS", "BANDHANBNK.NS", "BANKINDIA.NS",
    "BERGEPAINT.NS", "BHARATFORG.NS", "BIOCON.NS", "CHOLAFIN.NS", "COFORGE.NS", "COLPAL.NS", "CONCOR.NS", "CUMMINSIND.NS", "ESCORTS.NS", "EXIDEIND.NS",
    "FEDERALBNK.NS", "GLENMARK.NS", "GMRINFRA.NS", "GODREJPROP.NS", "GUJGASLTD.NS", "HDFCLIFE.NS", "IDFCFIRSTB.NS", "IEX.NS", "IGL.NS", "INDIACEM.NS",
    "INDIAMART.NS", "INDIGO.NS", "INDUSTOWER.NS", "IOC.NS", "IPCALAB.NS", "JKCEMENT.NS", "JUBLFOOD.NS", "KOTAKBANK.NS", "LICHSGFIN.NS", "LTIM.NS",
    "LUPIN.NS", "MANAPPURAM.NS", "MARICO.NS", "MCDOWELL-N.NS", "MCX.NS", "METROPOLIS.NS", "MFSL.NS", "MGL.NS", "MOTHERSON.NS", "MPHASIS.NS",
    "MRF.NS", "MUTHOOTFIN.NS", "NATIONALUM.NS", "NAVINFLUOR.NS", "NMDC.NS", "OBEROIRLTY.NS", "OFSS.NS", "PAGEIND.NS", "PEL.NS", "PERSISTENT.NS",
    "PETRONET.NS", "PIDILITIND.NS", "PIIND.NS", "PNB.NS", "POLYCAB.NS", "PVRINOX.NS", "RAMCOCEM.NS", "RBLBANK.NS", "RECLTD.NS", "SBICARD.NS",
    "SHREECEM.NS", "SIEMENS.NS", "SRF.NS", "SYNGENE.NS", "TATACOMM.NS", "TATACONSUM.NS", "TATAELXSI.NS", "TATAPOWER.NS", "TATASTEEL.NS", "TORNTPOWER.NS",
    "TRENT.NS", "TVSMOTOR.NS", "UBL.NS", "UHR.NS", "UNITDSPR.NS", "VOLTAS.NS", "ZEEL.NS", "ZYDUSLIFE.NS", "ABB.NS", "ACC.NS",
    "AIAENG.NS", "ALKEM.NS", "ALOKINDS.NS", "APARINDS.NS", "ASTERDM.NS", "ATUL.NS", "AVANTIFEED.NS", "BALKRISIND.NS", "BALRAMCHIN.NS", "BATAINDIA.NS",
    "BDL.NS", "BEML.NS", "BLUESTARCO.NS", "BSOFT.NS", "CAMPUS.NS", "CASTROLIND.NS", "CEATLTD.NS", "CENTURYPLY.NS", "CESC.NS", "CGPOWER.NS",
    "CHAMBLFERT.NS", "CHENNPETRO.NS", "CIEINDIA.NS", "CITYUNIONB.NS", "CLEAN.NS", "COROMANDEL.NS", "CRAFTSMAN.NS", "CROMPTON.NS", "CYIENT.NS", "DATAPATTNS.NS",
    "DEEPAKFERT.NS", "DEEPAKNTR.NS", "DELHIVERY.NS", "DEVYANI.NS", "DIXON.NS", "EASEMYTRIP.NS", "EDELWEISS.NS", "EIDPARRY.NS", "ELGIEQUIP.NS", "EMAMILTD.NS",
    "ENDURANCE.NS", "ENGINERSIN.NS", "EPL.NS", "ERIS.NS", "FSL.NS", "FORTIS.NS", "GAEL.NS", "GESHIP.NS", "GICRE.NS", "GNFC.NS",
    "GOCOLORS.NS", "GPPL.NS", "GRANULES.NS", "GRAPHITE.NS", "GRSE.NS", "GSFC.NS", "GSPL.NS", "GUJALKALI.NS", "HAPPSTMNDS.NS", "HDFCAMC.NS",
    "HEG.NS", "HFCL.NS", "HGINFRA.NS", "HIKAL.NS", "HINDCOPPER.NS", "HINDZINC.NS", "HUDCO.NS", "IDBI.NS", "IDFC.NS", "IIFL.NS",
    "IRB.NS", "ITI.NS", "JBMA.NS", "JSL.NS", "JUSTDIAL.NS", "JYOTHYLAB.NS", "KALYANKJIL.NS", "KEI.NS", "KIMS.NS", "KNRCON.NS",
    "KPITTECH.NS", "KRBL.NS", "L&TFH.NS", "LAURUSLABS.NS", "LXCHEM.NS", "MAHINDCIE.NS", "MAHLOG.NS", "MAPMYINDIA.NS", "MASTEK.NS", "MAXHEALTH.NS",
    "MAZDOCK.NS", "MEDANTA.NS", "MEDPLUS.NS", "MSUMI.NS", "MTARTECH.NS", "NAZARA.NS", "NH.NS", "NLCINDIA.NS", "NSL.NS", "NYKAA.NS",
    "OIL.NS", "PATANJALI.NS", "PAYTM.NS", "PHOENIXLTD.NS", "PPLPHARMA.NS", "PRINCEPIPE.NS", "PRIVISCL.NS", "QUESS.NS", "RADICO.NS", "RAJESHEXPO.NS",
    "RATNAMANI.NS", "RAYMOND.NS", "REDINGTON.NS", "RELAXO.NS", "RHIM.NS", "RITES.NS", "ROLEXTURBO.NS", "ROSSARI.NS", "ROUTE.NS", "RVNL.NS",
    "SAPPHIRE.NS", "SFL.NS", "SHOPERSTOP.NS", "SHREECEM.NS", "SHYAMMETL.NS", "SKFINDIA.NS", "SONACOMS.NS", "SONATSOFTW.NS", "STARHEALTH.NS", "SUMICHEM.NS",
    "SUPREMEIND.NS", "SURYAROSNI.NS", "SYMPHONY.NS", "TATAINVEST.NS", "TEAMLEASE.NS", "THYROCARE.NS", "TIINDIA.NS", "TRIDENT.NS", "TRITURBINE.NS", "TTML.NS",
    "TV18BRDCST.NS", "UJJIVANSFB.NS", "UTIAMC.NS", "VGUARD.NS", "VIJAYA.NS", "VINATIORGA.NS", "VIPIND.NS", "VTL.NS", "WELCORP.NS", "WELSPUNIND.NS",
    "WHIRLPOOL.NS", "ZENSARTECH.NS"
];

// 📊 ADVANCED TECHNICAL INDICATORS
const calculateEMA = (data, period) => {
    const k = 2 / (period + 1);
    let ema = data[0].close;
    const emaValues = [ema];

    for (let i = 1; i < data.length; i++) {
        ema = (data[i].close - ema) * k + ema;
        emaValues.push(ema);
    }
    return emaValues;
};

const calculateRSI = (data, period = 14) => {
    const rsi = [];
    const gains = [], losses = [];

    for (let i = 1; i < data.length; i++) {
        const diff = data[i].close - data[i - 1].close;
        gains.push(diff > 0 ? diff : 0);
        losses.push(diff < 0 ? -diff : 0);
    }

    for (let i = period; i < data.length; i++) {
        const avgGain = gains.slice(i - period, i).reduce((a, b) => a + b, 0) / period;
        const avgLoss = losses.slice(i - period, i).reduce((a, b) => a + b, 0) / period;
        const rs = avgGain / (avgLoss || 0.001);
        rsi.push(100 - (100 / (1 + rs)));
    }

    return rsi;
};

const calculateMACD = (data) => {
    const ema12 = calculateEMA(data, 12);
    const ema26 = calculateEMA(data, 26);
    const macd = [], signal = [];

    for (let i = 0; i < Math.min(ema12.length, ema26.length); i++) {
        macd.push(ema12[i] - ema26[i]);
    }

    const ema9 = calculateEMA(macd.map(v => ({ close: v })), 9);
    for (let i = 0; i < macd.length; i++) {
        signal.push(ema9[i] || 0);
    }

    return { macd, signal };
};

const calculateBB = (data, period = 20, stdDev = 2) => {
    const bb = [];
    for (let i = period; i < data.length; i++) {
        const slice = data.slice(i - period, i);
        const sma = slice.reduce((s, q) => s + q.close, 0) / period;
        const std = Math.sqrt(slice.reduce((s, q) => s + Math.pow(q.close - sma, 2), 0) / period);
        bb.push({
            upper: sma + stdDev * std,
            middle: sma,
            lower: sma - stdDev * std
        });
    }
    return bb;
};

const calculateOBV = (data) => {
    let obv = 0;
    const obvValues = [];

    for (let i = 0; i < data.length; i++) {
        if (i > 0) {
            if (data[i].close > data[i - 1].close) obv += data[i].volume;
            else if (data[i].close < data[i - 1].close) obv -= data[i].volume;
        }
        obvValues.push(obv);
    }
    return obvValues;
};

const calculateATR = (data, period = 14) => {
    const tr = [];
    for (let i = 1; i < data.length; i++) {
        const high = data[i].high;
        const low = data[i].low;
        const prevClose = data[i - 1].close;
        tr.push(Math.max(high - low, Math.abs(high - prevClose), Math.abs(low - prevClose)));
    }

    const atr = [];
    for (let i = period; i < tr.length; i++) {
        const avg = tr.slice(i - period, i).reduce((a, b) => a + b, 0) / period;
        atr.push(avg);
    }
    return atr;
};

// 🤖 AI-ENHANCED PATTERN DETECTION (REFINED LOGIC)
const detectPAPAPatterns = (quotes) => {
    if (quotes.length < 60) return [];

    const last = quotes[quotes.length - 1];
    const prev = quotes[quotes.length - 2];
    const prev2 = quotes[quotes.length - 3];
    const prev3 = quotes[quotes.length - 4];

    // Calculate indicators
    const rsi = calculateRSI(quotes);
    const macd = calculateMACD(quotes);
    const bb = calculateBB(quotes);
    const obv = calculateOBV(quotes);
    const atr = calculateATR(quotes);

    const lastRSI = rsi[rsi.length - 1] || 50;
    const lastMACD = macd.macd[macd.macd.length - 1] || 0;
    const lastSignal = macd.signal[macd.signal.length - 1] || 0;
    const lastATR = atr[atr.length - 1] || (last.high - last.low) * 0.5;

    const avgVol = quotes.slice(-20).reduce((s, q) => s + q.volume, 0) / 20;
    const volumeSpike = last.volume > avgVol * 1.5;

    const findings = [];

    // 1. DOUBLE TOP
    const lookback = 40;
    const recentHighs = quotes.slice(-lookback).filter((q, i, arr) =>
        q.high === Math.max(...arr.slice(Math.max(0, i - 5), i + 6).map(x => x.high))
    );
    if (recentHighs.length >= 2) {
        const p1 = recentHighs[recentHighs.length - 2];
        const p2 = recentHighs[recentHighs.length - 1];
        const priceDiff = Math.abs(p2.high - p1.high) / p1.high;
        if (priceDiff < 0.03 && last.close < Math.min(p1.low, p2.low)) {
            findings.push({
                type: 'DOUBLE_TOP',
                confidence: lastRSI < 50 ? 85 : 70,
                score: 9,
                message: 'Classic Double Top at major resistance. High probability reversal.',
                stop_loss: Math.max(p1.high, p2.high) + lastATR,
                target: last.close - (p1.high - Math.min(p1.low, p2.low))
            });
        }
    }

    // 2. DOUBLE BOTTOM
    const recentLows = quotes.slice(-lookback).filter((q, i, arr) =>
        q.low === Math.min(...arr.slice(Math.max(0, i - 5), i + 6).map(x => x.low))
    );
    if (recentLows.length >= 2) {
        const v1 = recentLows[recentLows.length - 2];
        const v2 = recentLows[recentLows.length - 1];
        const priceDiff = Math.abs(v2.low - v1.low) / v1.low;
        if (priceDiff < 0.03 && last.close > Math.max(v1.high, v2.high)) {
            findings.push({
                type: 'DOUBLE_BOTTOM',
                confidence: lastRSI > 50 ? 90 : 75,
                score: 9,
                message: 'Double Bottom confirmed at support. Bullish shift incoming.',
                stop_loss: Math.min(v1.low, v2.low) - lastATR,
                target: last.close + (Math.max(v1.high, v2.high) - v1.low)
            });
        }
    }

    // 3. THREE WHITE SOLDIERS
    if (isBullish(prev2) && isBullish(prev) && isBullish(last) &&
        last.close > prev.close && prev.close > prev2.close &&
        last.open > prev.open && prev.open > prev2.open) {
        findings.push({
            type: 'THREE_WHITE_SOLDIERS',
            confidence: volumeSpike ? 88 : 70,
            score: 8,
            message: 'Strong bullish conviction with three increasing candles.',
            stop_loss: prev2.low,
            target: last.close + (last.close - prev2.low)
        });
    }

    // 4. THREE BLACK CROWS
    if (isBearish(prev2) && isBearish(prev) && isBearish(last) &&
        last.close < prev.close && prev.close < prev2.close &&
        last.open < prev.open && prev.open < prev2.open) {
        findings.push({
            type: 'THREE_BLACK_CROWS',
            confidence: volumeSpike ? 'HIGH' : 'MEDIUM',
            score: 8,
            message: 'Sharp selling pressure with consecutive lower closes.',
            stop_loss: prev2.high,
            target: last.close - (prev2.high - last.close)
        });
    }

    // 5. BULLS COUNTER ATTACK
    if (isBearish(prev) && isBullish(last) && last.open < prev.low &&
        Math.abs(last.close - prev.close) / prev.close < 0.005) {
        findings.push({
            type: 'BULLS_COUNTER_ATTACK',
            confidence: 'MEDIUM',
            score: 7,
            message: 'Bulls met bears head-on. Potential bottom formation.',
            stop_loss: last.low,
            target: last.close + (prev.open - prev.close)
        });
    }

    // 6. BEARS COUNTER ATTACK
    if (isBullish(prev) && isBearish(last) && last.open > prev.high &&
        Math.abs(last.close - prev.close) / prev.close < 0.005) {
        findings.push({
            type: 'BEARS_COUNTER_ATTACK',
            confidence: 'MEDIUM',
            score: 7,
            message: 'Bears halted the rally. Rejection at peak.',
            stop_loss: last.high,
            target: last.close - (prev.close - prev.open)
        });
    }

    // 7. SANDWICH PATTERN (Bullish)
    if (isBullish(prev2) && isBearish(prev) && isBullish(last) &&
        last.close > prev.open && prev2.close > prev.open) {
        findings.push({
            type: 'SANDWICH_PATTERN',
            confidence: 'HIGH',
            score: 8,
            message: 'Bearish candle trapped between two bulls. Momentum recovery.',
            stop_loss: prev.low,
            target: last.close + (last.close - prev.low)
        });
    }

    // 8. ROUNDING BOTTOM (Simplified)
    const recentCloseArr = quotes.slice(-30).map(q => q.close);
    const minPrice = Math.min(...recentCloseArr);
    const minIdx = recentCloseArr.indexOf(minPrice);
    if (minIdx > 5 && minIdx < 25 && last.close > recentCloseArr[0] && last.close > recentCloseArr[minIdx] * 1.05) {
        findings.push({
            type: 'ROUNDING_BOTTOM',
            confidence: 'MEDIUM',
            score: 7,
            message: 'Gradual U-shaped recovery detected. Long term reversal.',
            stop_loss: minPrice,
            target: last.close + (last.close - minPrice)
        });
    }

    // 9. ROUNDING TOP
    const maxPrice = Math.max(...recentCloseArr);
    const maxIdx = recentCloseArr.indexOf(maxPrice);
    if (maxIdx > 5 && maxIdx < 25 && last.close < recentCloseArr[0] && last.close < maxPrice * 0.95) {
        findings.push({
            type: 'ROUNDING_TOP',
            confidence: 'MEDIUM',
            score: 7,
            message: 'Inverted U-shape distribution. Exit signals increasing.',
            stop_loss: maxPrice,
            target: last.close - (maxPrice - last.close)
        });
    }

    // 10 & 11. GENUINE BO / BD
    const resistance50 = Math.max(...quotes.slice(-50, -1).map(q => q.high));
    const support50 = Math.min(...quotes.slice(-50, -1).map(q => q.low));
    if (last.close > resistance50 && volumeSpike) {
        findings.push({
            type: 'GENUINE_BO',
            confidence: 95,
            score: 10,
            message: 'High-volume breakout of 50-period range. Genuine momentum.',
            stop_loss: resistance50 - lastATR,
            target: last.close + (last.close - support50)
        });
    } else if (last.close < support50 && volumeSpike) {
        findings.push({
            type: 'GENUINE_BD',
            confidence: 95,
            score: 10,
            message: 'High-volume breakdown. Major sell-off triggered.',
            stop_loss: support50 + lastATR,
            target: last.close - (resistance50 - last.close)
        });
    }

    // 12 & 13. FAKE BO / BD
    if (prev.high > resistance50 && last.close < resistance50) {
        findings.push({
            type: 'FAKE_BO',
            confidence: 90,
            score: 9,
            message: 'Bull trap! Price failed to hold above resistance.',
            stop_loss: prev.high,
            target: last.close - lastATR * 3
        });
    } else if (prev.low < support50 && last.close > support50) {
        findings.push({
            type: 'FAKE_BD',
            confidence: 90,
            score: 9,
            message: 'Bear trap! Liquidity hunt below support. Strong reversal potential.',
            stop_loss: prev.low,
            target: last.close + lastATR * 3
        });
    }

    // 14 & 15. GAP UP / DOWN
    if (last.open > prev.high * 1.01) {
        findings.push({
            type: 'GAP_UP',
            confidence: 70,
            score: 6,
            message: 'Significant bullish gap. Demand exceeds supply at open.',
            stop_loss: prev.close,
            target: last.close + (last.open - prev.close)
        });
    } else if (last.open < prev.low * 0.99) {
        findings.push({
            type: 'GAP_DOWN',
            confidence: 70,
            score: 6,
            message: 'Significant bearish gap. Panic selling at open.',
            stop_loss: prev.close,
            target: last.close - (prev.close - last.open)
        });
    }

    // 16. HEAD AND SHOULDERS (General)
    const highs = quotes.map(q => q.high);
    const leftShoulder = Math.max(...highs.slice(-60, -40));
    const head = Math.max(...highs.slice(-40, -20));
    const rightShoulder = Math.max(...highs.slice(-20));
    if (head > leftShoulder && head > rightShoulder && Math.abs(leftShoulder - rightShoulder) / leftShoulder < 0.05) {
        const neckline = Math.min(...quotes.slice(-30).map(q => q.low));
        if (last.close < neckline) {
            findings.push({
                type: 'HEAD_SHOULDERS',
                confidence: 85,
                score: 9,
                message: 'Head & Shoulders Breakdown: Major trend reversal structure',
                stop_loss: rightShoulder + lastATR,
                target: neckline - (head - neckline)
            });
        }
    }

    // 17. INVERSE HEAD AND SHOULDERS (General)
    const lows = quotes.map(q => q.low);
    const leftShoulderLow = Math.min(...lows.slice(-60, -40));
    const headLow = Math.min(...lows.slice(-40, -20));
    const rightShoulderLow = Math.min(...lows.slice(-20));
    if (headLow < leftShoulderLow && headLow < rightShoulderLow && Math.abs(leftShoulderLow - rightShoulderLow) / leftShoulderLow < 0.05) {
        const necklineHigh = Math.max(...quotes.slice(-30).map(q => q.high));
        if (last.close > necklineHigh) {
            findings.push({
                type: 'INVERSE_HS',
                confidence: 88,
                score: 10,
                message: 'Inverse Head & Shoulders Breakout: Foundational reversal',
                stop_loss: rightShoulderLow - lastATR,
                target: necklineHigh + (necklineHigh - headLow)
            });
        }
    }

    // 18. BULL FLAG (General)
    const flagpole = quotes.slice(-30, -20);
    const flag = quotes.slice(-20);
    if (flagpole.length > 0) {
        const poleHeight = Math.max(...flagpole.map(q => q.high)) - Math.min(...flagpole.map(q => q.low));
        const flagHigh = Math.max(...flag.map(q => q.high));
        const flagLow = Math.min(...flag.map(q => q.low));
        if (flagHigh - flagLow < poleHeight * 0.3 && last.close > flagHigh) {
            findings.push({
                type: 'BULL_FLAG',
                confidence: 82,
                score: 8,
                message: 'Bull Flag breakout: Continuation of previous uptrend.',
                stop_loss: flagLow - lastATR,
                target: last.close + poleHeight
            });
        }
    }

    return findings.map(f => ({
        ...f,
        symbol: '',
        price: last.close,
        close: last.close,
        volume: last.volume,
        avg_volume: avgVol,
        date: last.date.toISOString().split('T')[0],
        support: last.close - lastATR,
        resistance: last.close + lastATR
    }));
};

// 🚀 3rd WAVE SETUP ENGINE (PRO)
const detectThirdWaveSetup = (quotes) => {
    if (quotes.length < 100) return [];

    const last = quotes[quotes.length - 1];
    const rsi = calculateRSI(quotes);
    const macd = calculateMACD(quotes);
    const obv = calculateOBV(quotes);
    const atr = calculateATR(quotes);

    const lastRSI = rsi[rsi.length - 1] || 50;
    const lastMACD = macd.macd[macd.macd.length - 1] || 0;
    const lastSignal = macd.signal[macd.signal.length - 1] || 0;
    const lastOBV = obv[obv.length - 1] || 0;
    const prevOBV = obv[obv.length - 2] || 0;
    const lastATR = atr[atr.length - 1] || (last.high - last.low) * 0.5;

    const avgVol = quotes.slice(-20).reduce((s, q) => s + q.volume, 0) / 20;

    // Wave 1: Strong impulse
    const wave1Start = Math.min(...quotes.slice(-100, -80).map(q => q.low));
    const wave1End = Math.max(...quotes.slice(-80, -60).map(q => q.high));
    const wave1Length = wave1End - wave1Start;
    const wave1Volume = quotes.slice(-80, -60).reduce((s, q) => s + q.volume, 0) / 20;

    // Wave 2: Correction (should retrace 38.2-61.8% of wave 1)
    const wave2Low = Math.min(...quotes.slice(-60, -40).map(q => q.low));
    const wave2Retrace = (wave1End - wave2Low) / wave1Length;

    // Wave 3: Strongest wave
    const wave3Start = wave2Low;
    const wave3End = Math.max(...quotes.slice(-40, -20).map(q => q.high));
    const wave3Length = wave3End - wave3Start;
    const wave3Volume = quotes.slice(-40, -20).reduce((s, q) => s + q.volume, 0) / 20;

    // Current wave (potential wave 5)
    const recentHigh = Math.max(...quotes.slice(-20).map(q => q.high));
    const recentLow = Math.min(...quotes.slice(-20).map(q => q.low));

    const findings = [];

    // Bullish Wave 3 setup
    if (wave1Length > 0 && wave2Retrace >= 0.382 && wave2Retrace <= 0.618) {
        const wave3Valid = wave3Length > wave1Length * 1.5;
        const volumeValid = wave3Volume > wave1Volume * 1.2;
        const momentumValid = lastMACD > lastSignal && lastRSI > 50;
        const obvValid = lastOBV > prevOBV;

        const confidence = [wave3Valid, volumeValid, momentumValid, obvValid].filter(Boolean).length;

        if (confidence >= 3) {
            findings.push({
                type: '3rd_WAVE_BULLISH',
                confidence: confidence >= 4 ? 98 : 82,
                score: confidence + 7,
                message: 'Elliott Wave 3 in progress: Heavy momentum and trend expansion',
                checklist: [
                    { label: "Wave 1 (Impulse) identified", status: true },
                    { label: "Wave 2 (Retrace) 38.2%-61.8%", status: true },
                    { label: "Wave 3 expansion (>1.618 of W1)", status: wave3Valid },
                    { label: "MACD/RSI Momentum alignment", status: momentumValid },
                    { label: "OBV Accumulation confirmation", status: obvValid }
                ],
                price: last.close,
                stop_loss: wave2Low - lastATR,
                target: wave3End + wave1Length * 1.618,
                wave1_length: wave1Length,
                wave2_retrace: wave2Retrace,
                wave3_length: wave3Length,
                wave3_ratio: wave3Length / wave1Length,
                volume: last.volume,
                avg_volume: avgVol
            });
        }
    }

    // Bearish Wave 3 setup (for downtrend)
    const wave1DownStart = Math.max(...quotes.slice(-100, -80).map(q => q.high));
    const wave1DownEnd = Math.min(...quotes.slice(-80, -60).map(q => q.low));
    const wave1DownLength = wave1DownStart - wave1DownEnd;

    const wave2UpHigh = Math.max(...quotes.slice(-60, -40).map(q => q.high));
    const wave2UpRetrace = (wave2UpHigh - wave1DownEnd) / wave1DownLength;

    const wave3DownEnd = Math.min(...quotes.slice(-40, -20).map(q => q.low));
    const wave3DownLength = wave2UpHigh - wave3DownEnd;

    if (wave1DownLength > 0 && wave2UpRetrace >= 0.382 && wave2UpRetrace <= 0.618) {
        const wave3Valid = wave3DownLength > wave1DownLength * 1.5;
        const volumeValid = quotes.slice(-40, -20).reduce((s, q) => s + q.volume, 0) / 20 >
            quotes.slice(-80, -60).reduce((s, q) => s + q.volume, 0) / 20 * 1.2;

        if (wave3Valid && volumeValid) {
            findings.push({
                type: '3rd_WAVE_BEARISH',
                confidence: 85,
                score: 8,
                message: 'Elliott Wave 3 Down: Strong selling pressure confirmed',
                checklist: [
                    { label: "Wave 1 Down (Impulse) complete", status: true },
                    { label: "Wave 2 Up (Retrace) 38.2%-61.8%", status: true },
                    { label: "Wave 3 Down expansion (>1.5x W1)", status: wave3Valid },
                    { label: "Volume Spiking on selloff", status: volumeValid }
                ],
                price: last.close,
                stop_loss: wave2UpHigh + lastATR,
                target: wave3DownEnd - wave1DownLength * 1.618,
                volume: last.volume,
                avg_volume: avgVol
            });
        }
    }

    return findings;
};

// 🕯️ HEIKIN ASHI TREND ENGINE (ENHANCED)
const detectHA = (quotes) => {
    if (quotes.length < 30) return [];

    // Calculate Heikin-Ashi
    const ha = [];
    for (let i = 0; i < quotes.length; i++) {
        if (i === 0) {
            ha.push({
                ...quotes[i],
                haClose: (quotes[i].open + quotes[i].high + quotes[i].low + quotes[i].close) / 4,
                haOpen: (quotes[i].open + quotes[i].close) / 2
            });
        } else {
            const haClose = (quotes[i].open + quotes[i].high + quotes[i].low + quotes[i].close) / 4;
            const haOpen = (ha[i - 1].haOpen + ha[i - 1].haClose) / 2;
            const haHigh = Math.max(quotes[i].high, haOpen, haClose);
            const haLow = Math.min(quotes[i].low, haOpen, haClose);

            ha.push({
                ...quotes[i],
                haOpen,
                haClose,
                haHigh,
                haLow
            });
        }
    }

    const lastHA = ha[ha.length - 1];
    const prevHA = ha[ha.length - 2];
    const prev2HA = ha[ha.length - 3];

    const findings = [];

    // Strong HA trend identification
    const isHAStrongBullish = lastHA.haClose > lastHA.haOpen &&
        lastHA.haLow > lastHA.haOpen &&
        lastHA.haClose > prevHA.haClose;

    const isHAStrongBearish = lastHA.haClose < lastHA.haOpen &&
        lastHA.haHigh < lastHA.haOpen &&
        lastHA.haClose < prevHA.haClose;

    // HA Reversal signals
    const isHABullishReversal = prevHA.haClose < prevHA.haOpen &&
        lastHA.haClose > lastHA.haOpen &&
        lastHA.haClose > prevHA.haHigh;

    const isHABearishReversal = prevHA.haClose > prevHA.haOpen &&
        lastHA.haClose < lastHA.haOpen &&
        lastHA.haClose < prevHA.haLow;

    // HA Continuation with momentum
    const isHAMomentumBullish = isHAStrongBullish && lastHA.haClose - lastHA.haOpen >
        (prevHA.haClose - prevHA.haOpen) * 1.2;

    const isHAMomentumBearish = isHAStrongBearish && lastHA.haOpen - lastHA.haClose >
        (prevHA.haOpen - prevHA.haClose) * 1.2;

    if (isHAMomentumBullish) {
        findings.push({
            type: 'HA_MOMENTUM_BULL',
            confidence: 'HIGH',
            message: 'Heikin-Ashi strong bullish momentum',
            entry: quotes[quotes.length - 1].close,
            stop_loss: lastHA.haLow,
            target: lastHA.haClose + (lastHA.haClose - lastHA.haOpen) * 3,
            ha_trend: 'BULLISH'
        });
    }

    if (isHAMomentumBearish) {
        findings.push({
            type: 'HA_MOMENTUM_BEAR',
            confidence: 'HIGH',
            message: 'Heikin-Ashi strong bearish momentum',
            entry: quotes[quotes.length - 1].close,
            stop_loss: lastHA.haHigh,
            target: lastHA.haClose - (lastHA.haOpen - lastHA.haClose) * 3,
            ha_trend: 'BEARISH'
        });
    }

    if (isHABullishReversal) {
        findings.push({
            type: 'HA_REVERSAL_BULL',
            confidence: 'MEDIUM',
            message: 'Heikin-Ashi bullish reversal',
            entry: quotes[quotes.length - 1].close,
            stop_loss: Math.min(prevHA.haLow, lastHA.haLow),
            target: lastHA.haClose + (lastHA.haClose - lastHA.haOpen) * 2,
            ha_trend: 'REVERSAL'
        });
    }

    if (isHABearishReversal) {
        findings.push({
            type: 'HA_REVERSAL_BEAR',
            confidence: 'MEDIUM',
            message: 'Heikin-Ashi bearish reversal',
            entry: quotes[quotes.length - 1].close,
            stop_loss: Math.max(prevHA.haHigh, lastHA.haHigh),
            target: lastHA.haClose - (lastHA.haOpen - lastHA.haClose) * 2,
            ha_trend: 'REVERSAL'
        });
    }

    return findings.map(f => ({
        ...f,
        price: quotes[quotes.length - 1].close,
        date: quotes[quotes.length - 1].date.toISOString().split('T')[0]
    }));
};

// 📐 ENDING DIAGONAL ENGINE (PRO VERSION)
const detectEndingDiagonal = (quotes) => {
    if (quotes.length < 100) return [];

    const last = quotes[quotes.length - 1];
    const rsi = calculateRSI(quotes);
    const macd = calculateMACD(quotes);
    const atr = calculateATR(quotes);

    const lastRSI = rsi[rsi.length - 1] || 50;
    const rsi5 = rsi[rsi.length - 5] || 50;
    const rsi10 = rsi[rsi.length - 10] || 50;
    const lastATR = atr[atr.length - 1] || (last.high - last.low) * 0.5;

    const avgVol = quotes.slice(-20).reduce((s, q) => s + q.volume, 0) / 20;

    // Find significant swing points using local maxima/minima
    const findSwingHighs = (data, window = 10) => {
        const swings = [];
        for (let i = window; i < data.length - window; i++) {
            const slice = data.slice(i - window, i + window + 1);
            if (data[i].high === Math.max(...slice.map(q => q.high))) {
                swings.push({ ...data[i], index: i });
            }
        }
        return swings;
    };

    const findSwingLows = (data, window = 10) => {
        const swings = [];
        for (let i = window; i < data.length - window; i++) {
            const slice = data.slice(i - window, i + window + 1);
            if (data[i].low === Math.min(...slice.map(q => q.low))) {
                swings.push({ ...data[i], index: i });
            }
        }
        return swings;
    };

    const swingHighs = findSwingHighs(quotes);
    const swingLows = findSwingLows(quotes);

    const findings = [];

    // BEARISH ENDING DIAGONAL (for top)
    if (swingHighs.length >= 5) {
        const recentHighs = swingHighs.slice(-5);

        // Check for higher highs but slowing momentum
        const pricesIncreasing = recentHighs[1].high > recentHighs[0].high &&
            recentHighs[2].high > recentHighs[1].high &&
            recentHighs[3].high > recentHighs[2].high &&
            recentHighs[4].high > recentHighs[3].high;

        // Check for converging trendlines (decreasing rate of increase)
        const slope1 = (recentHighs[2].high - recentHighs[0].high) / (recentHighs[2].index - recentHighs[0].index);
        const slope2 = (recentHighs[4].high - recentHighs[2].high) / (recentHighs[4].index - recentHighs[2].index);
        const converging = slope2 < slope1;

        // RSI divergence
        const rsiDivergence = lastRSI < rsi5 && rsi5 < rsi10;

        // Volume divergence
        const volumeDivergence = recentHighs[4].volume < recentHighs[3].volume &&
            recentHighs[3].volume < recentHighs[2].volume;

        if (pricesIncreasing && (converging || rsiDivergence || volumeDivergence)) {
            const confidence = [converging, rsiDivergence, volumeDivergence].filter(Boolean).length;

            if (last.close < recentHighs[4].low) { // Breakdown
                findings.push({
                    type: 'ENDING_DIAGONAL_BEARISH',
                    confidence: confidence >= 2 ? 'HIGH' : 'MEDIUM',
                    message: 'Bearish Ending Diagonal breakdown',
                    entry: last.close,
                    stop_loss: recentHighs[4].high + lastATR,
                    target: recentHighs[0].low - (recentHighs[4].high - recentHighs[0].low),
                    structure: pricesIncreasing ? 'HIGHER_HIGHS' : 'COMPLEX',
                    converging: converging,
                    rsi_divergence: rsiDivergence,
                    volume_divergence: volumeDivergence
                });
            }
        }
    }

    // BULLISH ENDING DIAGONAL (for bottom)
    if (swingLows.length >= 5) {
        const recentLows = swingLows.slice(-5);

        // Check for lower lows but slowing momentum
        const pricesDecreasing = recentLows[1].low < recentLows[0].low &&
            recentLows[2].low < recentLows[1].low &&
            recentLows[3].low < recentLows[2].low &&
            recentLows[4].low < recentLows[3].low;

        // Check for converging trendlines (decreasing rate of decrease)
        const slope1 = (recentLows[2].low - recentLows[0].low) / (recentLows[2].index - recentLows[0].index);
        const slope2 = (recentLows[4].low - recentLows[2].low) / (recentLows[4].index - recentLows[2].index);
        const converging = slope2 > slope1; // Slopes becoming less negative

        // RSI divergence
        const rsiDivergence = lastRSI > rsi5 && rsi5 > rsi10;

        // Volume divergence
        const volumeDivergence = recentLows[4].volume < recentLows[3].volume &&
            recentLows[3].volume < recentLows[2].volume;

        if (pricesDecreasing && (converging || rsiDivergence || volumeDivergence)) {
            const confidence = [converging, rsiDivergence, volumeDivergence].filter(Boolean).length;

            if (last.close > recentLows[4].high) { // Breakout
                findings.push({
                    type: 'ENDING_DIAGONAL_BULLISH',
                    confidence: confidence >= 2 ? 'HIGH' : 'MEDIUM',
                    message: 'Bullish Ending Diagonal breakout',
                    entry: last.close,
                    stop_loss: recentLows[4].low - lastATR,
                    target: recentLows[0].high + (recentLows[0].high - recentLows[4].low),
                    structure: pricesDecreasing ? 'LOWER_LOWS' : 'COMPLEX',
                    converging: converging,
                    rsi_divergence: rsiDivergence,
                    volume_divergence: volumeDivergence
                });
            }
        }
    }

    return findings.map(f => ({
        ...f,
        price: last.close,
        volume: last.volume,
        avg_volume: avgVol,
        date: last.date.toISOString().split('T')[0]
    }));
};

// 📐 TRIANGLE BREAKOUT ENGINE (PRO)
const detectTriangleBreakout = (quotes) => {
    if (quotes.length < 100) return [];

    const last = quotes[quotes.length - 1];
    const prev = quotes[quotes.length - 2];
    const rsi = calculateRSI(quotes);
    const macd = calculateMACD(quotes);
    const atr = calculateATR(quotes);

    const lastRSI = rsi[rsi.length - 1] || 50;
    const lastMACD = macd.macd[macd.macd.length - 1] || 0;
    const lastSignal = macd.signal[macd.signal.length - 1] || 0;
    const lastATR = atr[atr.length - 1] || (last.high - last.low) * 0.5;

    const avgVol = quotes.slice(-20).reduce((s, q) => s + q.volume, 0) / 20;

    // Find significant swing points
    const findSwingHighs = (data, window = 15) => {
        const swings = [];
        for (let i = window; i < data.length - window; i++) {
            const slice = data.slice(i - window, i + window + 1);
            if (data[i].high === Math.max(...slice.map(q => q.high))) {
                swings.push({ price: data[i].high, index: i, date: data[i].date });
            }
        }
        return swings;
    };

    const findSwingLows = (data, window = 15) => {
        const swings = [];
        for (let i = window; i < data.length - window; i++) {
            const slice = data.slice(i - window, i + window + 1);
            if (data[i].low === Math.min(...slice.map(q => q.low))) {
                swings.push({ price: data[i].low, index: i, date: data[i].date });
            }
        }
        return swings;
    };

    const swingHighs = findSwingHighs(quotes);
    const swingLows = findSwingLows(quotes);

    const findings = [];

    // SYMMETRICAL TRIANGLE
    if (swingHighs.length >= 3 && swingLows.length >= 3) {
        const recentHighs = swingHighs.slice(-3);
        const recentLows = swingLows.slice(-3);

        // Check for lower highs
        const lowerHighs = recentHighs[2].price < recentHighs[1].price &&
            recentHighs[1].price < recentHighs[0].price;

        // Check for higher lows
        const higherLows = recentLows[2].price > recentLows[1].price &&
            recentLows[1].price > recentLows[0].price;

        if (lowerHighs && higherLows) {
            // Calculate trendlines
            const highSlope = (recentHighs[2].price - recentHighs[0].price) /
                (recentHighs[2].index - recentHighs[0].index);
            const lowSlope = (recentLows[2].price - recentLows[0].price) /
                (recentLows[2].index - recentLows[0].index);

            // Project current resistance and support
            const currentResistance = recentHighs[2].price + highSlope *
                (quotes.length - 1 - recentHighs[2].index);
            const currentSupport = recentLows[2].price + lowSlope *
                (quotes.length - 1 - recentLows[2].index);

            // Bullish breakout
            if (last.close > currentResistance && prev.close <= currentResistance) {
                const volumeConfirmed = last.volume > avgVol * 1.2;
                const momentumConfirmed = lastMACD > lastSignal && lastRSI > 50;

                findings.push({
                    type: 'SYMMETRICAL_TRIANGLE_BULL',
                    confidence: volumeConfirmed && momentumConfirmed ? 91 : 78,
                    score: (volumeConfirmed ? 2 : 0) + (momentumConfirmed ? 3 : 0) + 5,
                    message: 'Symmetrical Triangle: Volatility compression breakout',
                    checklist: [
                        { label: "Series of Lower Highs found", status: true },
                        { label: "Series of Higher Lows found", status: true },
                        { label: "Price closed above Resistance", status: true },
                        { label: "Volume Acceleration confirmed", status: volumeConfirmed },
                        { label: "MACD/RSI Momentum alignment", status: momentumConfirmed }
                    ],
                    price: last.close,
                    stop_loss: currentSupport - lastATR,
                    target: last.close + (recentHighs[0].price - recentLows[0].price),
                    volume: last.volume,
                    avg_volume: avgVol
                });
            }

            // Bearish breakdown
            if (last.close < currentSupport && prev.close >= currentSupport) {
                const volumeConfirmed = last.volume > avgVol * 1.2;
                const momentumConfirmed = lastMACD < lastSignal && lastRSI < 50;

                findings.push({
                    type: 'SYMMETRICAL_TRIANGLE_BEAR',
                    confidence: volumeConfirmed && momentumConfirmed ? 'HIGH' : 'MEDIUM',
                    message: 'Symmetrical Triangle bearish breakdown',
                    entry: last.close,
                    stop_loss: currentResistance + lastATR,
                    target: last.close - (recentHighs[0].price - recentLows[0].price),
                    volume_ratio: last.volume / avgVol,
                    rsi: lastRSI,
                    macd_histogram: lastMACD - lastSignal
                });
            }
        }
    }

    // ASCENDING TRIANGLE (bullish)
    if (swingHighs.length >= 2 && swingLows.length >= 3) {
        const recentHighs = swingHighs.slice(-2);
        const recentLows = swingLows.slice(-3);

        // Check for flat resistance
        const flatResistance = Math.abs(recentHighs[1].price - recentHighs[0].price) /
            recentHighs[0].price < 0.02;

        // Check for higher lows
        const higherLows = recentLows[2].price > recentLows[1].price &&
            recentLows[1].price > recentLows[0].price;

        if (flatResistance && higherLows) {
            const resistance = recentHighs[1].price;

            if (last.close > resistance && prev.close <= resistance) {
                findings.push({
                    type: 'ASCENDING_TRIANGLE',
                    confidence: last.volume > avgVol * 1.5 ? 'HIGH' : 'MEDIUM',
                    message: 'Ascending Triangle bullish breakout',
                    entry: last.close,
                    stop_loss: recentLows[2].price - lastATR,
                    target: last.close + (resistance - recentLows[0].price),
                    volume_spike: last.volume > avgVol * 1.5
                });
            }
        }
    }

    // DESCENDING TRIANGLE (bearish)
    if (swingHighs.length >= 3 && swingLows.length >= 2) {
        const recentHighs = swingHighs.slice(-3);
        const recentLows = swingLows.slice(-2);

        // Check for lower highs
        const lowerHighs = recentHighs[2].price < recentHighs[1].price &&
            recentHighs[1].price < recentHighs[0].price;

        // Check for flat support
        const flatSupport = Math.abs(recentLows[1].price - recentLows[0].price) /
            recentLows[0].price < 0.02;

        if (lowerHighs && flatSupport) {
            const support = recentLows[1].price;

            if (last.close < support && prev.close >= support) {
                findings.push({
                    type: 'DESCENDING_TRIANGLE',
                    confidence: last.volume > avgVol * 1.5 ? 'HIGH' : 'MEDIUM',
                    message: 'Descending Triangle bearish breakdown',
                    entry: last.close,
                    stop_loss: recentHighs[2].price + lastATR,
                    target: last.close - (recentHighs[0].price - support),
                    volume_spike: last.volume > avgVol * 1.5
                });
            }
        }
    }

    return findings.map(f => ({
        ...f,
        price: last.close,
        volume: last.volume,
        avg_volume: avgVol,
        date: last.date.toISOString().split('T')[0]
    }));
};

// 💎 SMM DECISION ENGINE (Double Screen System)
const detectSMMSetup = async (symbol, currentInterval) => {
    const higherIntervalMap = { '15m': '1h', '1h': '1d', '1d': '1wk', '1wk': '1mo' };
    const higherInterval = higherIntervalMap[currentInterval] || '1mo';

    const currentData = await fetchYahooData(symbol, currentInterval);
    const higherData = await fetchYahooData(symbol, higherInterval);

    if (currentData.length < 50 || higherData.length < 50) return [];

    const last = currentData[currentData.length - 1];
    const prev = currentData[currentData.length - 2];

    // Calculate indicators
    const currentEMA20 = calculateEMA(currentData, 20);
    const currentEMA50 = calculateEMA(currentData, 50);
    const currentRSI = calculateRSI(currentData);
    const currentMACD = calculateMACD(currentData);
    const currentATR = calculateATR(currentData);

    const htfEMA20 = calculateEMA(higherData, 20);
    const htfEMA50 = calculateEMA(higherData, 50);
    const htfRSI = calculateRSI(higherData);

    const lastRSI = currentRSI[currentRSI.length - 1] || 50;
    const lastHTFRSI = htfRSI[htfRSI.length - 1] || 50;
    const lastMACD = currentMACD.macd[currentMACD.macd.length - 1] || 0;
    const lastSignal = currentMACD.signal[currentMACD.signal.length - 1] || 0;
    const lastATR = currentATR[currentATR.length - 1] || (last.high - last.low) * 0.5;

    const avgVol = currentData.slice(-20).reduce((s, q) => s + q.volume, 0) / 20;

    // Tide (HTF) Trend
    const htfTrendUp = higherData[higherData.length - 1].close > htfEMA20[htfEMA20.length - 1];
    const htfTrendDown = higherData[higherData.length - 1].close < htfEMA20[htfEMA20.length - 1];

    // Wave (Current TF) Momentum
    const waveBullish = last.close > currentEMA20[currentEMA20.length - 1] && lastRSI > 50;
    const waveBearish = last.close < currentEMA20[currentEMA20.length - 1] && lastRSI < 50;

    const findings = [];

    // 🏆 BULL HAT SETUP
    if (htfTrendUp) {
        const rsiValid = lastRSI > 45;
        const emaValid = last.close > currentEMA50[currentEMA50.length - 1];
        const macdCrossing = lastMACD > lastSignal;
        const volConfirmation = last.volume > avgVol;
        const priceAction = last.close > prev.high;

        const score = [rsiValid, emaValid, macdCrossing, volConfirmation, priceAction].filter(Boolean).length;

        if (score >= 3) {
            findings.push({
                type: 'SMM_BULL_HAT',
                confidence: score === 5 ? 'VERY_HIGH' : score >= 4 ? 'HIGH' : 'MEDIUM',
                score: score,
                message: 'Bull Hat Detected: Market tide is rising, wave alignment complete.',
                checklist: [
                    { label: "Market Tide (HTF) is Bullish", status: true },
                    { label: "Wave Momentum (RSI > 45)", status: rsiValid },
                    { label: "Price above Primary Support (EMA50)", status: emaValid },
                    { label: "MACD Momentum Cross", status: macdCrossing },
                    { label: "Volume Force Confirmation", status: volConfirmation }
                ],
                price: last.close,
                stop_loss: Math.min(last.low, currentEMA50[currentEMA50.length - 1]) - lastATR,
                target: last.close + (last.close - currentEMA50[currentEMA50.length - 1]) * 4,
                volume: last.volume,
                avg_volume: avgVol,
                date: last.date.toISOString().split('T')[0]
            });
        }
    }

    // 🏆 BEAR HAT SETUP
    if (htfTrendDown) {
        const rsiValid = lastRSI < 55;
        const emaValid = last.close < currentEMA50[currentEMA50.length - 1];
        const macdCrossing = lastMACD < lastSignal;
        const volConfirmation = last.volume > avgVol;
        const priceAction = last.close < prev.low;

        const score = [rsiValid, emaValid, macdCrossing, volConfirmation, priceAction].filter(Boolean).length;

        if (score >= 3) {
            findings.push({
                type: 'SMM_BEAR_HAT',
                confidence: score === 5 ? 'VERY_HIGH' : score >= 4 ? 'HIGH' : 'MEDIUM',
                score: score,
                message: 'Bear Hat Detected: Market tide is falling, wave breakdown confirmed.',
                checklist: [
                    { label: "Market Tide (HTF) is Bearish", status: true },
                    { label: "Wave Weakness (RSI < 55)", status: rsiValid },
                    { label: "Price below Primary Resistance (EMA50)", status: emaValid },
                    { label: "MACD Bearish Cross", status: macdCrossing },
                    { label: "Selling Volume Pressure", status: volConfirmation }
                ],
                price: last.close,
                stop_loss: Math.max(last.high, currentEMA50[currentEMA50.length - 1]) + lastATR,
                target: last.close - (currentEMA50[currentEMA50.length - 1] - last.close) * 4,
                volume: last.volume,
                avg_volume: avgVol,
                date: last.date.toISOString().split('T')[0]
            });
        }
    }

    return findings.map(f => ({
        ...f,
        symbol: symbol.replace('.NS', '')
    }));
};

// Helper functions
const isNeutral = (q) => Math.abs(q.close - q.open) < (q.high - q.low) * 0.3;
const isBullish = (q) => q.close > q.open;
const isBearish = (q) => q.close < q.open;

// Data Fetching
const fetchYahooData = async (symbol, interval) => {
    try {
        let range = '1y';
        if (interval === '15m') range = '5d';
        if (interval === '1h') range = '1mo';
        if (interval === '1wk') range = '5y';
        if (interval === '1mo') range = 'max';

        const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=${interval}&range=${range}`;
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000);

        const response = await fetch(url, {
            headers: { 'User-Agent': 'Mozilla/5.0' },
            signal: controller.signal
        });
        clearTimeout(timeout);

        if (!response.ok) {
            console.error(`Yahoo API error for ${symbol}: ${response.status}`);
            return [];
        }

        const data = await response.json();
        const res = data.chart.result?.[0];
        if (!res || !res.timestamp) return [];

        const q = res.indicators.quote[0];
        const adj = res.indicators.adjclose?.[0]?.adjclose || q.close;

        return res.timestamp.map((t, i) => ({
            date: new Date(t * 1000),
            open: q.open[i] || q.close[i],
            high: q.high[i] || q.close[i],
            low: q.low[i] || q.close[i],
            close: q.close[i] || adj[i],
            volume: q.volume[i] || 0
        })).filter(x => x.close != null && !isNaN(x.close));
    } catch (e) {
        console.error(`Fetch error for ${symbol}:`, e.message);
        return [];
    }
};

// API Endpoints
app.get('/api/scan', async (req, res) => {
    const timeframe = req.query.timeframe || '1d';
    const limit = parseInt(req.query.limit) || 30;
    const category = req.query.category || 'ALL';
    const minConfidence = req.query.minConfidence || 'MEDIUM';

    const results = [];
    const stocksToScan = NIFTY_STOCKS.slice(0, limit);

    for (let i = 0; i < stocksToScan.length; i += 10) {
        const batch = stocksToScan.slice(i, i + 10);
        await Promise.all(batch.map(async (symbol) => {
            const data = await fetchYahooData(symbol, timeframe);
            if (data.length < 50) return;

            const patterns = detectPAPAPatterns(data);
            patterns.forEach(p => {
                if ((category === 'ALL' || p.type.includes(category)) &&
                    (minConfidence === 'ALL' || p.confidence === minConfidence)) {
                    results.push({ ...p, symbol: symbol.replace('.NS', '') });
                }
            });
        }));
    }

    res.json({
        status: "success",
        timestamp: new Date().toISOString(),
        count: results.length,
        data: results.sort((a, b) => {
            const confScore = { 'HIGH': 3, 'MEDIUM': 2, 'LOW': 1 };
            return (confScore[b.confidence] || 0) - (confScore[a.confidence] || 0);
        })
    });
});

app.get('/api/scan-ha', async (req, res) => {
    const timeframe = req.query.timeframe || '1d';
    const limit = parseInt(req.query.limit) || 30;
    const results = [];
    const stocksToScan = NIFTY_STOCKS.slice(0, limit);

    for (let i = 0; i < stocksToScan.length; i += 15) {
        const batch = stocksToScan.slice(i, i + 15);
        await Promise.all(batch.map(async (symbol) => {
            const data = await fetchYahooData(symbol, timeframe);
            if (data.length < 50) return;
            const patterns = detectHA(data);
            patterns.forEach(p => results.push({ ...p, symbol: symbol.replace('.NS', '') }));
        }));
    }

    res.json({
        status: "success",
        timestamp: new Date().toISOString(),
        count: results.length,
        data: results
    });
});

app.get('/api/scan-bullish', async (req, res) => {
    const timeframe = req.query.timeframe || '1d';
    const limit = parseInt(req.query.limit) || 40;
    const results = [];
    const stocksToScan = NIFTY_STOCKS.slice(0, limit);

    for (let i = 0; i < stocksToScan.length; i += 15) {
        const batch = stocksToScan.slice(i, i + 15);
        await Promise.all(batch.map(async (symbol) => {
            const data = await fetchYahooData(symbol, timeframe);
            if (data.length < 50) return;

            const patterns = detectPAPAPatterns(data);
            const bullishTypes = [
                'DOUBLE_BOTTOM', 'INVERSE_HS', 'BULL_FLAG', 'MORNING_STAR',
                'HAMMER', 'PIERCING', 'THREE_WHITE_SOLDIERS', 'BULLISH_ENGULFING',
                'SYMMETRICAL_TRIANGLE_BULL', 'ASCENDING_TRIANGLE', 'ENDING_DIAGONAL_BULLISH',
                'BULLS_COUNTER_ATTACK', 'SANDWICH_PATTERN', 'ROUNDING_BOTTOM', 'GENUINE_BO', 'FAKE_BD', 'GAP_UP'
            ];

            patterns.forEach(p => {
                if (bullishTypes.includes(p.type)) {
                    results.push({ ...p, symbol: symbol.replace('.NS', '') });
                }
            });
        }));
    }

    res.json({
        status: "success",
        timestamp: new Date().toISOString(),
        count: results.length,
        data: results
    });
});

app.get('/api/scan-bearish', async (req, res) => {
    const timeframe = req.query.timeframe || '1d';
    const limit = parseInt(req.query.limit) || 40;
    const results = [];
    const stocksToScan = NIFTY_STOCKS.slice(0, limit);

    for (let i = 0; i < stocksToScan.length; i += 15) {
        const batch = stocksToScan.slice(i, i + 15);
        await Promise.all(batch.map(async (symbol) => {
            const data = await fetchYahooData(symbol, timeframe);
            if (data.length < 50) return;

            const patterns = detectPAPAPatterns(data);
            const bearishTypes = [
                'DOUBLE_TOP', 'HEAD_SHOULDERS', 'BEAR_FLAG', 'EVENING_STAR',
                'SHOOTING_STAR', 'DARK_CLOUD', 'THREE_BLACK_CROWS', 'BEARISH_ENGULFING',
                'SYMMETRICAL_TRIANGLE_BEAR', 'DESCENDING_TRIANGLE', 'ENDING_DIAGONAL_BEARISH',
                'BEARS_COUNTER_ATTACK', 'ROUNDING_TOP', 'GENUINE_BD', 'FAKE_BO', 'GAP_DOWN'
            ];

            patterns.forEach(p => {
                if (bearishTypes.includes(p.type)) {
                    results.push({ ...p, symbol: symbol.replace('.NS', '') });
                }
            });
        }));
    }

    res.json({
        status: "success",
        timestamp: new Date().toISOString(),
        count: results.length,
        data: results
    });
});

app.get('/api/third-wave', async (req, res) => {
    const timeframe = req.query.timeframe || '1d';
    const limit = parseInt(req.query.limit) || 40;
    const results = [];
    const stocksToScan = NIFTY_STOCKS.slice(0, limit);

    for (let i = 0; i < stocksToScan.length; i += 15) {
        const batch = stocksToScan.slice(i, i + 15);
        await Promise.all(batch.map(async (symbol) => {
            const data = await fetchYahooData(symbol, timeframe);
            if (data.length < 80) return;
            const patterns = detectThirdWaveSetup(data);
            patterns.forEach(p => {
                results.push({ ...p, symbol: symbol.replace('.NS', '') });
            });
        }));
    }

    res.json({
        status: "success",
        timestamp: new Date().toISOString(),
        count: results.length,
        data: results
    });
});

app.get('/api/ending-diagonal', async (req, res) => {
    const timeframe = req.query.timeframe || '1d';
    const limit = parseInt(req.query.limit) || 30;
    const results = [];
    const stocksToScan = NIFTY_STOCKS.slice(0, limit);

    for (let i = 0; i < stocksToScan.length; i += 15) {
        const batch = stocksToScan.slice(i, i + 15);
        await Promise.all(batch.map(async (symbol) => {
            const data = await fetchYahooData(symbol, timeframe);
            if (data.length < 80) return;
            const patterns = detectEndingDiagonal(data);
            patterns.forEach(p => {
                results.push({ ...p, symbol: symbol.replace('.NS', '') });
            });
        }));
    }

    res.json({
        status: "success",
        timestamp: new Date().toISOString(),
        count: results.length,
        data: results
    });
});

app.get('/api/triangle-breakout', async (req, res) => {
    const timeframe = req.query.timeframe || '1d';
    const limit = parseInt(req.query.limit) || 30;
    const results = [];
    const stocksToScan = NIFTY_STOCKS.slice(0, limit);

    for (let i = 0; i < stocksToScan.length; i += 15) {
        const batch = stocksToScan.slice(i, i + 15);
        await Promise.all(batch.map(async (symbol) => {
            const data = await fetchYahooData(symbol, timeframe);
            if (data.length < 80) return;
            const patterns = detectTriangleBreakout(data);
            patterns.forEach(p => {
                results.push({ ...p, symbol: symbol.replace('.NS', '') });
            });
        }));
    }

    res.json({
        status: "success",
        timestamp: new Date().toISOString(),
        count: results.length,
        data: results
    });
});

app.get('/api/smm-scanner', async (req, res) => {
    const timeframe = req.query.timeframe || '1d';
    const limit = parseInt(req.query.limit) || 20;
    const results = [];
    const stocksToScan = NIFTY_STOCKS.slice(0, limit);

    console.log(`Starting SMM Scan for ${stocksToScan.length} stocks on ${timeframe}...`);

    await Promise.all(stocksToScan.map(async (symbol) => {
        const patterns = await detectSMMSetup(symbol, timeframe);
        patterns.forEach(p => results.push(p));
    }));

    res.json({
        status: "success",
        timestamp: new Date().toISOString(),
        count: results.length,
        data: results.sort((a, b) => {
            return (b.confidence || 0) - (a.confidence || 0);
        })
    });
});

app.get('/api/market-summary', async (req, res) => {
    const timeframe = req.query.timeframe || '1d';
    const limit = parseInt(req.query.limit) || 50;
    const stocksToScan = NIFTY_STOCKS.slice(0, limit);

    let bullish = 0, bearish = 0, neutral = 0;
    const patterns = [];

    await Promise.all(stocksToScan.map(async (symbol) => {
        const data = await fetchYahooData(symbol, timeframe);
        if (data.length < 50) return;

        const rsi = calculateRSI(data);
        const lastRSI = rsi[rsi.length - 1] || 50;

        if (lastRSI > 55) bullish++;
        else if (lastRSI < 45) bearish++;
        else neutral++;

        const stockPatterns = detectPAPAPatterns(data);
        stockPatterns.forEach(p => {
            patterns.push(p.type);
        });
    }));

    // Count pattern frequencies
    const patternCount = {};
    patterns.forEach(p => {
        patternCount[p] = (patternCount[p] || 0) + 1;
    });

    const topPatterns = Object.entries(patternCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([type, count]) => ({ type, count }));

    res.json({
        status: "success",
        timestamp: new Date().toISOString(),
        summary: {
            total: bullish + bearish + neutral,
            bullish,
            bearish,
            neutral,
            bullish_percent: ((bullish / (bullish + bearish + neutral)) * 100).toFixed(1),
            bearish_percent: ((bearish / (bullish + bearish + neutral)) * 100).toFixed(1)
        },
        top_patterns: topPatterns
    });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Enhanced PAPA Scanner Live on http://localhost:${PORT}`));