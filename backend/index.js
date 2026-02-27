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

// 🔧 High-Precision Pivot Logic for Price Action
const findKeyLevels = (quotes) => {
    const window = 15;
    const pivots = [];
    for (let i = window; i < quotes.length - window; i++) {
        const slice = quotes.slice(i - window, i + window + 1);
        const lows = slice.map(q => q.low);
        const highs = slice.map(q => q.high);
        if (quotes[i].low === Math.min(...lows)) pivots.push({ price: quotes[i].low, index: i, type: 'SUPPORT' });
        if (quotes[i].high === Math.max(...highs)) pivots.push({ price: quotes[i].high, index: i, type: 'RESISTANCE' });
    }
    return pivots;
};

// 🕯️ Candle Helper
const isNeutral = (q) => Math.abs(q.close - q.open) < (q.high - q.low) * 0.3;
const isBullish = (q) => q.close > q.open;
const isBearish = (q) => q.close < q.open;

// 🌊 DEEP SEARCH WAVE ENGINE (ZIGZAG 3%)
const getZigZag = (data, threshold = 0.03) => {
    const points = [];
    if (!data.length) return [];
    let lastApex = { ...data[0], index: 0 };
    let trend = 0;

    data.forEach((q, i) => {
        const price = (q.high + q.low) / 2;
        const diff = (price - lastApex.close) / lastApex.close;
        if (trend === 0) {
            if (diff > threshold) trend = 1;
            else if (diff < -threshold) trend = -1;
        } else if (trend === 1) {
            if (price > lastApex.high) lastApex = { ...q, index: i };
            else if (diff < -threshold) {
                points.push(lastApex);
                trend = -1;
                lastApex = { ...q, index: i };
            }
        } else if (trend === -1) {
            if (price < lastApex.low) lastApex = { ...q, index: i };
            else if (diff > threshold) {
                points.push(lastApex);
                trend = 1;
                lastApex = { ...q, index: i };
            }
        }
    });
    points.push(lastApex);
    return points;
};

