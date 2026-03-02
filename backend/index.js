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

// 📦 ADVANCED BOX BREAKOUT/BREAKDOWN ENGINE (NSE PRO)
// Corrected and accurate logic for Indian Stock Market

const detectBoxBreakout = (quotes, symbol = '', timeframe = '1d') => {
    // ========== INTRADAY-OPTIMIZED PARAMETERS ==========
    const timeframeConfig = {
        '5m': {
            minCandles: 40,
            lookback: 20,
            minTouches: 3,              // PRO Mode: Exactly 3 touches min
            minInside: 0.65,
            widthRange: [1, 12],         // PRO Mode: Tight compression
            touchZone: 0.01,              // PRO Mode: Max 1% diff (Equal Highs/Lows)
            breakoutThreshold: 1.002,
            confirmationThreshold: 1.004,
            volumeMultiplier: 1.3,
            rsiBullish: [40, 60],            // PRO Mode: RSI 40-60 during consolidation
            rsiBearish: [40, 60]
        },
        '15m': {
            minCandles: 40,
            lookback: 25,
            minTouches: 3,
            minInside: 0.65,
            widthRange: [1, 12],
            touchZone: 0.01,
            breakoutThreshold: 1.0025,
            confirmationThreshold: 1.005,
            volumeMultiplier: 1.4,
            rsiBullish: [40, 60],
            rsiBearish: [40, 60]
        },
        '1h': {
            minCandles: 35,
            lookback: 30,
            minTouches: 3,
            minInside: 0.70,
            widthRange: [1, 12],
            touchZone: 0.01,
            breakoutThreshold: 1.003,
            confirmationThreshold: 1.006,
            volumeMultiplier: 1.5,
            rsiBullish: [40, 60],
            rsiBearish: [40, 60]
        },
        '1d': {
            minCandles: 50,
            lookback: 40,
            minTouches: 3,
            minInside: 0.75,
            widthRange: [1, 12],
            touchZone: 0.01,
            breakoutThreshold: 1.005,
            confirmationThreshold: 1.01,
            volumeMultiplier: 1.8,
            rsiBullish: [40, 60],
            rsiBearish: [40, 60]
        }
    };

    const config = timeframeConfig[timeframe] || timeframeConfig['1d'];

    // Early exit if not enough data
    if (quotes.length < config.minCandles) return [];

    const results = [];
    const last = quotes[quotes.length - 1];
    const prevCandle = quotes[quotes.length - 2] || last;

    // ========== TECHNICAL INDICATORS (Optimized) ==========
    const rsiArr = calculateRSI(quotes, 9); // Shorter RSI for intraday
    const atrArr = calculateATR(quotes, 10); // Shorter ATR
    const closePrices = quotes.map(q => q.close);
    const volumes = quotes.map(q => q.volume);

    // Adaptive MAs for intraday
    const smaFast = calculateSMA(closePrices, timeframe.includes('m') ? 8 : 20);
    const smaSlow = calculateSMA(closePrices, timeframe.includes('m') ? 15 : 50);
    const volumeSMA = calculateSMA(volumes, timeframe.includes('m') ? 10 : 20);

    const lastRSI = rsiArr[rsiArr.length - 1] || 50;
    const prevRSI = rsiArr[rsiArr.length - 2] || 50;
    const lastATR = atrArr[atrArr.length - 1] || (last.high - last.low);
    const lastSMAFast = smaFast[smaFast.length - 1] || last.close;
    const lastSMASlow = smaSlow[smaSlow.length - 1] || last.close;
    const avgVol = volumeSMA[volumeSMA.length - 1] || last.volume;

    // PRO RULE: Avoid stocks that already gave breakout more than 3% from box
    // Check if the current close is absurdly separated from ATR bounds before even finding box

    // ========== DYNAMIC BOX DETECTION ==========
    // Use multiple lookback periods for better detection
    const boxCandidates = detectMultipleBoxPeriods(quotes, config, timeframe);

    // Select the best box
    const selectedBox = selectBestBox(boxCandidates, last.close);
    if (!selectedBox) return [];

    const {
        support: boxSupport,
        resistance: boxResistance,
        lookback: boxLookback,
        touches,
        insidePercent,
        quality
    } = selectedBox;

    // PRO RULE: Avoid stocks that already gave breakout more than 3% from box
    if (last.close > boxResistance * 1.03 || last.close < boxSupport * 0.97) {
        return [];
    }

    const boxWidth = boxResistance - boxSupport;
    const boxWidthPercent = (boxWidth / boxSupport) * 100;

    // ========== CURRENT POSITION WITHIN BOX ==========
    const positionInBox = (last.close - boxSupport) / (boxResistance - boxSupport);
    const nearResistance = positionInBox > 0.75;
    const nearSupport = positionInBox < 0.25;
    const inMiddle = positionInBox >= 0.25 && positionInBox <= 0.75;

    // ========== VOLUME ANALYSIS ==========
    const volumeSpike = analyzeVolumeSpike(volumes, avgVol, 5);
    const volumeRatio = volumeSpike.currentRatio;

    // ========== MOMENTUM ANALYSIS ==========
    const momentum = analyzeMomentum(quotes.slice(-5));
    const priceVelocity = calculatePriceVelocity(quotes.slice(-3));

    // ========== EXACT BOUNDARY DETECTION ==========
    // Accurate prediction for stocks sitting exactly at Support / Resistance lines
    const distanceToRes = (boxResistance - last.close) / boxResistance;
    const distanceToSup = (last.close - boxSupport) / boxSupport;

    // Near boundary means price is within 1.5% of the levels (Intraday) or 2.5% (Daily)
    const nearBoundaryThreshold = timeframe.includes('m') ? 0.015 : 0.025;

    const nearBullishBreakout = (distanceToRes >= 0 && distanceToRes <= nearBoundaryThreshold) || positionInBox >= 0.85;
    const nearBearishBreakout = (distanceToSup >= 0 && distanceToSup <= nearBoundaryThreshold) || positionInBox <= 0.15;

    // ========== ACTUAL BREAKOUT DETECTION ==========
    const bullBreakout = last.close > boxResistance * config.breakoutThreshold &&
        last.high > boxResistance * config.confirmationThreshold;

    const bearBreakout = last.close < boxSupport * (2 - config.breakoutThreshold) &&
        last.low < boxSupport * (2 - config.confirmationThreshold);

    // ========== EARLY SIGNAL DETECTION ==========
    if (nearBullishBreakout || bullBreakout) {
        const confidence = calculateIntradayConfidence({
            isBreakout: bullBreakout,
            isNearBreakout: nearBullishBreakout,
            volumeRatio,
            rsi: lastRSI,
            rsiPrev: prevRSI,
            momentum,
            boxQuality: quality,
            touches: touches.resistance,
            positionInBox,
            smaFast: lastSMAFast,
            smaSlow: lastSMASlow,
            currentPrice: last.close,
            atr: lastATR,
            boxWidth,
            config,
            candle: last,
            prevCandle,
            type: 'BULLISH'
        });

        if (confidence >= 65) { // Lower threshold for intraday
            results.push(createIntradayResult(
                'BULLISH',
                bullBreakout ? 'BREAKOUT' : 'NEAR_RESISTANCE',
                symbol,
                last,
                boxSupport,
                boxResistance,
                boxWidth,
                boxWidthPercent,
                boxLookback,
                touches,
                quality,
                insidePercent,
                volumeRatio,
                lastRSI,
                momentum,
                lastSMAFast,
                lastSMASlow,
                lastATR,
                confidence,
                timeframe
            ));
        }
    }

    if (nearBearishBreakout || bearBreakout) {
        const confidence = calculateIntradayConfidence({
            isBreakout: bearBreakout,
            isNearBreakout: nearBearishBreakout,
            volumeRatio,
            rsi: lastRSI,
            rsiPrev: prevRSI,
            momentum,
            boxQuality: quality,
            touches: touches.support,
            positionInBox,
            smaFast: lastSMAFast,
            smaSlow: lastSMASlow,
            currentPrice: last.close,
            atr: lastATR,
            boxWidth,
            config,
            candle: last,
            prevCandle,
            type: 'BEARISH'
        });

        if (confidence >= 65) {
            results.push(createIntradayResult(
                'BEARISH',
                bearBreakout ? 'BREAKDOWN' : 'NEAR_SUPPORT',
                symbol,
                last,
                boxSupport,
                boxResistance,
                boxWidth,
                boxWidthPercent,
                boxLookback,
                touches,
                quality,
                insidePercent,
                volumeRatio,
                lastRSI,
                momentum,
                lastSMAFast,
                lastSMASlow,
                lastATR,
                confidence,
                timeframe
            ));
        }
    }

    return results;
};

