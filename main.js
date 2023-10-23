// Course: SENG 513
// Date: OCT 23, 2023
// Assignment 2
// Name: Jasraj Sandhu
// UCID: 30054475

// List of words
const words = ["apple", "clock", "grenade"];

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

// Handle the user clicking on a floating letter
function handleFloatingLetterClick() {
    // alert("Floating letter clicked");
}

// TODO: randomize letter to be spawned
function spawnFloatingLetter() {
    let floatingLetter = document.createElement("div");
    floatingLetter.className = "floating-letter";
    // Assign a random letter (for now, use "A")
    floatingLetter.textContent = "A";
    
    // Add a click event listener to the floating letters
    floatingLetter.addEventListener("click", handleFloatingLetterClick);

    let gameArea = document.getElementById("game-area");
    gameArea.appendChild(floatingLetter);
}

function setTimer() {
    // Set the timer to 3 minutes (180 seconds)
    let totalTime = 180;

    let time = document.getElementById("time-remaining");
    time.textContent = totalTime;
}

function updateTimer() {
    let time = document.getElementById("time-remaining");
    let timeRemaining = Number(time.textContent);
    let newTime = String(timeRemaining - 1);
    time.textContent = newTime;
}

// Called every time a new game is started. Starts from a clean slate.
function startNewGame() {
    // Select a word from the list of words (for testing, this will be the first word)
    const selectedWord = words[0];

    createLetterPlaceholders(selectedWord);
    // displayWordTiles(selectedWord);

    spawnFloatingLetter();

    setTimer();

    updateTimer();
}

// Call this when the user clicks button to start a new game.
startNewGame();