import yahooFinance from 'yahoo-finance2';

(async () => {
    try {
        const result = await yahooFinance.historical('RELIANCE.NS', { period1: '2025-01-01' });
        console.log("Success:", result.slice(-1)[0]);
    } catch (e) {
        console.error("FAIL:", e);
    }
})();