// ========== ENHANCED HELPER FUNCTIONS FOR INTRADAY ==========

function detectMultipleBoxPeriods(quotes, config, timeframe) {
    const candidates = [];
    const periods = [
        Math.floor(config.lookback * 0.6), // Shorter
        config.lookback,                    // Medium
        Math.floor(config.lookback * 1.4)   // Longer
    ];

    periods.forEach(lookback => {
        const startIdx = Math.max(0, quotes.length - lookback - 5);
        const slice = quotes.slice(startIdx, -1);

        if (slice.length < 10) return;

        // Detect box using multiple methods
        const box1 = detectBoxByPercentile(slice, config.widthRange[0], config.widthRange[1]);
        const box2 = detectBoxByClustering(slice, config.widthRange[0], config.widthRange[1]);
        const box3 = detectBoxByHVMode(slice, config.widthRange[0], config.widthRange[1]);

        [box1, box2, box3].forEach(box => {
            if (box && box.support && box.resistance) {
                const touches = detectTouches(slice, box.support, box.resistance, config.touchZone);

                // PRO MODE: Minimum touch threshold requirement (Equal Highs & Lows enforced by touchZone)
                if (touches.resistance < config.minTouches || touches.support < config.minTouches) return;

                const insidePercent = calculateInsidePercent(slice, box.support, box.resistance, timeframe);

                // PRO MODE: Volume should contract during consolidation
                const volAnalysis = analyzeVolume(slice);
                if (!volAnalysis.contracting) return;

                // Rank by tightest range and lowest volatility
                const quality = (touches.resistance + touches.support) * insidePercent * 10;

                candidates.push({
                    ...box,
                    lookback,
                    touches,
                    insidePercent,
                    quality,
                    volRatio: volAnalysis.ratio,
                    slice
                });
            }
        });
    });

    return candidates;
}

function selectBestBox(candidates, currentPrice) {
    if (candidates.length === 0) return null;

    // Score each candidate (PRO MODE: rank by tightest range & lowest volatility)
    const scored = candidates.map(c => {
        let score = c.quality;

        // Prefer boxes where current price is within range
        if (currentPrice >= c.support && currentPrice <= c.resistance) {
            score *= 1.5;
        }

        // Prefer boxes with more touches (Proof of equal highs/lows)
        score += (c.touches.resistance + c.touches.support) * 2;

        // Prefer more recent boxes
        score += (c.lookback / 10);

        // PRO MODE: Heavily reward tight ranges (punish wider ones)
        const width = c.boxWidthPercent || (((c.resistance - c.support) / c.support) * 100);
        score += (12 - width) * 2; // Rewards tighter boxes more

        return { ...c, score };
    });

    // Sort by score and return best
    scored.sort((a, b) => b.score - a.score);
    return scored[0];
}

function detectBoxByPercentile(slice, minWidth, maxWidth) {
    const highs = slice.map(q => q.high);
    const lows = slice.map(q => q.low);

    const sortedHighs = [...highs].sort((a, b) => a - b);
    const sortedLows = [...lows].sort((a, b) => a - b);

    const resistance = sortedHighs[Math.floor(sortedHighs.length * 0.85)];
    const support = sortedLows[Math.floor(sortedLows.length * 0.15)];

    if (!resistance || !support || resistance <= support) return null;

    const width = ((resistance - support) / support) * 100;
    if (width < minWidth || width > maxWidth) return null;

    return { support, resistance };
}