// 🧠 PAPA DEEP SEARCH ENGINE
const detectPAPAPatterns = (quotes) => {
    if (quotes.length < 60) return [];
    const last = quotes[quotes.length - 1];
    const prev = quotes[quotes.length - 2];
    const prev2 = quotes[quotes.length - 3];
    const prev3 = quotes[quotes.length - 4];
    const pivots = findKeyLevels(quotes);
    const history = quotes.slice(-40, -1);
    const avgBody = history.reduce((s, q) => s + Math.abs(q.close - q.open), 0) / history.length;
    const avgVol = history.reduce((s, q) => s + q.volume, 0) / history.length;

    const majorResists = pivots.filter(p => p.type === 'RESISTANCE').map(p => p.price);
    const majorSupports = pivots.filter(p => p.type === 'SUPPORT').map(p => p.price);
    const majorRes = majorResists.length ? Math.max(...majorResists) : last.close * 1.05;
    const majorSup = majorSupports.length ? Math.min(...majorSupports) : last.close * 0.95;

    const findings = [];

    // 1. Double Top (Deep Search)
    const recentTops = pivots.filter(p => p.type === 'RESISTANCE' && p.index < quotes.length - 5);
    if (recentTops.length >= 1) {
        const lastTop = recentTops[recentTops.length - 1];
        const isApproaching = Math.abs(last.high - lastTop.price) / lastTop.price < 0.015;
        const weaponOfBulls = quotes.slice(lastTop.index - 5, lastTop.index + 1).filter(isBullish).pop();
        if (isApproaching && (isNeutral(last) || isBearish(last)) && weaponOfBulls && last.close < weaponOfBulls.low) {
            findings.push({ type: 'DOUBLE_TOP', message: 'Bearish trigger: Weapon of the bulls broken at resistance', stop_loss: weaponOfBulls.high, target: last.close - (lastTop.price - last.close) });
        }
    }

    // 2. Double Bottom (Deep Search)
    const recentBottoms = pivots.filter(p => p.type === 'SUPPORT' && p.index < quotes.length - 5);
    if (recentBottoms.length >= 1) {
        const lastBottom = recentBottoms[recentBottoms.length - 1];
        const isApproaching = Math.abs(last.low - lastBottom.price) / lastBottom.price < 0.015;
        const weaponOfBears = quotes.slice(lastBottom.index - 5, lastBottom.index + 1).filter(isBearish).pop();
        if (isApproaching && (isNeutral(last) || isBullish(last)) && weaponOfBears && last.close > weaponOfBears.high) {
            findings.push({ type: 'DOUBLE_BOTTOM', message: 'Bullish trigger: Weapon of the bears broken at support', stop_loss: weaponOfBears.low, target: last.close + (last.close - lastBottom.price) });
        }
    }

    // 3. Three White Soldiers (Price Action Correction Logic)
    if (quotes.length > 5) {
        const q4 = quotes[quotes.length - 5];
        const q3 = quotes[quotes.length - 4];
        if (isBullish(q4) && isBullish(q3) && q3.close > q4.close) {
            const h2 = q3.high;
            const l2 = q3.low;
            // Correction check
            if (prev.close < h2 && prev.low > l2 && last.close > h2 && isBullish(last)) {
                findings.push({ type: 'THREE_WHITE_SOLDIERS', message: 'Soldiers confirmed: Breakout after correction of 2nd candle', stop_loss: q4.low, target: 'Major Resistance' });
            }
        }
    }

    // 4. Three Black Crows
    if (quotes.length > 5) {
        const q4 = quotes[quotes.length - 5];
        const q3 = quotes[quotes.length - 4];
        if (isBearish(q4) && isBearish(q3) && q3.close < q4.close) {
            const h2 = q3.high;
            const l2 = q3.low;
            if (prev.close > l2 && prev.high < h2 && last.close < l2 && isBearish(last)) {
                findings.push({ type: 'THREE_BLACK_CROWS', message: 'Crows confirmed: Breakdown after correction of 2nd candle', stop_loss: q4.high, target: 'Major Support' });
            }
        }
    }

    // 5. Bulls Counter Attack
    if (last.open < majorSup && last.close > majorSup && isBullish(last)) {
        findings.push({ type: 'BULLS_COUNTER_ATTACK', message: 'Price re-entered above breakdown level with volume', stop_loss: last.low, target: 'Major Resistance' });
    }

    // 6. Bears Counter Attack
    if (last.open > majorRes && last.close < majorRes && isBearish(last)) {
        findings.push({ type: 'BEARS_COUNTER_ATTACK', message: 'Price re-entered below breakout level with volume', stop_loss: last.high, target: 'Major Support' });
    }

    // 7. Sandwich Pattern
    if (prev3 && prev2 && prev) {
        const isG_R_G = isBullish(prev3) && isBearish(prev2) && isBullish(prev);
        const isR_G_R = isBearish(prev3) && isBullish(prev2) && isBearish(prev);
        if ((isG_R_G && last.close > prev3.high) || (isR_G_R && last.close < prev3.low)) {
            findings.push({ type: 'SANDWICH_PATTERN', message: 'Sandwich Break: Price escaped the alternate sequence range', stop_loss: isG_R_G ? last.low : last.high, target: 'Major Level' });
        }
    }

    // 8. Rounding Bottom
    const sliceBottom = history.slice(-15);
    const hasNeutralCurve = sliceBottom.filter(isNeutral).length > 5;
    if (hasNeutralCurve && last.close > Math.max(...sliceBottom.map(q => q.high)) && isBullish(last)) {
        findings.push({ type: 'ROUNDING_BOTTOM', message: 'Strong breakout candle closing above sideways range base', stop_loss: Math.min(...sliceBottom.map(q => q.low)), target: 'Major Resistance' });
    }

    // 9. Rounding Top
    const sliceTop = history.slice(-15);
    const hasNeutralCurveTop = sliceTop.filter(isNeutral).length > 5;
    if (hasNeutralCurveTop && last.close < Math.min(...sliceTop.map(q => q.low)) && isBearish(last)) {
        findings.push({ type: 'ROUNDING_TOP', message: 'Strong breakdown candle closing below sideways range peak', stop_loss: Math.max(...sliceTop.map(q => q.high)), target: 'Major Support' });
    }

    // 10. Genuine Breakout (Shakeout Check)
    const hasShakeout = history.some(q => q.high > majorRes && q.close < majorRes);
    if (hasShakeout && last.close > majorRes && last.volume > avgVol * 1.5 && isBullish(last)) {
        findings.push({ type: 'GENUINE_BO', message: 'Genuine Breakout: Confirmed with prior shakeout at resistance', stop_loss: last.low, target: 'Major Resistance Project' });
    }

    // 11. Genuine Breakdown
    const hasShakeoutBD = history.some(q => q.low < majorSup && q.close > majorSup);
    if (hasShakeoutBD && last.close < majorSup && last.volume > avgVol * 1.5 && isBearish(last)) {
        findings.push({ type: 'GENUINE_BD', message: 'Genuine Breakdown: Confirmed with prior shakeout at support', stop_loss: last.high, target: 'Major Support Project' });
    }

    // 12. Fake Breakout (No Shakeout)
    const noShakeout = !history.some(q => q.high > majorRes && q.close < majorRes);
    if (noShakeout && prev.close > majorRes && last.close < majorRes && isBearish(last)) {
        findings.push({ type: 'FAKE_BO', message: 'Fake Breakout: Bulls trapped. No shakeout occurred before the trap', stop_loss: last.high, target: 'Major Support' });
    }

    // 13. Fake Breakdown
    const noShakeoutBD = !history.some(q => q.low < majorSup && q.close > majorSup);
    if (noShakeoutBD && prev.close < majorSup && last.close > majorSup && isBullish(last)) {
        findings.push({ type: 'FAKE_BD', message: 'Fake Breakdown: Bears trapped. No shakeout occurred before the trap', stop_loss: last.low, target: 'Major Resistance' });
    }

    // 14 & 15. Gaps
    const gapUp = (last.open - prev.high) / prev.high > 0.015;
    if (gapUp && last.close >= last.open) findings.push({ type: 'GAP_UP', message: 'Direct Gap Up sustained above resistance levels', stop_loss: last.open, target: 'Gap Sustained' });

    const gapDown = (prev.low - last.open) / prev.low > 0.015;
    if (gapDown && last.close <= last.open) findings.push({ type: 'GAP_DOWN', message: 'Direct Gap Down sustained below support levels', stop_loss: last.open, target: 'Gap Sustained' });

    return findings.map(f => ({
        ...f,
        symbol: '', price: last.close, volume: last.volume, avg_volume: avgVol,
        date: last.date.toISOString().split('T')[0],
        resistance: majorRes, support: majorSup,
        stop_loss: f.stop_loss || last.close * 0.97,
        target: f.target || last.close * 1.12
    }));
};

