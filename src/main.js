import {
    Ship,
    GameBoard,
    Player
} from "./logic";

import "./styles.css";

gamePlay();
function gamePlay() {
    const gameBoard = new GameBoard();
    const gameDiv = document.getElementById("game");
    gameDiv.innerHTML = "";

    const playButton = createPlayButton();

    // gameDiv.appendChild(playButton);

    drawBoards()

    function drawBoards() {
        const container = document.createElement("div");
        const squares = [];

        for (let i = 0; i < gameBoard.board.length; i++) {
            const square = document.createElement("div");
            squares.push(square);
            square.classList.add("square");
            container.appendChild(square);
        }

        container.classList.add("board");
        gameDiv.appendChild(container)

    }

    function createPlayButton() {
        const playButton = document.createElement("button");
        playButton.classList.add("play");
        playButton.textContent = "Play";

        playButton.ontransitionend = (e) => {
            if (e.propertyName === "border-bottom-color") {
                playButton.classList.add("dissapear");
            }
            if (e.propertyName === "opacity") {
                playButton.remove();
                // drawBoards(); hiqi komentet mrapa
            }
        }
        return playButton;
    }
}

console.log(Ship);
console.log(GameBoard);