function detectBoxByClustering(slice, minWidth, maxWidth) {
    // Find price clusters for support and resistance
    const highs = slice.map(q => q.high);
    const lows = slice.map(q => q.low);
    const closes = slice.map(q => q.close);

    const allPrices = [...highs, ...lows, ...closes].sort((a, b) => a - b);

    // Find clusters
    const clusters = [];
    const tolerance = 0.015; // 1.5% tolerance

    allPrices.forEach(price => {
        let found = false;
        for (let cluster of clusters) {
            if (Math.abs(price - cluster.price) / cluster.price <= tolerance) {
                cluster.count++;
                cluster.price = (cluster.price * (cluster.count - 1) + price) / cluster.count;
                found = true;
                break;
            }
        }
        if (!found) {
            clusters.push({ price, count: 1 });
        }
    });

    // Sort clusters by count
    clusters.sort((a, b) => b.count - a.count);

    // Find potential support (lower cluster) and resistance (upper cluster)
    if (clusters.length < 2) return null;

    const avgPrice = clusters.reduce((sum, c) => sum + c.price, 0) / clusters.length;
    const lowerClusters = clusters.filter(c => c.price < avgPrice);
    const upperClusters = clusters.filter(c => c.price > avgPrice);

    if (lowerClusters.length === 0 || upperClusters.length === 0) return null;

    lowerClusters.sort((a, b) => b.price - a.price);
    upperClusters.sort((a, b) => a.price - b.price);

    const support = lowerClusters[0].price;
    const resistance = upperClusters[0].price;

    const width = ((resistance - support) / support) * 100;
    if (width < minWidth || width > maxWidth) return null;

    return { support, resistance };
}

function detectBoxByHVMode(slice, minWidth, maxWidth) {
    // Use high-volume nodes as potential S/R
    const volumeByPrice = new Map();

    slice.forEach(candle => {
        const priceKey = Math.round(candle.close * 100) / 100;
        const current = volumeByPrice.get(priceKey) || 0;
        volumeByPrice.set(priceKey, current + candle.volume);
    });

    // Sort by volume
    const sorted = Array.from(volumeByPrice.entries())
        .sort((a, b) => b[1] - a[1])
        .map(entry => entry[0]);

    if (sorted.length < 2) return null;

    // Find support (lower price with high volume)
    const medianIndex = Math.floor(sorted.length / 2);
    const lowerPrices = sorted.slice(0, medianIndex);
    const upperPrices = sorted.slice(medianIndex);

    if (lowerPrices.length === 0 || upperPrices.length === 0) return null;

    const support = Math.min(...lowerPrices);
    const resistance = Math.max(...upperPrices);

    const width = ((resistance - support) / support) * 100;
    if (width < minWidth || width > maxWidth) return null;

    return { support, resistance };
}

function analyzeVolumeSpike(volumes, avgVol, lookback = 5) {
    const recent = volumes.slice(-lookback);
    const currentVolume = recent[recent.length - 1];
    const recentAvg = recent.slice(0, -1).reduce((s, v) => s + v, 0) / (lookback - 1);

    return {
        currentRatio: avgVol > 0 ? currentVolume / avgVol : 1,
        recentRatio: recentAvg > 0 ? currentVolume / recentAvg : 1,
        spiking: currentVolume > recentAvg * 1.3
    };
}

function analyzeMomentum(recentCandles) {
    if (recentCandles.length < 3) return { bullish: false, bearish: false, strength: 0 };

    const closes = recentCandles.map(c => c.close);
    const changes = [];

    for (let i = 1; i < closes.length; i++) {
        changes.push(closes[i] - closes[i - 1]);
    }

    const avgChange = changes.reduce((s, c) => s + c, 0) / changes.length;
    const positiveCount = changes.filter(c => c > 0).length;
    const negativeCount = changes.filter(c => c < 0).length;

    return {
        bullish: avgChange > 0 && positiveCount >= 2,
        bearish: avgChange < 0 && negativeCount >= 2,
        strength: Math.abs(avgChange) / (recentCandles[0].close || 1) * 100,
        consecutive: Math.max(positiveCount, negativeCount)
    };
}

function calculatePriceVelocity(recentCandles) {
    if (recentCandles.length < 2) return 0;

    const first = recentCandles[0].close;
    const last = recentCandles[recentCandles.length - 1].close;

    return (last - first) / first * 100;
}

function calculateIntradayConfidence(params) {
    const {
        isBreakout,
        isNearBreakout,
        volumeRatio,
        rsi,
        rsiPrev,
        momentum,
        boxQuality,
        touches,
        positionInBox,
        smaFast,
        smaSlow,
        currentPrice,
        atr,
        boxWidth,
        config,
        candle,
        prevCandle,
        type
    } = params;

    let confidence = isBreakout ? 70 : 60; // Base confidence
    const isBullish = type === 'BULLISH';

    // Volume score
    if (volumeRatio >= config.volumeMultiplier) confidence += 12;
    else if (volumeRatio >= 1.2) confidence += 6;
    else if (volumeRatio >= 1.0) confidence += 3;

    // RSI score
    if (isBullish) {
        if (rsi >= config.rsiBullish[0] && rsi <= config.rsiBullish[1]) confidence += 8;
        else if (rsi > config.rsiBullish[1] && rsi < 85) confidence += 4; // Overbought but still strong
        if (rsi > rsiPrev) confidence += 3;
    } else {
        if (rsi >= config.rsiBearish[0] && rsi <= config.rsiBearish[1]) confidence += 8;
        else if (rsi < config.rsiBearish[0] && rsi > 15) confidence += 4; // Oversold but still weak
        if (rsi < rsiPrev) confidence += 3;
    }

    // Momentum score
    if ((isBullish && momentum.bullish) || (!isBullish && momentum.bearish)) {
        confidence += 10;
        if (momentum.consecutive >= 2) confidence += 5;
        if (momentum.strength > 0.5) confidence += 3;
    }

    // Position score
    if (isBreakout) {
        confidence += 15;
    } else if (isNearBreakout) {
        confidence += 8;
        if ((isBullish && positionInBox > 0.85) || (!isBullish && positionInBox < 0.15)) {
            confidence += 5;
        }
    }

    // Box quality score
    confidence += Math.min(8, boxQuality * 2);

    // Touch count score
    confidence += Math.min(6, touches * 2);

    // SMA score
    if (isBullish && currentPrice > smaFast && currentPrice > smaSlow) confidence += 5;
    else if (!isBullish && currentPrice < smaFast && currentPrice < smaSlow) confidence += 5;
    else if (isBullish && currentPrice > smaFast) confidence += 2;
    else if (!isBullish && currentPrice < smaFast) confidence += 2;

    // Candle strength
    const bodySize = Math.abs(candle.close - candle.open);
    const candleRange = candle.high - candle.low;
    const bodyPercent = (bodySize / candleRange) * 100;

    if (bodyPercent > 70) confidence += 6;
    else if (bodyPercent > 50) confidence += 3;

    // Wick analysis
    if (isBullish) {
        const lowerWick = candle.low - Math.min(candle.open, candle.close);
        if (lowerWick > bodySize * 0.5) confidence += 4; // Hammer/bullish reversal
    } else {
        const upperWick = candle.high - Math.max(candle.open, candle.close);
        if (upperWick > bodySize * 0.5) confidence += 4; // Shooting star/bearish reversal
    }

    // ATR-based volatility score
    const volatilityPercent = (atr / currentPrice) * 100;
    if (volatilityPercent > 0.5 && volatilityPercent < 3) confidence += 4;

    return Math.min(95, confidence);
}