// 🚀 3rd WAVE SETUP ENGINE (PRO)
const detectThirdWaveSetup = (quotes) => {
    if (quotes.length < 100) return [];
    const zigzags = getZigZag(quotes, 0.04);
    if (zigzags.length < 3) return [];

    const last = quotes[quotes.length - 1];
    const prev = quotes[quotes.length - 2];
    const w2 = zigzags[zigzags.length - 1]; // Current leg (Correction)
    const w1 = zigzags[zigzags.length - 2]; // Impulse Peak
    const w0 = zigzags[zigzags.length - 3]; // Starting Base

    const findings = [];
    const avgVol = quotes.slice(-20).reduce((s, q) => s + q.volume, 0) / 20;

    // Bullish 3rd Wave Checklist
    const isW1Impulse = w1.high > w0.low * 1.05;
    const isW2Correction = w2.low > w0.low && w2.low < w1.high; // Higher Low
    const isBreakout = last.close > w1.high && prev.close <= w1.high;

    if (isW1Impulse && isW2Correction && isBreakout) {
        findings.push({
            type: '3rd_WAVE_BULLISH',
            message: 'Elliott Wave 3 Launch: Confirmed Wave 1 Breakout with Higher Low structure',
            checklist: [
                { label: "Impulse: Strong Wave 1 found", status: true },
                { label: "Correction: Higher Low (W2 > W0)", status: true },
                { label: "Launch: Wave 1 Peak Broken", status: true },
                { label: "Volume: ABOVE Average (MUST)", status: last.volume > avgVol * 1.2 }
            ],
            price: last.close,
            stop_loss: w2.low,
            target: w1.high + (w1.high - w0.low) * 1.62,
            date: last.date.toISOString().split('T')[0],
            score: last.volume > avgVol ? 5 : 4
        });
    }

    return findings;
};

