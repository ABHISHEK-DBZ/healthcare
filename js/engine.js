/**
 * ContextPlate - Engine Module
 */

let swapData = null;

/**
 * Initializes the engine by fetching the static data map.
 * In a real environment, this might be bundled or fetched async.
 */
export async function initializeEngine() {
    try {
        const response = await fetch('data/swaps.json');
        swapData = await response.json();
        return true;
    } catch (e) {
        console.error('Failed to load swap data:', e);
        return false;
    }
}

/**
 * Gets recommendation based on current context
 * @param {Object} context - { mood, time, craving }
 * @returns {Object} Recommendation record
 */
export function getRecommendation(context) {
    if (!swapData) throw new Error("Data not loaded");
    
    const key = `${context.mood}_${context.craving}`;
    
    if (swapData[key]) {
        return swapData[key];
    }
    
    // Fallback: return a default recommendation
    return swapData['stressed_sweet'] || Object.values(swapData)[0];
}

/**
 * Generates metrics from recommendation
 * @param {Object} rec - Recommendation record
 * @returns {Array} Array of metrics
 */
export function generateMetrics(rec) {
    return [
        {
            label: 'Calories',
            original: rec.originalCal,
            swap: rec.swapCal,
            unit: 'cal',
            color: '#ff6b6b',
            betterIndicator: 'lower'
        },
        {
            label: 'Sugar',
            original: rec.originalSugar,
            swap: rec.swapSugar,
            unit: 'g',
            color: '#fbbf24',
            betterIndicator: 'lower'
        },
        {
            label: 'Nutrient Density',
            original: 30, // hardcoded for demo simplicity
            swap: 85,
            unit: '/100',
            color: '#4ade80',
            betterIndicator: 'higher'
        }
    ];
}