function createIntradayResult(type, signalType, symbol, last, support, resistance,
    boxWidth, boxWidthPercent, lookback, touches, quality, insidePercent,
    volumeRatio, rsi, momentum, smaFast, smaSlow, atr, confidence, timeframe) {

    const isBullish = type === 'BULLISH';
    const currentPrice = last.close;

    // Calculate targets based on ATR and box width
    const target1 = isBullish ?
        currentPrice + boxWidth * 0.5 :
        currentPrice - boxWidth * 0.5;
    const target2 = isBullish ?
        currentPrice + boxWidth :
        currentPrice - boxWidth;
    const target3 = isBullish ?
        currentPrice + boxWidth * 1.5 :
        currentPrice - boxWidth * 1.5;

    // Dynamic stop loss
    const stopDistance = atr * (timeframe.includes('m') ? 0.8 : 0.6);
    const stopLoss = isBullish ?
        Math.min(resistance - boxWidth * 0.2, currentPrice - stopDistance) :
        Math.max(support + boxWidth * 0.2, currentPrice + stopDistance);

    const formattedType = signalType === 'BREAKOUT' ? `BOX_BREAKOUT_BULLISH` :
        signalType === 'BREAKDOWN' ? `BOX_BREAKDOWN_BEARISH` :
            signalType === 'NEAR_RESISTANCE' ? `AT_RESISTANCE_BULLISH` :
                `AT_SUPPORT_BEARISH`;

    const actionText = signalType === 'BREAKOUT' ? 'Breaking Resistance' :
        signalType === 'BREAKDOWN' ? 'Breaking Support' :
            signalType === 'NEAR_RESISTANCE' ? 'Testing Resistance' :
                'Testing Support';

    const level = (signalType === 'NEAR_RESISTANCE' || signalType === 'BREAKOUT') ? resistance : support;

    return {
        symbol,
        type: formattedType,
        confidence,
        urgency: (signalType === 'BREAKOUT' || signalType === 'BREAKDOWN') ? 'HIGH' : 'MEDIUM',
        message: `${symbol}: ${actionText} at Rs.${level.toFixed(2)} | Vol ${volumeRatio.toFixed(1)}x | RSI ${rsi.toFixed(0)}`,

        box_details: {
            support: parseFloat(support.toFixed(2)),
            resistance: parseFloat(resistance.toFixed(2)),
            width_percent: parseFloat(boxWidthPercent.toFixed(2)),
            duration_candles: lookback,
            touches_resistance: touches.resistance,
            touches_support: touches.support,
            quality_score: quality,
            consolidation: parseFloat((insidePercent * 100).toFixed(1)) + '%'
        },

        current_position: {
            price: parseFloat(currentPrice.toFixed(2)),
            distance_to_resistance: (((resistance - currentPrice) / resistance) * 100).toFixed(2) + '%',
            distance_to_support: (((currentPrice - support) / support) * 100).toFixed(2) + '%',
            position_in_box: (((currentPrice - support) / (resistance - support)) * 100).toFixed(0) + '%'
        },

        [isBullish ? 'breakout_details' : 'breakdown_details']: {
            price: parseFloat(currentPrice.toFixed(2)),
            volume_ratio: parseFloat(volumeRatio.toFixed(2)),
            rsi: parseFloat(rsi.toFixed(1)),
            [isBullish ? 'breakout_percent' : 'breakdown_percent']: isBullish ?
                (((currentPrice - resistance) / resistance) * 100).toFixed(2) + '%' :
                (((support - currentPrice) / support) * 100).toFixed(2) + '%'
        },

        breakout_signals: {
            volume_spike: volumeRatio > 1.5,
            momentum: momentum.bullish ? 'BULLISH' : momentum.bearish ? 'BEARISH' : 'NEUTRAL',
            momentum_strength: momentum.strength.toFixed(2) + '%',
            rsi_momentum: rsi > 50 ? 'BULLISH' : 'BEARISH',
            above_sma_fast: currentPrice > smaFast,
            above_sma_slow: currentPrice > smaSlow
        },

        trade_plan: {
            entry: isBullish ?
                [`Rs.${(resistance * 1.001).toFixed(2)} (Aggressive)`, `Rs.${(resistance * 1.005).toFixed(2)} (Conservative)`] :
                [`Rs.${(support * 0.999).toFixed(2)} (Aggressive)`, `Rs.${(support * 0.995).toFixed(2)} (Conservative)`],
            stop_loss: parseFloat(stopLoss.toFixed(2)),
            stop_loss_percent: ((Math.abs(currentPrice - stopLoss) / currentPrice) * 100).toFixed(2) + '%',
            targets: [
                parseFloat(target1.toFixed(2)),
                parseFloat(target2.toFixed(2)),
                parseFloat(target3.toFixed(2))
            ],
            risk_reward: [
                (Math.abs(target1 - currentPrice) / Math.abs(currentPrice - stopLoss)).toFixed(2),
                (Math.abs(target2 - currentPrice) / Math.abs(currentPrice - stopLoss)).toFixed(2),
                (Math.abs(target3 - currentPrice) / Math.abs(currentPrice - stopLoss)).toFixed(2)
            ],
            expected_holding: timeframe
        },

        market_context: {
            volatility: ((atr / currentPrice) * 100).toFixed(2) + '%',
            volume_trend: volumeRatio > 1 ? 'Increasing' : 'Normal',
            trend: currentPrice > smaFast && smaFast > smaSlow ? 'UPTREND' :
                currentPrice < smaFast && smaFast < smaSlow ? 'DOWNTREND' : 'CONSOLIDATING'
        }
    };
}

// ========== HELPER FUNCTIONS ==========