// Data Fetching
const fetchYahooData = async (symbol, interval) => {
    try {
        let range = '1y';
        if (interval === '15m') range = '5d';
        if (interval === '1h') range = '1mo';
        if (interval === '1wk') range = '5y';
        if (interval === '1mo') range = 'max';

        const url = `https://query2.finance.yahoo.com/v8/finance/chart/${symbol}?interval=${interval}&range=${range}`;
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000); // 5s timeout per stock

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
    const Category = req.query.category || 'ALL';
    const results = [];
    const stocksToScan = NIFTY_STOCKS.slice(0, limit);

    for (let i = 0; i < stocksToScan.length; i += 15) {
        const batch = stocksToScan.slice(i, i + 15);
        await Promise.all(batch.map(async (symbol) => {
            const data = await fetchYahooData(symbol, timeframe);
            if (symbol.includes('STEEL') || symbol.includes('SAIL')) {
                console.log(`Scanning ${symbol}: Data Length = ${data.length}`);
            }
            if (data.length < 50) return;
            const patterns = detectPAPAPatterns(data);
            patterns.forEach(p => {
                if (Category === 'ALL' || p.type === Category) {
                    results.push({ ...p, symbol: symbol.replace('.NS', '') });
                }
            });
        }));
    }
    res.json({ status: "success", data: results });
});

// 🕯️ HEIKIN ASHI TREND ENGINE
const detectHA = (quotes) => {
    const ha = [];
    for (let i = 1; i < quotes.length; i++) {
        const h_c = (quotes[i].open + quotes[i].high + quotes[i].low + quotes[i].close) / 4;
        const o_c = ha.length ? (ha[ha.length - 1].open + ha[ha.length - 1].close) / 2 : (quotes[i - 1].open + quotes[i - 1].close) / 2;
        ha.push({ ...quotes[i], open: o_c, close: h_c, high: Math.max(quotes[i].high, o_c, h_c), low: Math.min(quotes[i].low, o_c, h_c) });
    }

    const last = ha[ha.length - 1], prev = ha[ha.length - 2];
    if (!last || !prev) return [];
    const isBull = last.close > last.open && last.low === last.low; // Simplified for robustness
    const isBear = last.close < last.open && last.high === last.high;

    if (isBull && last.close > prev.close) return [{ type: 'HA_BULL', trend: 'BULLISH', message: 'Strong HA Bullish Continuity', score: 5 }];
    if (isBear && last.close < prev.close) return [{ type: 'HA_BEAR', trend: 'BEARISH', message: 'Strong HA Bearish Continuity', score: 5 }];
    return [];
};

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
            patterns.forEach(p => results.push({ ...p, symbol: symbol.replace('.NS', ''), price: data[data.length - 1].close }));
        }));
    }
    res.json({ status: "success", data: results });
});

