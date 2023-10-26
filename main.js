// Course: SENG 513
// Date: OCT 23, 2023
// Assignment 2
// Name: Jasraj Sandhu
// UCID: 30054475

// List of words
const words = ["apple", "clock", "grenade"];
// Maximum timer allowed for player to guess word
let timeRemaining = 0;


// TODO: dynamically allocate as many placeholders as there are letters for the RANDOMLY selected word.
function createLetterPlaceholders(selectedWord) {
    console.log(selectedWord); // DEBUG
    let wordDisplay = document.getElementById("word-display");

    for (let i = 0; i < selectedWord.length; i++) {
        let letterSpan = document.createElement("span");
        letterSpan.className = "letter";
        letterSpan.textContent = "?";
        wordDisplay.appendChild(letterSpan);
    }
}

// Update the position of the floating letter
function updatePosition () {

}

// function displayWordTiles(selectedWord) {
//     let wordDisplay = document.getElementById("word-display");
//     let letters = document.getElementsByClassName("letter");
// }

// Select random letter
function randomLetter() {
    const letters = 'abcdefghijklmnopqrstuvwxyz'; // letters of alphabet
    const randomIndex = Math.floor(Math.random() * letters.length); // get random int x, where 0 <= x < = 25
    let chosenLetter = letters[randomIndex]; // return the "character" (actually a string) at index of randomIndex
    return chosenLetter.toUpperCase(); // Return the randomly chosen letter in uppercase
}

// TODO: randomize letter to be spawned
function spawnFloatingLetter() {
    let floatingLetter = document.createElement("div");
    floatingLetter.className = "floating-letter";
    // Assign a random letter (for now, use "A")
    floatingLetter.textContent = randomLetter();
    
    // Add a click event listener to the floating letters
    floatingLetter.addEventListener("click", handleFloatingLetterClick);

    let gameArea = document.getElementById("game-area");
    gameArea.appendChild(floatingLetter);
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

// TODO: handle granting bonus points to user if they are on a streak
function grantBonusPoints () {

}

// TODO: check if user guessed the correct letter
function checkGuess() {

}

// TODO: handle user losing health from selecting incorrect letter
function removeHealth() {

}

// TODO: handle filling placeholder with correctly guessed letter
function fillLetter() {

}

// Called every time a new game is started. Starts from a clean slate.
function startNewGame() {
    // Select a word from the list of words (for testing, this will be the first word)
    const selectedWord = words[0];

    createLetterPlaceholders(selectedWord);
    // displayWordTiles(selectedWord);

    // Set timer element in HTML
    timeRemaining = 10;
    setTimer(timeRemaining);
    // Update timer (this gets called every second)
    updateTimer();

    spawnFloatingLetter();
}


//////////////////////// Event Handling ///////////////////////////////////

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
function handleFloatingLetterClick() {
    alert("Floating letter clicked");
}