function detectBoxBoundaries(slice, minWidthPercent, maxWidthPercent) {
    // Method 1: Percentile-based (robust to outliers)
    const highs = slice.map(q => q.high);
    const lows = slice.map(q => q.low);

    const sortedHighs = [...highs].sort((a, b) => a - b);
    const sortedLows = [...lows].sort((a, b) => a - b);

    const resIndex = Math.floor(sortedHighs.length * 0.85);
    const supIndex = Math.floor(sortedLows.length * 0.15);

    let boxResistance = sortedHighs[resIndex];
    let boxSupport = sortedLows[supIndex];

    // Method 2: Cluster detection (find price levels with most touches)
    const clusterResistance = findPriceCluster(highs, 0.02);
    const clusterSupport = findPriceCluster(lows, 0.02);

    // Use the more conservative (tighter) boundaries
    if (clusterResistance && clusterResistance < boxResistance) {
        boxResistance = clusterResistance;
    }
    if (clusterSupport && clusterSupport > boxSupport) {
        boxSupport = clusterSupport;
    }

    if (!boxResistance || !boxSupport || boxResistance <= boxSupport) {
        return { boxSupport: null, boxResistance: null };
    }

    const boxWidth = boxResistance - boxSupport;
    const boxWidthPercent = (boxWidth / boxSupport) * 100;

    // Validate width
    if (boxWidthPercent < minWidthPercent || boxWidthPercent > maxWidthPercent) {
        return { boxSupport: null, boxResistance: null };
    }

    return { boxSupport, boxResistance, boxWidth, boxWidthPercent };
}

function findPriceCluster(prices, tolerancePercent) {
    // Group prices into clusters
    const clusters = [];
    const tolerance = 0.01; // 1% tolerance

    prices.forEach(price => {
        let found = false;
        for (let cluster of clusters) {
            if (Math.abs(price - cluster.price) / cluster.price <= tolerance) {
                cluster.count++;
                cluster.price = (cluster.price * (cluster.count - 1) + price) / cluster.count;
                found = true;
                break;
            }
        }
        if (!found) {
            clusters.push({ price, count: 1 });
        }
    });

    // Find the most significant cluster
    clusters.sort((a, b) => b.count - a.count);
    return clusters.length > 0 ? clusters[0].price : null;
}

function detectTouches(slice, support, resistance, touchZone) {
    let touchesResistance = 0;
    let touchesSupport = 0;

    slice.forEach(q => {
        // Resistance touches
        if (Math.abs(q.high - resistance) / resistance < touchZone ||
            (q.close > resistance * 0.98 && q.close < resistance * 1.02)) {
            touchesResistance++;
        }

        // Support touches
        if (Math.abs(q.low - support) / support < touchZone ||
            (q.close > support * 0.98 && q.close < support * 1.02)) {
            touchesSupport++;
        }
    });

    return { resistance: touchesResistance, support: touchesSupport };
}

function calculateInsidePercent(slice, support, resistance, timeframe) {
    const buffer = timeframe.includes('m') ? 0.01 : 0.015; // 1% for intraday, 1.5% for others

    const inside = slice.filter(q =>
        q.high <= resistance * (1 + buffer) &&
        q.low >= support * (1 - buffer)
    ).length;

    return inside / slice.length;
}

function analyzeVolume(slice) {
    const half = Math.floor(slice.length / 2);
    const firstHalf = slice.slice(0, half);
    const secondHalf = slice.slice(half);

    const firstHalfAvg = firstHalf.reduce((s, q) => s + q.volume, 0) / (half || 1);
    const secondHalfAvg = secondHalf.reduce((s, q) => s + q.volume, 0) / ((slice.length - half) || 1);

    return {
        contracting: secondHalfAvg <= firstHalfAvg * 1.1,
        firstHalfAvg,
        secondHalfAvg,
        ratio: secondHalfAvg / firstHalfAvg
    };
}

function analyzeCandle(candle) {
    const bodySize = Math.abs(candle.close - candle.open);
    const candleRange = (candle.high - candle.low) || 1;
    const bodyPercent = (bodySize / candleRange) * 100;
    const upperWick = candle.high - Math.max(candle.open, candle.close);
    const lowerWick = Math.min(candle.open, candle.close) - candle.low;

    return {
        bodyPercent,
        isBullishCandle: candle.close > candle.open,
        isBearishCandle: candle.close < candle.open,
        upperWickPercent: (upperWick / candleRange) * 100,
        lowerWickPercent: (lowerWick / candleRange) * 100,
        isMarubozu: bodyPercent > 90,
        isDoji: bodyPercent < 10
    };
}

function calculateBoxQualityScore(touches, widthPercent, insidePercent, config) {
    const touchScore = Math.min(4, touches.resistance + touches.support - 1);

    let widthScore;
    if (widthPercent >= 5 && widthPercent <= 12) widthScore = 3;
    else if (widthPercent >= 4 && widthPercent <= 15) widthScore = 2;
    else widthScore = 1;

    const consScore = insidePercent >= 0.85 ? 3 : (insidePercent >= 0.75 ? 2 : 1);

    return Math.min(10, Math.round(touchScore + widthScore + consScore));
}



