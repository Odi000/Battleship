import {
    Ship,
    GameBoard,
    Player
} from "./logic";

import "./styles.css";

gamePlay();
function gamePlay() {
    const gameBoard = new GameBoard();
    const shipObjects = buildShips();



    const gameDiv = document.getElementById("game");
    gameDiv.innerHTML = "";

    const playButton = createPlayButton();

    // gameDiv.appendChild(playButton);

    gameDiv.appendChild(buildStage());
    gameDiv.appendChild(buildStage());

    const board1 = [...document.querySelectorAll(".board")[0].childNodes];
    const board2 = [...document.querySelectorAll(".board")[1].childNodes];

    for (let i = 0; i < shipObjects.length; i++) {
        // const coords = gameBoard.placeShip(shipObjects[i], i * 2, 1);
        const coords = placeShipsRandomly(shipObjects[i]);
        drawShips(coords);
    }

    function placeShipsRandomly(ship){
        let x = Math.floor(Math.random()*10);
        let y = Math.floor(Math.random()*10);
        let direction = false;

        if(5 <= (Math.random()*10+1)){
            direction = "horizontal"
        }

        const coords = gameBoard.placeShip(ship, x, y, direction);

        if(!coords)  return placeShipsRandomly(ship);
        return coords;
    }

    function drawShips(coords) {
        const squares = [];

        coords.forEach(coord => {
            coord = coord.join("");
            board1.find(square => {
                if (square.dataset.coords === coord) {
                    squares.push(square);
                }
            })
        })

        squares.forEach(square => square.classList.toggle("ship"))
    }

    function buildShips() {
        const ships = [];
        for (let i = 0; i < 5; i++) {
            let ship = null;
            if (i >= 2) ship = new Ship(i + 1);
            else ship = new Ship(i + 2);
            ships.push(ship);
        }
        return ships;
    }

    function buildStage() {
        const container = document.createElement("div");
        const shipStatusCont = document.createElement("div");
        const ships = [];
        for (let i = 0; i < shipObjects.length; i++) {
            const ship = document.createElement("div");
            ship.classList.add(`S${i + 1}`);

            for (let j = 0; j < shipObjects[i].length; j++) {
                const bodyPart = document.createElement("div");
                ship.appendChild(bodyPart);
            }

            ships.push(ship);
        }

        container.classList.add("container");
        shipStatusCont.classList.add("ships");

        ships.forEach(ship => shipStatusCont.appendChild(ship));

        container.appendChild(shipStatusCont);
        container.appendChild(drawBoard());

        return container;
    }

    function drawBoard() {
        const board = document.createElement("div");
        const squares = [];

        for (let i = 0; i < gameBoard.board.length; i++) {
            const square = document.createElement("div");
            square.classList.add("square");
            if (i < 10) square.dataset.coords = `0${i}`
            else square.dataset.coords = `${i}`
            squares.push(square);
            board.appendChild(square);
        }

        board.classList.add("board");
        return board;
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
                gameDiv.innerHTML = "";
                gameDiv.appendChild(buildStage());
                gameDiv.appendChild(buildStage());
            }
        }
        return playButton;
    }
}