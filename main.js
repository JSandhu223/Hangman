// Course: SENG 513
// Date: OCT 23, 2023
// Assignment 2
// Name: Jasraj Sandhu
// UCID: 30054475

// List of words
const words = ["apple", "clock", "grenade"];
// Maximum timer allowed for player to guess word
let timeRemaining = 0;
let selectedWord = null;
// This holds the player health hearts for easier access
const heartQueue = [];
// This holds the correct guesses the player makes. O(1) lookup time
const correctGuesses = new Set();
const colors = ["red", "green", "blue"];
const sampleLetters = new Map();


function randomColor() {
    const min = 0; // Minimum value (first index of 'colors')
    const max = colors.length - 1; // Maximum value (last index of 'colors')

    const rand = Math.floor(Math.random() * (max - min + 1)) + min;
    return colors[rand];
}

function createSampleLetters() {
    for (let i = 65; i <= 90; i++) {
        let letter = String.fromCharCode(i);
        let floatingLetter = document.createElement("div");
        floatingLetter.className = "floating-letter";
        floatingLetter.id = "floating-letter-" + letter;
        floatingLetter.textContent = letter; // Set the text to the letter
        floatingLetter.style.background = randomColor(); // Randomly select the color
        sampleLetters.set(letter, floatingLetter);
    }
}

function setHealth() {
    let playerHealth = document.getElementById("player-health");

    let numHearts = 5;
    for (let i = 0; i < numHearts; i++) {
        let heart = document.createElement("img");
        heart.className = "player-health-heart";
        heart.src = "images/heart.png";
        playerHealth.appendChild(heart);
        heartQueue.push(heart);
    }
}

// TODO: dynamically allocate as many placeholders as there are letters for the RANDOMLY selected word.
function createLetterPlaceholders(selectedWord) {
    console.log(selectedWord); // DEBUG
    let wordDisplay = document.getElementById("word-display");

    for (let i = 0; i < selectedWord.length; i++) {
        let letterSpan = document.createElement("span");
        letterSpan.className = "letter";
        letterSpan.id = "letterIndex" + String(i);
        letterSpan.textContent = "?";
        wordDisplay.appendChild(letterSpan);
    }
}

// function displayWordTiles(selectedWord) {
//     let wordDisplay = document.getElementById("word-display");
//     let letters = document.getElementsByClassName("letter");
// }

// Select random letter
function randomLetter() {
    const min = 65; // Minimum value (ASCII code for 'A')
    const max = 90; // Maximum value (ASCII code for 'Z')

    const rand = Math.floor(Math.random() * (max - min + 1)) + min;
    const randomLetter = String.fromCharCode(rand);
    let chosenLetter = sampleLetters.get(randomLetter);
    return chosenLetter; // Return the randomly chosen letter
}

// Select random number
function randomPos() {
    const min = 10; // Minimum value (ASCII code for 'A')
    const max = 60; // Maximum value (ASCII code for 'Z')

    const rand = Math.floor(Math.random() * (max - min + 1)) + min;
    return rand; // Return the randomly chosen number
}

// TODO: randomize letter to be spawned
function spawnFloatingLetter() {
    // Assign a random letter (for now, use "A")
    let floatingLetter = randomLetter();

    const leftStart = 0;
    const topStart = randomPos();

    // Set position of floating letter
    floatingLetter.style.left = leftStart + "%";
    floatingLetter.style.top = topStart + "%";

    let size;
    
    // Add a click event listener to the floating letters
    floatingLetter.addEventListener("click", handleFloatingLetterClick);

    let gameArea = document.getElementById("game-area");
    gameArea.appendChild(floatingLetter);
}

// Update the position of the floating letter
function updatePosition () {
    let speed = 1; // How "fast" the letter will appear to be moving (as a percentage)
    // Get all floating letters currently on the game screen (stores them in an array)
    let currentFloatingLetters = document.getElementsByClassName("floating-letter");
    // Update the position of each floating letter
    for (let i = 0; i < currentFloatingLetters.length; i++) {
        let floatingLetter = currentFloatingLetters[i];
        let currentPos = parseInt(floatingLetter.style.left); // Get current position of floating letter
        // console.log(currentPos); // DEBUG LINE
        currentPos += speed;
        floatingLetter.style.left = currentPos + "px"; // Set the position offset in percentage
    }
}

