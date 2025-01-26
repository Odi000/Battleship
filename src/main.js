import {
    Ship,
    GameBoard,
    Player
} from "./logic";
import "./styles.css";
import crackImg from "./images/cracked.png"

gamePlay();
function gamePlay() {
    const gameBoard = new GameBoard();
    const p1 = new Player("first");
    const p2 = new Player("second");
    const nrOfShips = 5;

    p1.fleet = buildShipObjects(nrOfShips);
    p2.fleet = buildShipObjects(nrOfShips);

    const gameDiv = document.getElementById("game");
    gameDiv.innerHTML = "";

    const playButton = createPlayButton();
    gameDiv.appendChild(playButton);

    function startRound(nr) {
        let player, enemyPlayer;
        if (nr % 2 === 0) player = p1, enemyPlayer = p2;
        else player = p2, enemyPlayer = p1;
        nr++;

        const container1 = document.getElementById("first");
        const container2 = document.getElementById("second");

        if (enemyPlayer.turn === "first") {
            container1.classList.add("hide");
            container2.classList.remove("hide");
        } else {
            container2.classList.add("hide");
            container1.classList.remove("hide");
        }

        const enemyBoard1 = gameDiv.querySelector(".hide .board");

        enemyBoard1.addEventListener("click", shotsFired);

        function shotsFired(e) {
            if (e.target === e.currentTarget) return;
            const square = e.target.closest(".square");
            const coodrs = square.dataset.coords.split("").map(el => Number(el));
            const attackResponse = enemyPlayer.board.receiveAttack(...coodrs)

            if (attackResponse === "Already been shot") return;
            else if (typeof (attackResponse) === "object") {
                drawEnemyShot(square);
                if (attackResponse.isSunk()) {
                    updateStatusBoard(attackResponse);
                }
            } else {
                drawMissedShot(square);
            }

            enemyBoard1.removeEventListener("click", shotsFired);

            if (enemyPlayer.board.allShipsDown(...enemyPlayer.fleet)) {
                endGame();
            } else {
                setTimeout(()=>startRound(nr),50);
            }
        }
    endGame()
        function endGame() {
            //Draw a table and write "Game Over, Player So so won" edhe button play again;
            console.log(`Ovaa ${enemyPlayer.turn} lost`);

            const container = document.createElement("div");
            const message = document.createElement("h1");
            const playAgainBtn = document.createElement("button");

            container.classList.add("game-over");
            message.textContent = `Player 1 Won!`;
            playAgainBtn.textContent = "Play again";

            container.appendChild(message);
            container.appendChild(playAgainBtn);

            gameDiv.appendChild(container);
        }

        function updateStatusBoard(ship) {
            const shipLength = ship.length;
            let shipNr;

            if (shipLength === 5) shipNr = 5;
            else if (shipLength === 4) shipNr = 4;
            else if (shipLength === 3) {
                shipNr = 2;
                if (document.querySelector(`.hide .S${shipNr}.sunk`)) shipNr++;
            } else shipNr = 1;

            const shipStatus = document.querySelector(`.hide .S${shipNr}`);
            shipStatus.classList.add("sunk");
        };

        function drawEnemyShot(boardSquare) {
            const shotShipImg = document.createElement("img");
            shotShipImg.src = crackImg;
            shotShipImg.style.transform = `rotate(${360 / Math.floor(Math.random() * 4 + 1)}deg)`;

            boardSquare.appendChild(shotShipImg);
            boardSquare.classList.add("shot");
        }

        function drawMissedShot(boardSquare) {
            const hole = document.createElement("div");
            boardSquare.appendChild(hole);

            setTimeout(() => hole.classList.add("explode"), 5);
        }
    }

    function drawShips(coords, board) {
        const squares = [];

        coords.forEach(coord => {
            coord = coord.join("");
            board.find(square => {
                if (square.dataset.coords === coord) {
                    squares.push(square);
                }
            })
        })

        squares.forEach(square => square.classList.toggle("ship"))
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

    function placeShipsRandomly(ship, logicBoard) {
        let x = Math.floor(Math.random() * 10);
        let y = Math.floor(Math.random() * 10);
        let direction = false;

        if (5 <= (Math.random() * 10 + 1)) {
            direction = "horizontal"
        }

        const coords = logicBoard.placeShip(ship, x, y, direction);

        if (!coords) return placeShipsRandomly(ship, logicBoard);
        return coords;
    }

    function buildStage(player) {
        const container = document.createElement("div");
        const shipStatusCont = document.createElement("div");
        const ships = [];
        for (let i = 0; i < p1.fleet.length; i++) {
            const ship = document.createElement("div");
            ship.classList.add(`S${i + 1}`);

            for (let j = 0; j < p1.fleet[i].length; j++) {
                const bodyPart = document.createElement("div");
                ship.appendChild(bodyPart);
            }

            ships.push(ship);
        }

        if (player.turn === "first") container.id = "first";
        else container.id = "second";
        container.classList.add("container");
        shipStatusCont.classList.add("ships");

        ships.forEach(ship => shipStatusCont.appendChild(ship));

        container.appendChild(shipStatusCont);
        container.appendChild(drawBoard());

        return container;
    }

    function startGame() {
        gameDiv.innerHTML = "";
        p1.type = "human";
        p2.type = "human";

        gameDiv.appendChild(buildStage(p1));
        gameDiv.appendChild(buildStage(p2));

        const dom_board1 = [...document.querySelectorAll(".board")[0].childNodes];
        const dom_board2 = [...document.querySelectorAll(".board")[1].childNodes];

        for (let i = 0; i < p1.fleet.length; i++) {
            const coords = placeShipsRandomly(p1.fleet[i], p1.board);
            drawShips(coords, dom_board1);
        }

        for (let i = 0; i < p2.fleet.length; i++) {
            const coords = placeShipsRandomly(p2.fleet[i], p2.board);
            drawShips(coords, dom_board2);
        }

        startRound(0);
    }

    function selectMode() {
        const containerDiv = document.createElement("div");
        const heading = document.createElement("h1");
        const _2player = document.createElement("button");
        const _vsCPU = document.createElement("button");

        heading.textContent = "Select mode:";
        _2player.textContent = "2 Player";
        _vsCPU.textContent = "CPU";

        containerDiv.classList.add("select-mode");

        _2player.ontransitionend = (e) => {
            if (e.propertyName === "border-bottom-color") {
                _2player.classList.add("dissapear");
                containerDiv.classList.add("dissapear");
            }
            if (e.propertyName === "opacity") {
                if (e.target.textContent === "2 Player") {
                    startGame()
                } else {
                    p1.type = "human";
                    p2.type = "computer";
                    gameDiv.innerHTML = "";
                };
            }
        }

        containerDiv.appendChild(heading);
        containerDiv.appendChild(_2player);
        containerDiv.appendChild(_vsCPU);

        return containerDiv;
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
                gameDiv.appendChild(selectMode());
            }
        }
        return playButton;
    }

    function buildShipObjects(nr) {
        const ships = [];
        for (let i = 0; i < nr; i++) {
            let ship = null;
            if (i >= 2) ship = new Ship(i + 1);
            else ship = new Ship(i + 2);
            ships.push(ship);
        }
        return ships;
    }
}