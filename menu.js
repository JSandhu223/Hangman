// Course: SENG 513
// Date: OCT 23, 2023
// Assignment 2
// Name: Jasraj Sandhu
// UCID: 30054475

// Handle the user clicking PLAY on main menu
function handlePlayClick() {
    window.location.href = "game.html";
}

// Add event listener to PLAY button on main menu
let play = document.getElementById("play-button");
play.addEventListener("click", handlePlayClick);