/**
 * ContextPlate - UI Logic
 */
import { initializeEngine, getRecommendation, generateMetrics } from './engine.js';

const contextState = {
    mood: null,
    craving: null,
    time: determineTimeOfDay()
};

function determineTimeOfDay() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 11) return 'morning';
    if (hour >= 11 && hour < 17) return 'afternoon';
    if (hour >= 17 && hour < 22) return 'evening';
    return 'latenight';
}

function updateState(category, value) {
    contextState[category] = value;
    
    // Update active state on buttons
    document.querySelectorAll(`[data-${category}]`).forEach(btn => {
        btn.classList.toggle('option-btn--selected', btn.dataset[category] === value);
    });

    validateState();
}

function validateState() {
    const btn = document.getElementById('generateBtn');
    if (contextState.mood && contextState.craving) {
        btn.disabled = false;
        btn.classList.add('pulse');
    }
}

function generateRecommendation() {
    const btn = document.getElementById('generateBtn');
    btn.innerHTML = '<span class="loading-spinner"></span> Analyzing...';
    btn.disabled = true;

    // Simulate analysis delay for UX
    setTimeout(() => {
        displayResults();
        btn.innerHTML = 'Generate Healthier Swap ✨';
        btn.disabled = false;
        showToast('Optimal swap calculated!', 'success');
    }, 800);
}

function displayResults() {
    const rec = getRecommendation(contextState);
    const resultsSection = document.getElementById('resultsSection');
    
    // 1. Update Visual Swap
    document.getElementById('origEmoji').textContent = rec.originalEmoji;
    document.getElementById('origName').textContent = rec.original;
    document.getElementById('origDesc').textContent = rec.originalNutrients;
    
    document.getElementById('swapEmoji').textContent = rec.swapEmoji;
    document.getElementById('swapName').textContent = rec.swap;
    document.getElementById('swapDesc').textContent = rec.swapNutrients;

    // 2. Update Metrics via SVG Rings
    const metrics = generateMetrics(rec);
    const ringContainer = document.getElementById('metricsContainer');
    ringContainer.innerHTML = ''; // Clear context

    metrics.forEach(metric => {
        // Calculate percentage (simplified for demo)
        const max = Math.max(metric.original, metric.swap) * 1.2;
        const percent = Math.min((metric.swap / max) * 100, 100);
        
        const ringHTML = `
            <div class="ring-item">
                <svg width="60" height="60" viewBox="0 0 60 60">
                    <circle cx="30" cy="30" r="26" fill="none" stroke="var(--glass-border)" stroke-width="6"/>
                    <circle cx="30" cy="30" r="26" fill="none" stroke="${metric.color}" stroke-width="6" 
                            stroke-dasharray="163.36" stroke-dashoffset="${163.36 * (1 - percent/100)}" 
                            transform="rotate(-90 30 30)" stroke-linecap="round"
                            style="transition: stroke-dashoffset 1s ease-out;"/>
                </svg>
                <div class="ring-label">${metric.label}</div>
                <div class="ring-value" style="color: ${metric.color}">${metric.swap}${metric.unit}</div>
            </div>
        `;
        ringContainer.innerHTML += ringHTML;
    });

    // 3. Update Science Context
    document.getElementById('scienceNote').textContent = rec.scienceNote;
    
    const benefitsList = document.getElementById('benefitsList');
    benefitsList.innerHTML = rec.benefits.map(benefit => 
        `<li class="info-card__item">
            <span class="info-card__check">✓</span>
            <span>${benefit}</span>
        </li>`
    ).join('');

    // 4. Update Google Maps Link
    const mapsBtn = document.getElementById('mapsBtn');
    if (mapsBtn) {
        mapsBtn.style.display = 'flex';
        mapsBtn.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(rec.swap)}`;
    }

    // 5. Show Section
    resultsSection.classList.add('results-section--visible');
    
    // Scroll to results smoothly
    setTimeout(() => {
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
}

function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    
    const icon = type === 'success' ? '✓' : 'ℹ';
    toast.innerHTML = `<span>${icon}</span> ${message}`;
    
    container.appendChild(toast);
    
    // Animate in
    setTimeout(() => toast.classList.add('toast--visible'), 10);
    
    // Remove after 3s
    setTimeout(() => {
        toast.classList.remove('toast--visible');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Ensure elements exist before adding listeners
document.addEventListener('DOMContentLoaded', async () => {
    // Determine context time logic automatically updates the label on load
    const timeLabel = document.getElementById('currentTime');
    if (timeLabel) timeLabel.textContent = contextState.time.charAt(0).toUpperCase() + contextState.time.slice(1);
    
    // Initialize Engine First
    await initializeEngine();
    
    const buttons = document.querySelectorAll('.option-btn[data-mood], .option-btn[data-craving]');
    buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const el = e.currentTarget;
            if (el.dataset.mood) updateState('mood', el.dataset.mood);
            if (el.dataset.craving) updateState('craving', el.dataset.craving);
        });
    });

    const generateBtn = document.getElementById('generateBtn');
    if (generateBtn) {
        generateBtn.addEventListener('click', generateRecommendation);
    }
});
