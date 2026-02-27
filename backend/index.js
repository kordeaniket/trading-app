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

// 🤖 AI-ENHANCED PATTERN DETECTION
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
    const lastBB = bb[bb.length - 1] || { upper: last.close * 1.02, lower: last.close * 0.98 };
    const lastOBV = obv[obv.length - 1] || 0;
    const prevOBV = obv[obv.length - 2] || 0;
    const lastATR = atr[atr.length - 1] || (last.high - last.low) * 0.5;

    const avgVol = quotes.slice(-20).reduce((s, q) => s + q.volume, 0) / 20;
    const volumeSpike = last.volume > avgVol * 1.5;
    const volumeDecline = last.volume < avgVol * 0.7;

    const findings = [];

    // 1. DOUBLE TOP with AI confirmation
    const lookback = 30;
    const recentHighs = quotes.slice(-lookback).filter(q =>
        q.high > Math.max(...quotes.slice(-lookback).map(x => x.high)) * 0.98
    );

    if (recentHighs.length >= 2) {
        const firstHigh = recentHighs[0];
        const secondHigh = recentHighs[recentHighs.length - 1];
        const priceDiff = Math.abs(secondHigh.high - firstHigh.high) / firstHigh.high;

        if (priceDiff < 0.03 && last.close < secondHigh.low) {
            const rsiDivergence = lastRSI < rsi[rsi.length - 5];
            const macdBearish = lastMACD < lastSignal;
            const volumeConfirmation = volumeSpike;

            if (rsiDivergence || macdBearish || volumeConfirmation) {
                findings.push({
                    type: 'DOUBLE_TOP',
                    confidence: rsiDivergence && macdBearish ? 92 : 75,
                    score: rsiDivergence && macdBearish ? 10 : 7,
                    message: 'Double Top with bearish divergence',
                    checklist: [
                        { label: "Two distinct peaks at resistance", status: true },
                        { label: "Breakout below neckline", status: true },
                        { label: "RSI Bearish Divergence", status: rsiDivergence },
                        { label: "MACD Signal Crossing Down", status: macdBearish },
                        { label: "Volume Spiking on Breakdown", status: volumeConfirmation }
                    ],
                    price: last.close,
                    stop_loss: secondHigh.high + lastATR,
                    target: secondHigh.high - (firstHigh.high - firstHigh.low) * 2,
                    volume: last.volume,
                    avg_volume: avgVol
                });
            }
        }
    }

    // 2. DOUBLE BOTTOM with AI confirmation
    const recentLows = quotes.slice(-lookback).filter(q =>
        q.low < Math.min(...quotes.slice(-lookback).map(x => x.low)) * 1.02
    );

    if (recentLows.length >= 2) {
        const firstLow = recentLows[0];
        const secondLow = recentLows[recentLows.length - 1];
        const priceDiff = Math.abs(secondLow.low - firstLow.low) / firstLow.low;

        if (priceDiff < 0.03 && last.close > secondLow.high) {
            const rsiBullish = lastRSI > rsi[rsi.length - 5];
            const macdBullish = lastMACD > lastSignal;
            const obvBullish = lastOBV > prevOBV;

            if (rsiBullish || macdBullish || obvBullish) {
                findings.push({
                    type: 'DOUBLE_BOTTOM',
                    confidence: rsiBullish && macdBullish ? 95 : 78,
                    score: rsiBullish && macdBullish ? 11 : 8,
                    message: 'Double Bottom with bullish confirmation',
                    checklist: [
                        { label: "Two distinct valleys at support", status: true },
                        { label: "Breakout above neckline", status: true },
                        { label: "RSI Bullish Strength", status: rsiBullish },
                        { label: "MACD Signal Crossing Up", status: macdBullish },
                        { label: "OBV Accumulation Trend", status: obvBullish }
                    ],
                    price: last.close,
                    stop_loss: secondLow.low - lastATR,
                    target: secondLow.low + (firstLow.high - firstLow.low) * 2,
                    volume: last.volume,
                    avg_volume: avgVol
                });
            }
        }
    }

    // 3. HEAD AND SHOULDERS
    const highs = quotes.map(q => q.high);
    const leftShoulder = Math.max(...highs.slice(-60, -40));
    const head = Math.max(...highs.slice(-40, -20));
    const rightShoulder = Math.max(...highs.slice(-20));

    if (head > leftShoulder && head > rightShoulder &&
        Math.abs(leftShoulder - rightShoulder) / leftShoulder < 0.05) {

        const neckline = Math.min(...quotes.slice(-30).map(q => q.low));
        if (last.close < neckline) {
            findings.push({
                type: 'HEAD_SHOULDERS',
                confidence: volumeSpike ? 94 : 80,
                score: volumeSpike ? 10 : 8,
                message: 'Head & Shoulders Breakdown: Major trend reversal structure',
                checklist: [
                    { label: "Left Shoulder at resistance", status: true },
                    { label: "Head peak higher than shoulders", status: true },
                    { label: "Right Shoulder lower than head", status: true },
                    { label: "Neckline support broken", status: true },
                    { label: "Volume Spiking on breakdown", status: volumeSpike }
                ],
                price: last.close,
                stop_loss: rightShoulder + lastATR,
                target: neckline - (head - neckline),
                volume: last.volume,
                avg_volume: avgVol
            });
        }
    }

    // 4. INVERSE HEAD AND SHOULDERS
    const lows = quotes.map(q => q.low);
    const leftShoulderLow = Math.min(...lows.slice(-60, -40));
    const headLow = Math.min(...lows.slice(-40, -20));
    const rightShoulderLow = Math.min(...lows.slice(-20));

    if (headLow < leftShoulderLow && headLow < rightShoulderLow &&
        Math.abs(leftShoulderLow - rightShoulderLow) / leftShoulderLow < 0.05) {

        const necklineHigh = Math.max(...quotes.slice(-30).map(q => q.high));
        if (last.close > necklineHigh) {
            findings.push({
                type: 'INVERSE_HS',
                confidence: volumeSpike ? 96 : 82,
                score: volumeSpike ? 11 : 9,
                message: 'Inverse Head & Shoulders Breakout: Foundational reversal',
                checklist: [
                    { label: "Inverse Left Shoulder at support", status: true },
                    { label: "Inverse Head valley lower than shoulders", status: true },
                    { label: "Inverse Right Shoulder higher than head", status: true },
                    { label: "Neckline resistance broken", status: true },
                    { label: "Volume confirmation on surge", status: volumeSpike }
                ],
                price: last.close,
                stop_loss: rightShoulderLow - lastATR,
                target: necklineHigh + (necklineHigh - headLow),
                volume: last.volume,
                avg_volume: avgVol
            });
        }
    }

    // 5. BULL FLAG
    const flagpole = quotes.slice(-30, -20);
    const flag = quotes.slice(-20);

    if (flagpole.length > 0) {
        const poleHeight = Math.max(...flagpole.map(q => q.high)) - Math.min(...flagpole.map(q => q.low));
        const flagHigh = Math.max(...flag.map(q => q.high));
        const flagLow = Math.min(...flag.map(q => q.low));
        const flagRange = flagHigh - flagLow;

        if (flagRange < poleHeight * 0.3 && last.close > flagHigh) {
            findings.push({
                type: 'BULL_FLAG',
                confidence: volumeSpike ? 'HIGH' : 'MEDIUM',
                message: 'Bull Flag breakout',
                entry: last.close,
                stop_loss: flagLow - lastATR,
                target: last.close + poleHeight,
                flag_consolidation: flagRange / poleHeight
            });
        }
    }

    // 6. BEAR FLAG
    if (flagpole.length > 0) {
        const poleHeight = Math.max(...flagpole.map(q => q.high)) - Math.min(...flagpole.map(q => q.low));
        const flagHigh = Math.max(...flag.map(q => q.high));
        const flagLow = Math.min(...flag.map(q => q.low));
        const flagRange = flagHigh - flagLow;

        if (flagRange < poleHeight * 0.3 && last.close < flagLow) {
            findings.push({
                type: 'BEAR_FLAG',
                confidence: volumeSpike ? 'HIGH' : 'MEDIUM',
                message: 'Bear Flag breakdown',
                entry: last.close,
                stop_loss: flagHigh + lastATR,
                target: last.close - poleHeight,
                flag_consolidation: flagRange / poleHeight
            });
        }
    }

    // 7. MORNING STAR
    if (quotes.length >= 3) {
        const first = quotes[quotes.length - 3];
        const second = quotes[quotes.length - 2];

        if (isBearish(first) && Math.abs(second.close - second.open) < (second.high - second.low) * 0.2 &&
            isBullish(last) && last.close > (first.open + first.close) / 2) {

            findings.push({
                type: 'MORNING_STAR',
                confidence: volumeSpike ? 'HIGH' : 'MEDIUM',
                message: 'Morning Star reversal',
                entry: last.close,
                stop_loss: Math.min(second.low, last.low) - lastATR,
                target: last.close + (first.open - first.close) * 1.5,
                doji_body: Math.abs(second.close - second.open)
            });
        }
    }

    // 8. EVENING STAR
    if (quotes.length >= 3) {
        const first = quotes[quotes.length - 3];
        const second = quotes[quotes.length - 2];

        if (isBullish(first) && Math.abs(second.close - second.open) < (second.high - second.low) * 0.2 &&
            isBearish(last) && last.close < (first.open + first.close) / 2) {

            findings.push({
                type: 'EVENING_STAR',
                confidence: volumeSpike ? 'HIGH' : 'MEDIUM',
                message: 'Evening Star reversal',
                entry: last.close,
                stop_loss: Math.max(second.high, last.high) + lastATR,
                target: last.close - (first.close - first.open) * 1.5,
                doji_body: Math.abs(second.close - second.open)
            });
        }
    }

    // 9. HAMMER
    if (isBullish(last)) {
        const body = Math.abs(last.close - last.open);
        const lowerShadow = Math.min(last.open, last.close) - last.low;
        const upperShadow = last.high - Math.max(last.open, last.close);

        if (lowerShadow > body * 2 && upperShadow < body * 0.3) {
            findings.push({
                type: 'HAMMER',
                confidence: lowerShadow > body * 3 ? 'HIGH' : 'MEDIUM',
                message: 'Hammer reversal at support',
                entry: last.close,
                stop_loss: last.low - lastATR,
                target: last.close + lowerShadow * 2,
                body_size: body,
                shadow_ratio: lowerShadow / body
            });
        }
    }

    // 10. SHOOTING STAR
    if (isBearish(last)) {
        const body = Math.abs(last.close - last.open);
        const upperShadow = last.high - Math.max(last.open, last.close);
        const lowerShadow = Math.min(last.open, last.close) - last.low;

        if (upperShadow > body * 2 && lowerShadow < body * 0.3) {
            findings.push({
                type: 'SHOOTING_STAR',
                confidence: upperShadow > body * 3 ? 'HIGH' : 'MEDIUM',
                message: 'Shooting star at resistance',
                entry: last.close,
                stop_loss: last.high + lastATR,
                target: last.close - upperShadow * 2,
                body_size: body,
                shadow_ratio: upperShadow / body
            });
        }
    }

    // 11. PIERCING PATTERN
    if (quotes.length >= 2) {
        const prev = quotes[quotes.length - 2];

        if (isBearish(prev) && isBullish(last) &&
            last.open < prev.close && last.close > (prev.open + prev.close) / 2) {

            findings.push({
                type: 'PIERCING',
                confidence: 'MEDIUM',
                message: 'Piercing pattern reversal',
                entry: last.close,
                stop_loss: Math.min(prev.low, last.low) - lastATR,
                target: last.close + (prev.open - prev.close),
                penetration: (last.close - prev.close) / (prev.open - prev.close)
            });
        }
    }

    // 12. DARK CLOUD COVER
    if (quotes.length >= 2) {
        const prev = quotes[quotes.length - 2];

        if (isBullish(prev) && isBearish(last) &&
            last.open > prev.close && last.close < (prev.open + prev.close) / 2) {

            findings.push({
                type: 'DARK_CLOUD',
                confidence: 'MEDIUM',
                message: 'Dark cloud cover reversal',
                entry: last.close,
                stop_loss: Math.max(prev.high, last.high) + lastATR,
                target: last.close - (prev.close - prev.open),
                penetration: (prev.close - last.close) / (prev.close - prev.open)
            });
        }
    }

    // 13. THREE WHITE SOLDIERS
    if (quotes.length >= 3) {
        const c1 = quotes[quotes.length - 3];
        const c2 = quotes[quotes.length - 2];

        if (isBullish(c1) && isBullish(c2) && isBullish(last) &&
            c2.close > c1.close && last.close > c2.close &&
            c2.open > c1.open && last.open > c2.open) {

            const bodiesIncreasing = (c2.close - c2.open) > (c1.close - c1.open) &&
                (last.close - last.open) > (c2.close - c2.open);

            findings.push({
                type: 'THREE_SOLDIERS',
                confidence: bodiesIncreasing ? 'HIGH' : 'MEDIUM',
                message: 'Three White Soldiers - strong uptrend',
                entry: last.close,
                stop_loss: c1.low - lastATR,
                target: last.close + (last.close - c1.low),
                momentum: bodiesIncreasing ? 'ACCELERATING' : 'STEADY'
            });
        }
    }

    // 14. THREE BLACK CROWS
    if (quotes.length >= 3) {
        const c1 = quotes[quotes.length - 3];
        const c2 = quotes[quotes.length - 2];

        if (isBearish(c1) && isBearish(c2) && isBearish(last) &&
            c2.close < c1.close && last.close < c2.close &&
            c2.open < c1.open && last.open < c2.open) {

            const bodiesIncreasing = (c1.open - c1.close) > (c2.open - c2.close) &&
                (c2.open - c2.close) > (last.open - last.close);

            findings.push({
                type: 'THREE_CROWS',
                confidence: bodiesIncreasing ? 'HIGH' : 'MEDIUM',
                message: 'Three Black Crows - strong downtrend',
                entry: last.close,
                stop_loss: c1.high + lastATR,
                target: last.close - (c1.high - last.close),
                momentum: bodiesIncreasing ? 'ACCELERATING' : 'STEADY'
            });
        }
    }

    // 15. BULLISH ENGULFING
    if (quotes.length >= 2) {
        const prev = quotes[quotes.length - 2];

        if (isBearish(prev) && isBullish(last) &&
            last.open < prev.close && last.close > prev.open) {

            findings.push({
                type: 'BULLISH_ENGULFING',
                confidence: last.volume > avgVol * 1.5 ? 'HIGH' : 'MEDIUM',
                message: 'Bullish Engulfing with volume confirmation',
                entry: last.close,
                stop_loss: Math.min(prev.low, last.low) - lastATR,
                target: last.close + (last.close - prev.low),
                engulf_size: (last.close - last.open) / (prev.open - prev.close)
            });
        }
    }

    // 16. BEARISH ENGULFING
    if (quotes.length >= 2) {
        const prev = quotes[quotes.length - 2];

        if (isBullish(prev) && isBearish(last) &&
            last.open > prev.close && last.close < prev.open) {

            findings.push({
                type: 'BEARISH_ENGULFING',
                confidence: last.volume > avgVol * 1.5 ? 'HIGH' : 'MEDIUM',
                message: 'Bearish Engulfing with volume confirmation',
                entry: last.close,
                stop_loss: Math.max(prev.high, last.high) + lastATR,
                target: last.close - (prev.high - last.close),
                engulf_size: (prev.close - prev.open) / (last.open - last.close)
            });
        }
    }

    return findings.map(f => ({
        ...f,
        symbol: '',
        price: last.close,
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

    // Calculate indicators for both timeframes
    const currentEMA20 = calculateEMA(currentData, 20);
    const currentEMA50 = calculateEMA(currentData, 50);
    const currentRSI = calculateRSI(currentData);
    const currentMACD = calculateMACD(currentData);
    const currentATR = calculateATR(currentData);

    const higherEMA20 = calculateEMA(higherData, 20);
    const higherEMA50 = calculateEMA(higherData, 50);
    const higherRSI = calculateRSI(higherData);
    const higherMACD = calculateMACD(higherData);

    const lastCurrentRSI = currentRSI[currentRSI.length - 1] || 50;
    const lastHigherRSI = higherRSI[higherRSI.length - 1] || 50;
    const lastCurrentMACD = currentMACD.macd[currentMACD.macd.length - 1] || 0;
    const lastCurrentSignal = currentMACD.signal[currentMACD.signal.length - 1] || 0;
    const lastHigherMACD = higherMACD.macd[higherMACD.macd.length - 1] || 0;
    const lastHigherSignal = higherMACD.signal[higherMACD.signal.length - 1] || 0;
    const lastATR = currentATR[currentATR.length - 1] || (last.high - last.low) * 0.5;

    const avgVol = currentData.slice(-20).reduce((s, q) => s + q.volume, 0) / 20;

    // Trend alignment
    const currentTrendUp = last.close > currentEMA20[currentEMA20.length - 1] &&
        currentEMA20[currentEMA20.length - 1] > currentEMA50[currentEMA50.length - 1];

    const currentTrendDown = last.close < currentEMA20[currentEMA20.length - 1] &&
        currentEMA20[currentEMA20.length - 1] < currentEMA50[currentEMA50.length - 1];

    const higherTrendUp = higherData[higherData.length - 1].close > higherEMA20[higherEMA20.length - 1] &&
        higherEMA20[higherEMA20.length - 1] > higherEMA50[higherEMA50.length - 1];

    const higherTrendDown = higherData[higherData.length - 1].close < higherEMA20[higherEMA20.length - 1] &&
        higherEMA20[higherEMA20.length - 1] < higherEMA50[higherEMA50.length - 1];

    const findings = [];

    // STRONG BUY - Both timeframes bullish
    if (currentTrendUp && higherTrendUp) {
        const macdBullish = lastCurrentMACD > lastCurrentSignal;
        const rsiMomentum = lastCurrentRSI > 50 && lastCurrentRSI < 70;
        const volumeConfirmation = last.volume > avgVol * 1.2;

        const strength = [macdBullish, rsiMomentum, volumeConfirmation].filter(Boolean).length;

        findings.push({
            type: 'SMM_STRONG_BUY',
            confidence: strength >= 3 ? 'VERY_HIGH' : strength >= 2 ? 'HIGH' : 'MEDIUM',
            message: 'Strong Buy - Both timeframes bullish',
            entry: last.close,
            stop_loss: Math.min(last.low, currentEMA20[currentEMA20.length - 1]) - lastATR,
            target: last.close + (last.close - currentEMA20[currentEMA20.length - 1]) * 3,
            current_trend: 'BULLISH',
            higher_trend: 'BULLISH',
            rsi: lastCurrentRSI,
            macd_histogram: lastCurrentMACD - lastCurrentSignal,
            volume_ratio: last.volume / avgVol
        });
    }

    // STRONG SELL - Both timeframes bearish
    if (currentTrendDown && higherTrendDown) {
        const macdBearish = lastCurrentMACD < lastCurrentSignal;
        const rsiMomentum = lastCurrentRSI < 50 && lastCurrentRSI > 30;
        const volumeConfirmation = last.volume > avgVol * 1.2;

        const strength = [macdBearish, rsiMomentum, volumeConfirmation].filter(Boolean).length;

        findings.push({
            type: 'SMM_STRONG_SELL',
            confidence: strength >= 3 ? 'VERY_HIGH' : strength >= 2 ? 'HIGH' : 'MEDIUM',
            message: 'Strong Sell - Both timeframes bearish',
            entry: last.close,
            stop_loss: Math.max(last.high, currentEMA20[currentEMA20.length - 1]) + lastATR,
            target: last.close - (currentEMA20[currentEMA20.length - 1] - last.close) * 3,
            current_trend: 'BEARISH',
            higher_trend: 'BEARISH',
            rsi: lastCurrentRSI,
            macd_histogram: lastCurrentMACD - lastCurrentSignal,
            volume_ratio: last.volume / avgVol
        });
    }

    // BULLISH ALIGNMENT - Higher timeframe bullish, current correcting
    if (higherTrendUp && !currentTrendUp && last.close < currentEMA20[currentEMA20.length - 1]) {
        const rsiOversold = lastCurrentRSI < 40;
        const macdTurning = lastCurrentMACD > lastCurrentSignal &&
            lastCurrentMACD - lastCurrentSignal < currentATR[currentATR.length - 1] * 0.1;

        if (rsiOversold || macdTurning) {
            findings.push({
                type: 'SMM_BULLISH_ALIGNMENT',
                confidence: 'MEDIUM',
                message: 'Bullish alignment - Higher timeframe up, current oversold',
                entry: last.close,
                stop_loss: last.low - lastATR,
                target: currentEMA20[currentEMA20.length - 1] + lastATR * 2,
                higher_trend: 'BULLISH',
                current_phase: 'CORRECTION',
                rsi: lastCurrentRSI
            });
        }
    }

    // BEARISH ALIGNMENT - Higher timeframe bearish, current rallying
    if (higherTrendDown && !currentTrendDown && last.close > currentEMA20[currentEMA20.length - 1]) {
        const rsiOverbought = lastCurrentRSI > 60;
        const macdTurning = lastCurrentMACD < lastCurrentSignal &&
            lastCurrentSignal - lastCurrentMACD < currentATR[currentATR.length - 1] * 0.1;

        if (rsiOverbought || macdTurning) {
            findings.push({
                type: 'SMM_BEARISH_ALIGNMENT',
                confidence: 'MEDIUM',
                message: 'Bearish alignment - Higher timeframe down, current overbought',
                entry: last.close,
                stop_loss: last.high + lastATR,
                target: currentEMA20[currentEMA20.length - 1] - lastATR * 2,
                higher_trend: 'BEARISH',
                current_phase: 'PULLBACK',
                rsi: lastCurrentRSI
            });
        }
    }

    return findings.map(f => ({
        ...f,
        symbol: symbol.replace('.NS', ''),
        price: last.close,
        volume: last.volume,
        avg_volume: avgVol,
        date: last.date.toISOString().split('T')[0]
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
            const bullishTypes = ['DOUBLE_BOTTOM', 'INVERSE_HS', 'BULL_FLAG', 'MORNING_STAR',
                'HAMMER', 'PIERCING', 'THREE_SOLDIERS', 'BULLISH_ENGULFING',
                'SYMMETRICAL_TRIANGLE_BULL', 'ASCENDING_TRIANGLE', 'ENDING_DIAGONAL_BULLISH'];

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
            const bearishTypes = ['DOUBLE_TOP', 'HEAD_SHOULDERS', 'BEAR_FLAG', 'EVENING_STAR',
                'SHOOTING_STAR', 'DARK_CLOUD', 'THREE_CROWS', 'BEARISH_ENGULFING',
                'SYMMETRICAL_TRIANGLE_BEAR', 'DESCENDING_TRIANGLE', 'ENDING_DIAGONAL_BEARISH'];

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
            const confScore = { 'VERY_HIGH': 4, 'HIGH': 3, 'MEDIUM': 2, 'LOW': 1 };
            return (confScore[b.confidence] || 0) - (confScore[a.confidence] || 0);
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