function setTimer(timeRemaining) {
    let t = String(timeRemaining);
    let currentTimer = document.getElementById("time-remaining");
    currentTimer.textContent = t;
}

// TODO: Handle updating remaining time
function updateTimer() {
    let countdown = setInterval(function() {  
        // Check if the timer has reached 0 seconds
        if (timeRemaining === 0) {
            clearInterval(countdown); // Stop the countdown when it reaches 0
            return;
        }
        
        // Decrease the time by 1 second
        timeRemaining--;
        // Update time remaining on HTML page
        setTimer(timeRemaining);
    }, 1000); // Update every 1000 milliseconds (1 second)
}

// Initial score
function setScore() {
    let score = document.getElementById("score");
    let playerScore = document.createElement("p");
    playerScore.id = "player-score";
    let initialScore = 0;
    playerScore.textContent = String(initialScore);
    score.appendChild(playerScore);
}

function updateScore() {
    let playerScore = document.getElementById("player-score");
    let currentScore = parseInt(playerScore.textContent);
    let newScore = currentScore + 10;
    playerScore.textContent = String(newScore);
}

// TODO: handle granting bonus points to user if they are on a streak
function grantBonusPoints () {

}

// TODO: check if user guessed the correct letter
function checkGuess(clickedLetter) {
    // Convert clicked letter to lowercase
    clickedLetter = clickedLetter.toLowerCase();
    // Check if the word to guess contains the letter
    if (selectedWord.toLowerCase().includes(clickedLetter) && correctGuesses.has(clickedLetter) === false) {
        console.log("Correct guess");
        correctGuesses.add(clickedLetter);
        return true;
    }
    else {
        console.log("Incorrect guess");
        return false;
    }
}

// TODO: handle user losing health from selecting incorrect letter
function removeHealth() {
    let heart = heartQueue.pop();
    if (heart !== undefined) {
        heart.style.opacity = 0.5;
    }
}

// Handles filling placeholder(s) with correctly guessed letter
function fillLetter(clickedLetter) {
    // Get the span elements of the word display (these are children elements of a parent div)
    let wordDisplay = document.getElementById("word-display");
    for (let i = 0; i < selectedWord.length; i++) {
        if (clickedLetter === selectedWord[i].toUpperCase()) {
            // Fill the letter at that index
            wordDisplay.children[i].textContent = clickedLetter;
        }
    }
}

// Called every time a new game is started. Starts from a clean slate.
function startNewGame() {
    // Select a word from the list of words (for testing, this will be the first word)
    selectedWord = words[0];
    // This is the set of letters A-Z that will be randomly picked from to spawn floating letters
    createSampleLetters();

    createLetterPlaceholders(selectedWord);
    // displayWordTiles(selectedWord);

    // Set the player's score and health
    setScore();
    setHealth();
    // Caveman implementation: reverse the array of hearts
    heartQueue.reverse();

    // Set timer element in HTML
    timeRemaining = 10;
    setTimer(timeRemaining);
    // Update timer (this gets called every second)
    updateTimer();

    spawnFloatingLetter();
    setInterval(spawnFloatingLetter, 2000);
    updatePosition();
    setInterval(updatePosition, 10);
}


//////////////////////// Event Handling ///////////////////////////////////

// Start new game upon loading game.html page
window.addEventListener("load", function () {
    startNewGame();
})

// // Handle the user clicking PLAY on main menu
// function handlePlayClick() {
//     window.location.href = "game.html";
// }

// // Add event listener to PLAY button on main menu
// let play = document.getElementById("play-button");
// play.addEventListener("click", handlePlayClick);

// Handle the user clicking on a floating letter
function handleFloatingLetterClick(event) {
    // Grab the element that was clicked
    const clickedElement = event.target;
    // Extract the text of the clicked element
    const clickedLetter = clickedElement.textContent;
    console.log(`Floating letter ${clickedLetter} clicked`); // DEBUG
    if (checkGuess(clickedLetter)) {
        // Fill out placeholder(s)
        fillLetter(clickedLetter);
        updateScore();
    }
    else {
        removeHealth(); // reduce health
        // reduce timer by n seconds
    }
}