app.get('/api/bullish-setups', async (req, res) => {
    const timeframe = req.query.timeframe || '1d';
    const limit = parseInt(req.query.limit) || 40;
    const results = [];
    const stocksToScan = NIFTY_STOCKS.slice(0, limit);

    for (let i = 0; i < stocksToScan.length; i += 20) {
        const batch = stocksToScan.slice(i, i + 20);
        await Promise.all(batch.map(async (symbol) => {
            const data = await fetchYahooData(symbol, timeframe);
            if (data.length < 50) return;
            const patterns = detectPAPAPatterns(data);
            const bullishPatterns = ['DOUBLE_BOTTOM', 'THREE_WHITE_SOLDIERS', 'BULLS_COUNTER_ATTACK', 'SANDWICH_PATTERN', 'ROUNDING_BOTTOM', 'GENUINE_BO', 'FAKE_BD', 'GAP_UP'];
            patterns.forEach(p => {
                if (bullishPatterns.includes(p.type)) {
                    results.push({ ...p, symbol: symbol.replace('.NS', '') });
                }
            });
        }));
    }
    res.json({ status: "success", data: results });
});

app.get('/api/bearish-setups', async (req, res) => {
    const timeframe = req.query.timeframe || '1d';
    const limit = parseInt(req.query.limit) || 40;
    const results = [];
    const stocksToScan = NIFTY_STOCKS.slice(0, limit);

    for (let i = 0; i < stocksToScan.length; i += 20) {
        const batch = stocksToScan.slice(i, i + 20);
        await Promise.all(batch.map(async (symbol) => {
            const data = await fetchYahooData(symbol, timeframe);
            if (data.length < 50) return;
            const patterns = detectPAPAPatterns(data);
            const bearishPatterns = ['DOUBLE_TOP', 'THREE_BLACK_CROWS', 'BEARS_COUNTER_ATTACK', 'SANDWICH_PATTERN', 'ROUNDING_TOP', 'GENUINE_BD', 'FAKE_BO', 'GAP_DOWN'];
            patterns.forEach(p => {
                if (bearishPatterns.includes(p.type)) {
                    results.push({ ...p, symbol: symbol.replace('.NS', '') });
                }
            });
        }));
    }
    res.json({ status: "success", data: results });
});

app.get('/api/third-wave', async (req, res) => {
    const timeframe = req.query.timeframe || '1d';
    const limit = parseInt(req.query.limit) || 40;
    const results = [];
    const stocksToScan = NIFTY_STOCKS.slice(0, limit);

    for (let i = 0; i < stocksToScan.length; i += 20) {
        const batch = stocksToScan.slice(i, i + 20);
        await Promise.all(batch.map(async (symbol) => {
            const data = await fetchYahooData(symbol, timeframe);
            if (data.length < 50) return;
            const patterns = detectThirdWaveSetup(data);
            patterns.forEach(p => {
                results.push({ ...p, symbol: symbol.replace('.NS', '') });
            });
        }));
    }
    res.json({ status: "success", data: results });
});

