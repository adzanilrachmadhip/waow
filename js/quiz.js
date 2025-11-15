// ========================================
// WAOW Season 6 - Quiz JavaScript
// ========================================

// Quiz password - CHANGE THIS to your desired password
const QUIZ_PASSWORD = "waow2025";

// Quiz state
let answers = {};
let score = 0;

// Show password modal on page load
document.addEventListener('DOMContentLoaded', function() {
    const modal = new bootstrap.Modal(document.getElementById('passwordModal'));
    modal.show();
    
    // Allow Enter key to submit password
    document.getElementById('quizPassword').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            checkPassword();
        }
    });
});

// Check password
function checkPassword() {
    const input = document.getElementById('quizPassword').value;
    const errorDiv = document.getElementById('passwordError');
    
    if (input === QUIZ_PASSWORD) {
        // Correct password
        const modal = bootstrap.Modal.getInstance(document.getElementById('passwordModal'));
        modal.hide();
        
        // Show quiz content
        document.getElementById('quizContent').style.display = 'block';
        
        // Success message
        showNotification('Quiz unlocked! Good luck! 🎉', 'success');
    } else {
        // Wrong password
        errorDiv.style.display = 'block';
        document.getElementById('quizPassword').value = '';
        document.getElementById('quizPassword').focus();
        
        // Shake animation
        const input = document.getElementById('quizPassword');
        input.classList.add('shake');
        setTimeout(() => input.classList.remove('shake'), 500);
    }
}

// Select answer
function selectAnswer(questionNum, option, isCorrect) {
    const questionDiv = document.getElementById(`q${questionNum}`);
    const options = questionDiv.querySelectorAll('.quiz-option');
    
    // Remove previous selection
    options.forEach(opt => {
        opt.classList.remove('correct', 'wrong');
    });
    
    // Mark selected answer
    const selectedOption = Array.from(options).find(opt => opt.textContent.includes(option + '.'));
    
    if (isCorrect) {
        selectedOption.classList.add('correct');
        answers[questionNum] = true;
    } else {
        selectedOption.classList.add('wrong');
        answers[questionNum] = false;
        
        // Show correct answer
        options.forEach(opt => {
            if (opt.onclick.toString().includes('true')) {
                opt.classList.add('correct');
            }
        });
    }
    
    // Show explanation
    document.getElementById(`explain${questionNum}`).style.display = 'block';
    
    // Scroll to next question or submit button
    setTimeout(() => {
        if (questionNum < 7) {
            document.getElementById(`q${questionNum + 1}`).scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        } else {
            document.getElementById('submitSection').scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        }
    }, 1000);
}

// Submit quiz
function submitQuiz() {
    const totalQuestions = 7;
    const answeredQuestions = Object.keys(answers).length;
    
    // Check if all questions answered
    if (answeredQuestions < totalQuestions) {
        alert(`Please answer all questions! (${answeredQuestions}/${totalQuestions} answered)`);
        return;
    }
    
    // Calculate score
    score = Object.values(answers).filter(a => a === true).length;
    
    // Hide quiz questions
    document.querySelectorAll('.quiz-question').forEach(q => q.style.display = 'none');
    document.getElementById('submitSection').style.display = 'none';
    
    // Show results
    document.getElementById('quizResults').style.display = 'block';
    document.getElementById('finalScore').textContent = score;
    
    // Score message
    let message = '';
    if (score === 7) {
        message = '🏆 Perfect Score! You\'re a Flask master!';
    } else if (score >= 5) {
        message = '🎉 Great job! You understand the concepts well!';
    } else if (score >= 3) {
        message = '👍 Good effort! Review the materials for better understanding.';
    } else {
        message = '📚 Keep learning! Don\'t give up!';
    }
    document.getElementById('scoreMessage').textContent = message;
    
    // Confetti effect for perfect score
    if (score === 7) {
        createConfetti();
    }
    
    // Scroll to results
    document.getElementById('quizResults').scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
    });
}

// Show notification
function showNotification(message, type = 'success') {
    const alertClass = type === 'success' ? 'alert-success' : 'alert-danger';
    const icon = type === 'success' ? 'check-circle' : 'exclamation-circle';
    
    const notification = document.createElement('div');
    notification.className = `alert ${alertClass} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3`;
    notification.style.zIndex = '9999';
    notification.innerHTML = `
        <i class="bi bi-${icon} me-2"></i>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Simple confetti effect
function createConfetti() {
    const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.opacity = '1';
        confetti.style.zIndex = '99999';
        confetti.style.borderRadius = '50%';
        
        document.body.appendChild(confetti);
        
        const duration = Math.random() * 3 + 2;
        const xMovement = (Math.random() - 0.5) * 200;
        
        confetti.animate([
            { transform: 'translateY(0) translateX(0) rotate(0deg)', opacity: 1 },
            { transform: `translateY(100vh) translateX(${xMovement}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: duration * 1000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });
        
        setTimeout(() => confetti.remove(), duration * 1000);
    }
}

// Add shake animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
    .shake {
        animation: shake 0.5s;
    }
`;
document.head.appendChild(style);
