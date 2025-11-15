// ========================================
// WAOW Season 6 - Workshop Material JS
// ========================================

// Progress tracking
const pages = [
    'index.html',
    'pengantar.html',
    'sesi-1.html',
    'sesi-2.html',
    'sesi-3.html',
    'sesi-4.html',
    'sesi-5.html',
    'quiz.html',
    'errors.html',
    'resources.html'
];

// Get current page
function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop() || 'index.html';
    return page;
}

// Update progress bar
function updateProgressBar() {
    const currentPage = getCurrentPage();
    const currentIndex = pages.indexOf(currentPage);
    
    if (currentIndex !== -1) {
        const progress = ((currentIndex + 1) / pages.length) * 100;
        const progressBar = document.querySelector('.progress-bar-custom');
        if (progressBar) {
            progressBar.style.width = progress + '%';
        }
    }
}

// Timer functionality
let timerInterval;
let totalSeconds = 0;
let isRunning = false;

function startTimer(minutes = 150) {
    totalSeconds = minutes * 60;
    isRunning = true;
    
    timerInterval = setInterval(() => {
        if (totalSeconds > 0) {
            totalSeconds--;
            updateTimerDisplay();
        } else {
            stopTimer();
            alert('⏰ Waktu workshop habis!');
        }
    }, 1000);
}

function stopTimer() {
    isRunning = false;
    clearInterval(timerInterval);
}

function updateTimerDisplay() {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    const display = document.querySelector('.timer-display');
    if (display) {
        display.textContent = 
            `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    }
}

function pad(num) {
    return num.toString().padStart(2, '0');
}

// Copy code functionality
function setupCopyButtons() {
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const codeBlock = this.parentElement.querySelector('pre');
            const code = codeBlock.textContent;
            
            navigator.clipboard.writeText(code).then(() => {
                this.textContent = '✓ Copied!';
                setTimeout(() => {
                    this.textContent = 'Copy';
                }, 2000);
            });
        });
    });
}

// Smooth scroll
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    updateProgressBar();
    setupCopyButtons();
    setupSmoothScroll();
    
    // Auto-start timer on first page
    if (getCurrentPage() === 'pengantar.html') {
        startTimer(150); // 150 minutes total
    }
    
    // Load timer state from localStorage
    const savedTime = localStorage.getItem('workshopTimer');
    if (savedTime && !isRunning) {
        totalSeconds = parseInt(savedTime);
        updateTimerDisplay();
    }
});

// Save timer state
window.addEventListener('beforeunload', function() {
    if (isRunning) {
        localStorage.setItem('workshopTimer', totalSeconds);
    }
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    const currentPage = getCurrentPage();
    const currentIndex = pages.indexOf(currentPage);
    
    // Left arrow - previous page
    if (e.key === 'ArrowLeft' && currentIndex > 0) {
        window.location.href = pages[currentIndex - 1];
    }
    
    // Right arrow - next page
    if (e.key === 'ArrowRight' && currentIndex < pages.length - 1) {
        window.location.href = pages[currentIndex + 1];
    }
});