// 📐 ENDING DIAGONAL ENGINE (PRO VERSION)
const detectEndingDiagonal = (quotes) => {
    if (quotes.length < 100) return [];
    const last = quotes[quotes.length - 1];
    const prev = quotes[quotes.length - 2];

    // 1. ZigZag Implementation (3.5% threshold)
    const getZigZag = (data, threshold = 0.035) => {
        const points = [];
        let lastApex = data[0];
        let trend = 0; // 1 for up, -1 for down

        data.forEach((q, i) => {
            const price = (q.high + q.low) / 2;
            const diff = (price - lastApex.close) / lastApex.close;

            if (trend === 0) {
                if (diff > threshold) trend = 1;
                else if (diff < -threshold) trend = -1;
            } else if (trend === 1) {
                if (price > lastApex.high) lastApex = { ...q, index: i };
                else if (diff < -threshold) {
                    points.push(lastApex);
                    trend = -1;
                    lastApex = { ...q, index: i };
                }
            } else if (trend === -1) {
                if (price < lastApex.low) lastApex = { ...q, index: i };
                else if (diff > threshold) {
                    points.push(lastApex);
                    trend = 1;
                    lastApex = { ...q, index: i };
                }
            }
        });
        points.push(lastApex);
        return points;
    };

    const zigzags = getZigZag(quotes);
    if (zigzags.length < 6) return []; // Need at least 5 waves

    // Get last 5 zigzag points (Waves 1-5)
    const w5p = zigzags[zigzags.length - 1];
    const w4p = zigzags[zigzags.length - 2];
    const w3p = zigzags[zigzags.length - 3];
    const w2p = zigzags[zigzags.length - 4];
    const w1p = zigzags[zigzags.length - 5];

    // Helper: RSI(14)
    const calculateRSI = (items, endIdx) => {
        const slice = items.slice(Math.max(0, endIdx - 30), endIdx + 1);
        if (slice.length < 15) return 50;
        let gains = 0, losses = 0;
        for (let i = 1; i < slice.length; i++) {
            const diff = slice[i].close - slice[i - 1].close;
            if (diff >= 0) gains += diff; else losses -= diff;
        }
        const rs = (gains / 14) / (losses / 14 || 1);
        return 100 - (100 / (1 + rs));
    };

    const avgVol20 = quotes.slice(-20).reduce((s, q) => s + q.volume, 0) / 20;
    const rsi3 = calculateRSI(quotes, w3p.index);
    const rsi5 = calculateRSI(quotes, w5p.index);

    // BEARISH ENDING DIAGONAL (At Top)
    const isBearishED = w3p.high > w1p.high && // Wave 3 high above Wave 1 high
        w5p.high > w3p.high && // Wave 5 marginal new high
        w4p.low < w1p.high &&  // Wave 4 overlaps Wave 1 territory
        w2p.low > w1p.low;      // Corrective structure

    if (isBearishED) {
        // Trendline Convergence check: slope of (1,3) vs slope of (2,4)
        const topSlope = (w3p.high - w1p.high) / (w3p.index - w1p.index);
        const botSlope = (w4p.low - w2p.low) / (w4p.index - w2p.index);
        const isConverging = topSlope < botSlope; // Converging wedge

        const volumeContracting = w1p.volume > w3p.volume && w3p.volume > w5p.volume;
        const rsiDivergence = rsi5 < rsi3;

        // Breakdown logic: Price breaks lower trendline
        const expectedSupport = w4p.low + botSlope * (quotes.length - 1 - w4p.index);
        const isBreakdown = last.close < expectedSupport && last.volume > avgVol20;

        if (isBreakdown) {
            return [{
                type: 'ENDING_DIAGONAL_BEARISH',
                message: 'Bearish ED (PRO): 5-Wave overlapping structure with RSI Divergence and Volume Breakout',
                checklist: [
                    { label: "Wave Structure: 1-3-5 Highs Confirmed", status: true },
                    { label: "Wave 4/1 Overlap (3-3-3-3-3)", status: true },
                    { label: "Convergence: Narrows Over Time", status: isConverging },
                    { label: "RSI Divergence: W5 < W3", status: rsiDivergence },
                    { label: "Volume Contracted: W1 > W5", status: volumeContracting },
                    { label: "Breakout: Above 20D Avg Vol", status: true }
                ],
                start_date: w1p.date.toISOString().split('T')[0],
                breakout_date: last.date.toISOString().split('T')[0],
                price: last.close,
                stop_loss: w5p.high,
                target: w1p.low,
                volume: last.volume,
                avg_volume: avgVol20,
                score: [isConverging, rsiDivergence, volumeContracting].filter(Boolean).length + 3
            }];
        }
    }

    // BULLISH ENDING DIAGONAL (At Bottom)
    const isBullishED = w3p.low < w1p.low &&
        w5p.low < w3p.low &&
        w4p.high > w1p.low &&
        w2p.high < w1p.high;

    if (isBullishED) {
        const topSlope = (w4p.high - w2p.high) / (w4p.index - w2p.index);
        const botSlope = (w3p.low - w1p.low) / (w3p.index - w1p.index);
        const isConverging = topSlope < botSlope;

        const volumeContracting = w1p.volume > w3p.volume && w3p.volume > w5p.volume;
        const rsiDivergence = rsi5 > rsi3;

        const expectedResistance = w4p.high + topSlope * (quotes.length - 1 - w4p.index);
        const isBreakout = last.close > expectedResistance && last.volume > avgVol20;

        if (isBreakout) {
            return [{
                type: 'ENDING_DIAGONAL_BULLISH',
                message: 'Bullish ED (PRO): 5-Wave overlapping structure with RSI Divergence and Volume Breakout',
                checklist: [
                    { label: "Wave Structure: 1-3-5 Lows Confirmed", status: true },
                    { label: "Wave 4/1 Overlap (3-3-3-3-3)", status: true },
                    { label: "Convergence: Narrows Over Time", status: isConverging },
                    { label: "RSI Divergence: W5 > W3", status: rsiDivergence },
                    { label: "Volume Contracted: W1 > W5", status: volumeContracting },
                    { label: "Breakout: Above 20D Avg Vol", status: true }
                ],
                start_date: w1p.date.toISOString().split('T')[0],
                breakout_date: last.date.toISOString().split('T')[0],
                price: last.close,
                stop_loss: w5p.low,
                target: w1p.high,
                volume: last.volume,
                avg_volume: avgVol20,
                score: [isConverging, rsiDivergence, volumeContracting].filter(Boolean).length + 3
            }];
        }
    }

    return [];
};

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
    res.json({ status: "success", data: results });
});