function createBreakoutResult(type, symbol, currentClose, resistance, support,
    boxWidth, boxWidthPercent, lookback, touches, qualityScore, insidePercent,
    volumeRatio, rsi, bodyPercent, isCandleType, sma1, sma2, atr,
    volumeContracting, rsiMomentum, resTouches, supTouches, timeframe, config, candleAnalysis) {

    const isBullish = type === 'BULLISH';

    // Adaptive confidence calculation
    let confidence = 65;

    // Volume (weighted more for intraday)
    const volumeWeight = timeframe.includes('m') ? 1.2 : 1;
    if (volumeRatio >= 2.5) confidence += 18 * volumeWeight;
    else if (volumeRatio >= 2.0) confidence += 13 * volumeWeight;
    else if (volumeRatio >= 1.5) confidence += 8 * volumeWeight;
    else if (volumeRatio >= 1.2) confidence += 4 * volumeWeight;

    // RSI conditions
    if (isBullish) {
        if (rsi > 55 && rsi < 78) confidence += 8;
        else if (rsi >= 50 && rsi <= 55) confidence += 3;
    } else {
        if (rsi < 45 && rsi > 20) confidence += 8;
        else if (rsi >= 45 && rsi <= 50) confidence += 3;
    }

    // Candle strength
    if (bodyPercent > 65 && isCandleType) confidence += 7;
    else if (bodyPercent > 40 && isCandleType) confidence += 3;

    // SMA conditions
    if (isBullish) {
        if (currentClose > sma1 && currentClose > sma2) confidence += 5;
        else if (currentClose > sma1) confidence += 2;
    } else {
        if (currentClose < sma1 && currentClose < sma2) confidence += 5;
        else if (currentClose < sma1) confidence += 2;
    }

    // Momentum
    if (rsiMomentum) confidence += 3;

    // Box quality
    if (qualityScore >= 7) confidence += 5;
    else if (qualityScore >= 5) confidence += 2;

    if (volumeContracting) confidence += 4;
    if (resTouches >= 3 && supTouches >= 3) confidence += 4;

    // Wick analysis (new)
    if (isBullish && candleAnalysis.lowerWickPercent > 60) confidence += 3; // Hammer-like
    if (!isBullish && candleAnalysis.upperWickPercent > 60) confidence += 3; // Shooting star-like

    confidence = Math.min(97, confidence);

    if (confidence < 70) return null;

    const basePrice = isBullish ? resistance : support;
    const breakoutPercent = isBullish ?
        ((currentClose - resistance) / resistance * 100) :
        ((support - currentClose) / support * 100);

    // Adaptive holding period
    const getHoldingPeriod = () => {
        if (timeframe.includes('m')) return '30-120 mins';
        if (timeframe === '1h') return '3-12 hours';
        if (timeframe === '1d') return '2-10 days';
        if (timeframe === '1wk') return '2-6 weeks';
        return '1-3 months';
    };

    return {
        symbol,
        type: `BOX_BREAKOUT_${type}`,
        confidence,
        score: qualityScore,
        message: `${symbol}: ${type} Breakout at Rs.${currentClose.toFixed(2)} | Box ${boxWidthPercent.toFixed(1)}% | Vol ${volumeRatio.toFixed(1)}x | RSI ${rsi.toFixed(0)}`,

        box_details: {
            support: parseFloat(support.toFixed(2)),
            resistance: parseFloat(resistance.toFixed(2)),
            width_percent: parseFloat(boxWidthPercent.toFixed(2)),
            duration_candles: lookback,
            resistance_touches: touches.resistance,
            support_touches: touches.support,
            quality_score: qualityScore,
            inside_percent: parseFloat((insidePercent * 100).toFixed(1))
        },

        breakout_details: {
            price: parseFloat(currentClose.toFixed(2)),
            breakout_percent: breakoutPercent.toFixed(2) + '%',
            volume_ratio: parseFloat(volumeRatio.toFixed(2)),
            rsi: parseFloat(rsi.toFixed(1)),
            candle_body: parseFloat(bodyPercent.toFixed(0)) + '%',
            candle_type: isCandleType ? (isBullish ? 'Bullish' : 'Bearish') : 'Doji'
        },

        trade_plan: {
            entry_zone: isBullish ?
                `Rs.${(resistance * 1.002).toFixed(2)} - Rs.${(resistance * 1.015).toFixed(2)}` :
                `Rs.${(support * 0.998).toFixed(2)} - Rs.${(support * 0.985).toFixed(2)}`,
            stop_loss: parseFloat((isBullish ? resistance - atr * 0.5 : support + atr * 0.5).toFixed(2)),
            stop_loss_percent: ((atr * 0.5 / currentClose) * 100).toFixed(2) + '%',
            target_1: parseFloat((isBullish ? currentClose + boxWidth : currentClose - boxWidth).toFixed(2)),
            target_2: parseFloat((isBullish ? currentClose + boxWidth * 1.5 : currentClose - boxWidth * 1.5).toFixed(2)),
            target_3: parseFloat((isBullish ? currentClose + boxWidth * 2.0 : currentClose - boxWidth * 2.0).toFixed(2)),
            risk_reward_1: parseFloat((boxWidth / (atr * 0.5)).toFixed(2)),
            expected_holding: getHoldingPeriod()
        },

        market_context: {
            vs_sma: ((currentClose / sma1 - 1) * 100).toFixed(2) + '%',
            vs_sma_longer: ((currentClose / sma2 - 1) * 100).toFixed(2) + '%',
            atr_percent: ((atr / currentClose) * 100).toFixed(2) + '%',
            volume_contracting_before: volumeContracting,
            timeframe: timeframe
        }
    };
}

function calculateSMA(values, period) {
    const sma = [];

    for (let i = period - 1; i < values.length; i++) {
        const sum = values.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0);
        sma.push(sum / period);
    }

    // Pad beginning
    while (sma.length < values.length) {
        sma.unshift(sma[0] || values[0] || 0);
    }

    return sma;
}

function calculateConsolidationScore(boxSlice) {
    if (boxSlice.length < 5) return 0;

    // Calculate price movement consistency
    const closes = boxSlice.map(q => q.close);
    const changes = [];

    for (let i = 1; i < closes.length; i++) {
        changes.push(Math.abs(closes[i] - closes[i - 1]) / closes[i - 1]);
    }

    const avgChange = changes.reduce((a, b) => a + b, 0) / changes.length;
    const changeStdDev = Math.sqrt(
        changes.map(c => Math.pow(c - avgChange, 2)).reduce((a, b) => a + b, 0) / changes.length
    );

    // Low standard deviation means tight consolidation
    if (changeStdDev < 0.005) return 2; // Very tight
    if (changeStdDev < 0.01) return 1.5; // Moderate
    if (changeStdDev < 0.015) return 1; // Loose but acceptable

    return 0.5; // Very loose consolidation
}

// Optional: Add F&O specific detection
function detectFOConfirmation(symbol, foData) {
    // Implement if you have F&O data
    // Check OI changes, PCR, etc.
    return {
        isFOStock: false,
        oiChange: 0,
        pcr: 0,
        confirmation: 'neutral'
    };
}


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
        // Range selection: enough candles for box detection (need 50+)
        let range = '1y';           // 1d  → ~252 candles
        if (interval === '5m') range = '5d';   // 5m  → ~390 candles (5d × 78)
        if (interval === '15m') range = '5d';   // 15m → ~130 candles (5d × 26)
        if (interval === '1h') range = '3mo';  // 1h  → ~504 candles (3mo × 168)
        if (interval === '1wk') range = '5y';   // 1wk → ~260 candles
        if (interval === '1mo') range = 'max';  // 1mo → max available

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

