// Array of crypto and web3 words for the typing game
const words = [
    'bitcoin', 'ethereum', 'blockchain', 'cryptocurrency', 'wallet', 'mining', 'hash', 'token',
    'nft', 'defi', 'dao', 'smart', 'contract', 'dapp', 'metaverse', 'web3',
    'altcoin', 'exchange', 'trading', 'hodl', 'satoshi', 'consensus', 'proof', 'stake',
    'yield', 'farming', 'liquidity', 'pool', 'swap', 'dex', 'cex', 'kyc',
    'whitelist', 'presale', 'ico', 'ido', 'airdrop', 'bounty', 'moon', 'diamond',
    'pump', 'dump', 'fomo', 'fud', 'bull', 'bear', 'whale', 'diamond'
];

// Game state variables
let currentWord = '';
let score = 0;
let timeLeft = 60; // Changed to 60 seconds (1 minute)
let gameRunning = false;
let timerInterval = null;

// DOM elements
const wordDisplay = document.getElementById('current-word');
const wordInput = document.getElementById('word-input');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const gameOverDiv = document.getElementById('game-over');
const finalScoreElement = document.getElementById('final-score');

// Initialize the game
function init() {
    // Add event listeners
    startBtn.addEventListener('click', startGame);
    resetBtn.addEventListener('click', resetGame);
    wordInput.addEventListener('input', checkWord);
    wordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            checkWord();
        }
    });
    
    // Set initial state
    updateDisplay();
}

// Start the game
function startGame() {
    gameRunning = true;
    score = 0;
    timeLeft = 60; // Changed to 60 seconds (1 minute)
    
    // Enable input and focus
    wordInput.disabled = false;
    wordInput.focus();
    
    // Update button states
    startBtn.disabled = true;
    resetBtn.disabled = false;
    
    // Hide game over message
    gameOverDiv.classList.add('hidden');
    
    // Start timer
    startTimer();
    
    // Show first word
    showNewWord();
    
    updateDisplay();
}

// Reset the game
function resetGame() {
    gameRunning = false;
    score = 0;
    timeLeft = 60; // Changed to 60 seconds (1 minute)
    
    // Clear timer
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    
    // Disable input
    wordInput.disabled = true;
    wordInput.value = '';
    
    // Update button states
    startBtn.disabled = false;
    resetBtn.disabled = true;
    
    // Hide game over message
    gameOverDiv.classList.add('hidden');
    
    // Reset display
    wordDisplay.textContent = 'Click Start to begin!';
    updateDisplay();
}

// Start the countdown timer
function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        updateDisplay();
        
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

// Show a new random word
function showNewWord() {
    if (words.length === 0) {
        console.log('No words available');
        return;
    }
    
    // Pick a random word from the array
    const randomIndex = Math.floor(Math.random() * words.length);
    currentWord = words[randomIndex];
    
    // Display the word
    wordDisplay.textContent = currentWord;
    
    // Clear the input
    wordInput.value = '';
}

// Check if the typed word matches the current word
function checkWord() {
    if (!gameRunning) return;
    
    const typedWord = wordInput.value.toLowerCase().trim();
    
    // Check if the word matches exactly
    if (typedWord === currentWord) {
        // Correct word! Increase score
        score++;
        
        // Show new word
        showNewWord();
        
        // Update display
        updateDisplay();
        
        // Add a small visual feedback (optional)
        wordDisplay.style.color = '#ff6b35';
        setTimeout(() => {
            wordDisplay.style.color = '#000';
        }, 200);
    }
}

// End the game
function endGame() {
    gameRunning = false;
    
    // Clear timer
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    
    // Disable input
    wordInput.disabled = true;
    
    // Update button states
    startBtn.disabled = false;
    resetBtn.disabled = false;
    
    // Show game over message
    finalScoreElement.textContent = score;
    gameOverDiv.classList.remove('hidden');
    
    // Update display
    updateDisplay();
}

// Update the display elements
function updateDisplay() {
    scoreElement.textContent = score;
    timerElement.textContent = timeLeft;
}

// Start the game when the page loads
document.addEventListener('DOMContentLoaded', init);