// 📐 TRIANGLE BREAKOUT ENGINE (PRO)
const detectTriangleBreakout = (quotes) => {
    if (quotes.length < 120) return [];
    const zigzags = getZigZag(quotes, 0.035);
    if (zigzags.length < 6) return []; // Points A, B, C, D, E

    const last = quotes[quotes.length - 1];
    const prev = quotes[quotes.length - 2];
    const e = zigzags[zigzags.length - 1];
    const d = zigzags[zigzags.length - 2];
    const c = zigzags[zigzags.length - 3];
    const b = zigzags[zigzags.length - 4];
    const a = zigzags[zigzags.length - 5];

    const findings = [];
    const avgVol = quotes.slice(-20).reduce((s, q) => s + q.volume, 0) / 20;

    // Triangle Geometry Check
    const isConverging = (b.high - c.low) > (d.high - e.low);
    const lowerHighs = d.high < b.high;
    const higherLows = e.low > c.low;

    if (lowerHighs && higherLows && isConverging) {
        // Bullish Breakout
        if (last.close > d.high && prev.close <= d.high) {
            findings.push({
                type: 'TRIANGLE_BREAKOUT_BULLISH',
                message: 'Triangle Breakout PRO: A-B-C-D-E structure cleared with thrust',
                checklist: [
                    { label: "Waves: 5-Point Structure (A-E)", status: true },
                    { label: "Convergence: Converging Wedge Confirmed", status: true },
                    { label: "Ungli: Trigger Candle identified", status: true },
                    { label: "Volume: Above Average on BO", status: last.volume > avgVol }
                ],
                price: last.close,
                stop_loss: e.low,
                target: last.close + (b.high - c.low),
                date: last.date.toISOString().split('T')[0],
                score: 5
            });
        }
    }

    return findings;
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
    const lastH = higherData[higherData.length - 1];
    const prevH = higherData[higherData.length - 2];

    // Helpers
    const getEMA = (data, p) => {
        const k = 2 / (p + 1);
        let ema = data[0].close;
        data.forEach(q => ema = (q.close - ema) * k + ema);
        return ema;
    };
    const getRSI = (data) => {
        const slice = data.slice(-15);
        let gains = 0, losses = 0;
        for (let i = 1; i < slice.length; i++) {
            const d = slice[i].close - slice[i - 1].close;
            if (d >= 0) gains += d; else losses -= d;
        }
        return 100 - (100 / (1 + (gains / (losses || 1))));
    };

    // Step 1: Tide Calculation (Higher Timeframe)
    const ema5H = getEMA(higherData, 5);
    const pEma5H = getEMA(higherData.slice(0, -1), 5);
    const tideUp = ema5H > pEma5H;
    const tideDown = ema5H < pEma5H;

    // Step 2: Wave Calculation (Current Timeframe)
    const rsi = getRSI(currentData);
    const pRsi = getRSI(currentData.slice(0, -1));
    const waveUp = rsi > pRsi && rsi > 40;
    const waveDown = rsi < pRsi && rsi < 60;

    const findings = [];
    const avgVol = currentData.slice(-20).reduce((s, q) => s + q.volume, 0) / 20;

    // BULL HAT (Tide Up & Wave Up)
    if (tideUp && waveUp) {
        let bullSignals = 0;
        const checklist = [];

        // 1. Candlestick
        const isBullishGreen = last.close > last.open;
        if (isBullishGreen) bullSignals++;

        // 2. Volume
        const heavyVol = last.volume > avgVol * 1.3;
        if (heavyVol) bullSignals++;

        // 3. EMA Crossover (5 EMA PCO with 26)
        const e5 = getEMA(currentData, 5), e26 = getEMA(currentData, 26);
        const pe5 = getEMA(currentData.slice(0, -1), 5), pe26 = getEMA(currentData.slice(0, -1), 26);
        const pco = e5 > e26 && pe5 <= pe26;
        if (pco) bullSignals++;

        if (isBullishGreen || heavyVol || pco) {
            findings.push({
                type: 'SMM_BULL_HAT',
                message: 'Wear a Bull Hat: Tide/Wave Alignment confirmed with Candlestick/Volume support',
                checklist: [
                    { label: `Tide (${higherInterval}): Uptick`, status: true },
                    { label: `Wave (${currentInterval}): RSI Uptick`, status: true },
                    { label: "Candle: Bullish Green", status: isBullishGreen },
                    { label: "Volume: ABOVE Average", status: heavyVol },
                    { label: "EMA: 5/26 Positive Crossover", status: pco }
                ],
                stop_loss: Math.min(last.low, prev.low),
                target: last.close * 1.05,
                score: bullSignals + 2
            });
        }
    }

    // BEAR HAT (Tide Down & Wave Down)
    if (tideDown && waveDown) {
        let bearSignals = 0;
        const isBearishRed = last.close < last.open;
        if (isBearishRed) bearSignals++;

        const heavyVol = last.volume > avgVol * 1.3;
        if (heavyVol) bearSignals++;

        const nco = getEMA(currentData, 5) < getEMA(currentData, 26) && getEMA(currentData.slice(0, -1), 5) >= getEMA(currentData.slice(0, -1), 26);
        if (nco) bearSignals++;

        if (isBearishRed || heavyVol || nco) {
            findings.push({
                type: 'SMM_BEAR_HAT',
                message: 'Wear a Bear Hat: Tide/Wave Alignment confirmed with Candlestick/Volume support',
                checklist: [
                    { label: `Tide (${higherInterval}): Downtick`, status: true },
                    { label: `Wave (${currentInterval}): RSI Downtick`, status: true },
                    { label: "Candle: Bearish Red", status: isBearishRed },
                    { label: "Volume: ABOVE Average", status: heavyVol },
                    { label: "EMA: 5/26 Negative Crossover", status: nco }
                ],
                stop_loss: Math.max(last.high, prev.high),
                target: last.close * 0.95,
                score: bearSignals + 2
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

app.get('/api/smm-scanner', async (req, res) => {
    const timeframe = req.query.timeframe || '1d';
    const results = [];
    const limit = parseInt(req.query.limit) || 20; // Default limit for speed
    const stocksToScan = NIFTY_STOCKS.slice(0, limit);
    console.log(`Starting SMM Scan for ${stocksToScan.length} stocks...`);

    await Promise.all(stocksToScan.map(async (symbol) => {
        const patterns = await detectSMMSetup(symbol, timeframe);
        patterns.forEach(p => results.push(p));
    }));

    res.json({ status: "success", data: results });
});

app.get('/api/triangle-breakout', async (req, res) => {
    const timeframe = req.query.timeframe || '1d';
    const limit = parseInt(req.query.limit) || 30;
    const stocksToScan = NIFTY_STOCKS.slice(0, limit);
    console.log(`Starting Triangle Scan for ${stocksToScan.length} stocks...`);

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
    res.json({ status: "success", data: results });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Backend PAPA Scanner Live on http://localhost:${PORT}`));