const INDICES = [
    { symbol: '^NSEBANK', name: 'Nifty Bank' },
    { symbol: '^CNXIT', name: 'Nifty IT' },
    { symbol: '^CNXAUTO', name: 'Nifty Auto' },
    { symbol: '^CNXFMCG', name: 'Nifty FMCG' },
    { symbol: '^CNXMETAL', name: 'Nifty Metal' },
    { symbol: '^CNXPHARMA', name: 'Nifty Pharma' },
    { symbol: '^CNXPSUBANK', name: 'Nifty PSU Bank' },
    { symbol: '^CNXENERGY', name: 'Nifty Energy' },
    { symbol: '^CNXINFRA', name: 'Nifty Infra' },
    { symbol: '^CNXREALTY', name: 'Nifty Realty' },
    { symbol: '^CNXFIN', name: 'Nifty Fin Service' },
    { symbol: '^CNXCONSUM', name: 'Nifty Consumption' }
];

const SECTOR_CONSTITUENTS = {
    '^NSEBANK': ["HDFCBANK.NS", "ICICIBANK.NS", "SBIN.NS", "KOTAKBANK.NS", "AXISBANK.NS", "INDUSINDBK.NS", "PNB.NS", "BOB.NS", "FEDERALBNK.NS", "IDFCFIRSTB.NS", "AUBANK.NS", "BANDHANBNK.NS"],
    '^CNXIT': ["TCS.NS", "INFY.NS", "HCLTECH.NS", "WIPRO.NS", "TECHM.NS", "LTIM.NS", "COFORGE.NS", "PERSISTENT.NS", "MPHASIS.NS", "BSOFT.NS"],
    '^CNXAUTO': ["M&M.NS", "MARUTI.NS", "TATAMOTORS.NS", "BAJAJ-AUTO.NS", "EICHERMOT.NS", "HEROMOTOCO.NS", "TVSMOTOR.NS", "ASHOKLEY.NS", "ESCORTS.NS", "BOSCHLTD.NS", "TIINDIA.NS", "MOTHERSON.NS"],
    '^CNXFMCG': ["ITC.NS", "HINDUNILVR.NS", "NESTLEIND.NS", "BRITANNIA.NS", "TATACONSUM.NS", "GODREJCP.NS", "DABUR.NS", "MARICO.NS", "COLPAL.NS", "UBL.NS", "MCDOWELL-N.NS", "PGHH.NS", "RADICO.NS"],
    '^CNXMETAL': ["TATASTEEL.NS", "JSWSTEEL.NS", "HINDALCO.NS", "JINDALSTEL.NS", "SAIL.NS", "COALINDIA.NS", "NMDC.NS", "NATIONALUM.NS", "VEDL.NS", "APLAPOLLO.NS"],
    '^CNXPHARMA': ["SUNPHARMA.NS", "CIPLA.NS", "DRREDDY.NS", "DIVISLAB.NS", "LUPIN.NS", "AUROPHARMA.NS", "TORNTPHARM.NS", "ZYDUSLIFE.NS", "BIOCON.NS", "GLENMARK.NS", "ALKEM.NS"],
    '^CNXENERGY': ["RELIANCE.NS", "ONGC.NS", "NTPC.NS", "POWERGRID.NS", "BPCL.NS", "IOC.NS", "GAIL.NS", "TATAPOWER.NS", "ADANIGREEN.NS", "ADANIENT.NS"],
    '^CNXINFRA': ["LT.NS", "ULTRACEMCO.NS", "GRASIM.NS", "AMBUJACEM.NS", "SHREECEM.NS", "DLF.NS", "GMRINFRA.NS", "IRB.NS", "KNRCON.NS", "PNCINFRA.NS"],
    '^CNXREALTY': ["DLF.NS", "LODHA.NS", "GODREJPROP.NS", "OBEROIRLTY.NS", "PRESTIGE.NS", "PHOENIXLTD.NS", "BRIGADE.NS", "SOBHA.NS", "MAHLIFE.NS"],
    '^CNXPSUBANK': ["SBIN.NS", "PNB.NS", "BOB.NS", "CANBK.NS", "UNIONBANK.NS", "BANKINDIA.NS", "INDIANB.NS", "IOB.NS", "MAHABANK.NS", "UCOBANK.NS"],
    '^CNXFIN': ["HDFCBANK.NS", "ICICIBANK.NS", "BAJFINANCE.NS", "BAJAJFINSV.NS", "KOTAKBANK.NS", "AXISBANK.NS", "SBILIFE.NS", "HDFCLIFE.NS", "CHOLAFIN.NS", "PFC.NS", "RECLTD.NS", "MUTHOOTFIN.NS"],
    '^CNXCONSUM': ["ITC.NS", "HINDUNILVR.NS", "TITAN.NS", "ASIANPAINT.NS", "MARUTI.NS", "NESTLEIND.NS", "M&M.NS", "BRITANNIA.NS", "TRENT.NS", "TATAMOTORS.NS"]
};

