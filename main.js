// List of words
const words = ["apple", "clock", "grenade"];

function createLetterPlaceholders(selectedWord) {
    // console.log(selectedWord); // DEBUG
    let wordDisplay = document.getElementById("word-display");

    for (let i = 0; i < selectedWord.length; i++) {
        let letterSpan = document.createElement("span");
        letterSpan.className = "letter";
        letterSpan.textContent = "#";
        wordDisplay.appendChild(letterSpan);
    }
}

function displayWordTiles(selectedWord) {
    let wordDisplay = document.getElementById("word-display");
    let letters = document.getElementsByClassName("letter");
}

function spawnFloatingLetter() {
    let floatingLetter = document.createElement("div");
    floatingLetter.className = "floating-letter";
    floatingLetter.textContent = "A";
    let gameArea = document.getElementById("game-area");
    gameArea.appendChild(floatingLetter);
}

function startNewGame() {
    // Select a word from the list of words (for testing, this will be the first word)
    const selectedWord = words[0];

    createLetterPlaceholders(selectedWord);
    // displayWordTiles(selectedWord);

    spawnFloatingLetter();
}

// Call this when the user clicks button to start a new game.
startNewGame();