// Handle the user clicking PLAY on main menu
function handlePlayClick() {
    window.location.href = "game.html";
}

// Add event listener to PLAY button on main menu
let play = document.getElementById("play-button");
play.addEventListener("click", handlePlayClick);

// Handle the user clicking on a floating letter
function handleFloatingLetterClick() {
    alert("Floating letter clicked");
}