app.get('/api/scan-indices', async (req, res) => {
    try {
        const timeframe = req.query.timeframe || '1d';

        // Fetch Nifty 50 Benchmark
        const niftyData = await fetchYahooData('^NSEI', timeframe);
        if (!niftyData || niftyData.length < 20) {
            return res.status(500).json({ status: 'error', message: 'Failed to fetch NIFTY benchmark data' });
        }

        const closeCurrent = (quotes) => quotes[quotes.length - 1].close;
        const closePast = (quotes, periodsAgo) => quotes[Math.max(0, quotes.length - 1 - periodsAgo)].close;

        const calcReturn = (quotes, periodsAgo) => {
            const current = closeCurrent(quotes);
            const past = closePast(quotes, periodsAgo);
            return ((current - past) / past) * 100;
        };

        const niftyReturns = {
            r5: calcReturn(niftyData, 5),
            r20: calcReturn(niftyData, 20),
            currentPrice: closeCurrent(niftyData)
        };

        const results = [];

        for (const idx of INDICES) {
            const data = await fetchYahooData(idx.symbol, timeframe);
            if (!data || data.length < 20) continue;

            const currentPrice = closeCurrent(data);
            const r5 = calcReturn(data, 5);
            const r20 = calcReturn(data, 20);

            // Relative Performance (Alpha)
            const alpha5 = r5 - niftyReturns.r5;
            const alpha20 = r20 - niftyReturns.r20;

            const outperforming = alpha20 > 0;
            const status = outperforming ? 'OUTPERFORMING' : 'UNDERPERFORMING';

            // Trend analysis
            const closes = data.map(q => q.close);
            const sma20 = calculateSMA(closes, 20);
            const sma50 = calculateSMA(closes, Math.min(50, closes.length));
            const lastSMA20 = sma20[sma20.length - 1];
            const lastSMA50 = sma50[sma50.length - 1];

            const trend = currentPrice > lastSMA20 && lastSMA20 > lastSMA50 ? 'BULLISH' :
                currentPrice < lastSMA20 && lastSMA20 < lastSMA50 ? 'BEARISH' : 'SIDEWAYS';

            results.push({
                symbol: idx.symbol,
                name: idx.name,
                price: parseFloat(currentPrice.toFixed(2)),
                trend,
                status,
                perf_1w: parseFloat(r5.toFixed(2)),
                perf_1m: parseFloat(r20.toFixed(2)),
                alpha_1w: parseFloat(alpha5.toFixed(2)),
                alpha_1m: parseFloat(alpha20.toFixed(2))
            });

            // Small delay to prevent rate limiting
            await new Promise(r => setTimeout(r, 200));
        }

        // Sort by alpha_1m (highest outperformance first)
        results.sort((a, b) => b.alpha_1m - a.alpha_1m);

        res.json({
            status: 'success',
            benchmark: {
                symbol: '^NSEI',
                name: 'NIFTY 50',
                price: parseFloat(niftyReturns.currentPrice.toFixed(2)),
                perf_1w: parseFloat(niftyReturns.r5.toFixed(2)),
                perf_1m: parseFloat(niftyReturns.r20.toFixed(2))
            },
            data: results
        });

    } catch (e) {
        console.error('Indices Scanner Error:', e);
        res.status(500).json({ status: 'error', message: e.message });
    }
});
app.get('/api/scan-sector-stocks', async (req, res) => {
    try {
        const sectorSymbol = req.query.sector;
        const timeframe = req.query.timeframe || '1d';

        if (!sectorSymbol || !SECTOR_CONSTITUENTS[sectorSymbol]) {
            return res.status(400).json({ status: 'error', message: 'Invalid or missing sector symbol' });
        }

        const stocksToScan = SECTOR_CONSTITUENTS[sectorSymbol];

        // Fetch the Sector Benchmark data to compare the specific stocks against their own sector
        const sectorData = await fetchYahooData(sectorSymbol, timeframe);
        if (!sectorData || sectorData.length < 20) {
            return res.status(500).json({ status: 'error', message: 'Failed to fetch sector benchmark data' });
        }

        const closeCurrent = (quotes) => quotes[quotes.length - 1].close;
        const closePast = (quotes, periodsAgo) => quotes[Math.max(0, quotes.length - 1 - periodsAgo)].close;

        const calcReturn = (quotes, periodsAgo) => {
            const current = closeCurrent(quotes);
            const past = closePast(quotes, periodsAgo);
            return ((current - past) / past) * 100;
        };

        const sectorReturns = {
            r5: calcReturn(sectorData, 5),
            r20: calcReturn(sectorData, 20)
        };

        const results = [];

        for (const sym of stocksToScan) {
            const data = await fetchYahooData(sym, timeframe);
            if (!data || data.length < 20) continue;

            const currentPrice = closeCurrent(data);
            const r5 = calcReturn(data, 5);
            const r20 = calcReturn(data, 20);

            // Relative Performance (Alpha) compared to Sector Index instead of NIFTY
            const alpha5 = r5 - sectorReturns.r5;
            const alpha20 = r20 - sectorReturns.r20;

            const outperforming = alpha20 > 0;
            const status = outperforming ? 'OUTPERFORMING' : 'UNDERPERFORMING';

            // Trend analysis
            const closes = data.map(q => q.close);
            const sma20 = calculateSMA(closes, 20);
            const sma50 = calculateSMA(closes, Math.min(50, closes.length));
            const lastSMA20 = sma20[sma20.length - 1];
            const lastSMA50 = sma50[sma50.length - 1];

            const trend = currentPrice > lastSMA20 && lastSMA20 > lastSMA50 ? 'BULLISH' :
                currentPrice < lastSMA20 && lastSMA20 < lastSMA50 ? 'BEARISH' : 'SIDEWAYS';

            results.push({
                symbol: sym.replace('.NS', ''),
                price: parseFloat(currentPrice.toFixed(2)),
                trend,
                status,
                perf_1m: parseFloat(r20.toFixed(2)),
                alpha_1m: parseFloat(alpha20.toFixed(2))
            });

            // Prevent rate limiting
            await new Promise(r => setTimeout(r, 100));
        }

        // Sort by alpha_1m to get Outperformers vs Underperformers
        results.sort((a, b) => b.alpha_1m - a.alpha_1m);

        // Extract Top 5 & Bottom 5
        const top5 = results.slice(0, 5);
        const bottom5 = results.slice(-5).reverse();

        res.json({
            status: 'success',
            sector_benchmark: sectorSymbol,
            top_outperforming: top5,
            top_underperforming: bottom5,
            all: results
        });

    } catch (e) {
        console.error('Sector Scanner Error:', e);
        res.status(500).json({ status: 'error', message: e.message });
    }
});

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

app.get('/api/scan-box', async (req, res) => {
    const timeframe = req.query.timeframe || '1d';
    const limit = parseInt(req.query.limit) || 50;
    const results = [];
    const stocksToScan = NIFTY_STOCKS.slice(0, limit);

    // Minimum candle requirement varies by timeframe
    // Intraday timeframes have fewer candles per day
    const minCandles = ['5m', '15m'].includes(timeframe) ? 40 : 50;

    // Use smaller batches for intraday to avoid rate limiting
    const batchSize = ['5m', '15m'].includes(timeframe) ? 5 : 10;

    for (let i = 0; i < stocksToScan.length; i += batchSize) {
        const batch = stocksToScan.slice(i, i + batchSize);
        await Promise.all(batch.map(async (symbol) => {
            const data = await fetchYahooData(symbol, timeframe);
            if (data.length < minCandles) return;

            // Pass symbol and timeframe for correct intraday detection
            const patterns = detectBoxBreakout(data, symbol, timeframe);
            patterns.forEach(p => {
                results.push({ ...p, symbol: symbol.replace('.NS', '') });
            });
        }));

        // Small delay between batches for intraday to avoid Yahoo rate limiting
        if (['5m', '15m'].includes(timeframe) && i + batchSize < stocksToScan.length) {
            await new Promise(r => setTimeout(r, 200));
        }
    }

    res.json({
        status: "success",
        timestamp: new Date().toISOString(),
        count: results.length,
        timeframe,
        data: results.sort((a, b) => b.confidence - a.confidence)
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