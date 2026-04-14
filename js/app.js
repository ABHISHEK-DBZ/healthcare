/**
 * ContextPlate Application UI Logic
 * Handles DOM interactions, form submission, and SVG animations.
 */

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const form = document.getElementById('context-form');
    const resultsPanel = document.getElementById('results-panel');
    const healthRing = document.getElementById('health-ring');
    const healthScoreText = document.getElementById('health-score');
    
    // UI Update Elements
    const elCategory = document.getElementById('swap-category');
    const elBad = document.getElementById('current-craving-text');
    const elGood = document.getElementById('recommended-swap');
    const elReason = document.getElementById('reasoning-text');

    // Ring configuration
    const radius = healthRing.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;
    
    // Initialize SVG Ring
    healthRing.style.strokeDasharray = `${circumference} ${circumference}`;
    healthRing.style.strokeDashoffset = circumference;

    /**
     * Sets the visible progress on the SVG ring smoothly.
     * @param {number} percent 0-100
     */
    function setProgress(percent) {
        const offset = circumference - (percent / 100) * circumference;
        
        // Slight delay to allow CSS transitions to trigger
        setTimeout(() => {
            healthRing.style.strokeDashoffset = offset;
        }, 100);
        
        // Counter animation
        animateValue(healthScoreText, 0, percent, 1000);
    }

    /**
     * Animates text from a start value to an end value.
     */
    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    /**
     * Dispatches a toast notification.
     */
    function showToast(message) {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = 'toast show';
        toast.innerText = message;
        
        container.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300); // Wait for transition
        }, 3000);
    }

    // Main Event Listener
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // 1. Gather Context
        const context = {
            time: document.getElementById('time-select').value,
            mood: document.getElementById('mood-select').value,
            craving: document.getElementById('craving-select').value
        };

        // 2. Query Engine
        const recommendation = window.ContextPlateEngine.getRecommendation(context);

        if (!recommendation) {
            showToast("Could not find an exact match, try adjusting your context.");
            return;
        }

        // 3. Update DOM with recommendation
        elCategory.innerText = recommendation.category;
        elBad.innerText = recommendation.bad;
        elGood.innerText = recommendation.good;
        elReason.innerText = recommendation.reason;

        // Reset progress ring before showing to trigger animation again
        healthRing.style.transition = 'none';
        healthRing.style.strokeDashoffset = circumference;
        healthScoreText.innerText = "0";
        
        // 4. Reveal Results Panel
        resultsPanel.classList.remove('hidden');
        
        // For screen readers, scroll to element
        setTimeout(() => {
            resultsPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
            // Re-enable transition and set progress
            healthRing.style.transition = 'stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1)';
            setProgress(recommendation.score);
            
            showToast("Analysis Complete");
        }, 50); // slight delay to allow display change to register
    });
});
