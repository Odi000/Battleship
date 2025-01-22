import {
    Ship,
    GameBoard,
    Player
} from "./logic";
import "./styles.css";
import crackImg from "./images/cracked.png"
import shotImg from "./images/shot.png"

gamePlay();
function gamePlay() {
    const gameBoard = new GameBoard();
    const player1 = new Player("first");
    const player2 = new Player("second");
    const shipObjects1 = buildShipObjects(5);
    const shipObjects2 = buildShipObjects(5);



    const gameDiv = document.getElementById("game");
    gameDiv.innerHTML = "";

    const playButton = createPlayButton();
    gameDiv.appendChild(playButton);

    // selectMode();

    function startRound(nr) {
        let player, enemyPlayer;
        if (nr % 2 === 0) player = player1, enemyPlayer = player2;
        else player = player2, enemyPlayer = player1;
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

        const enemyBoard = [...gameDiv.querySelectorAll(".hide .square")];
        const enemyBoard1 = gameDiv.querySelector(".hide .board");

        enemyBoard1.addEventListener("click", clicked)

        function clicked(e) {
            if(e.target === e.currentTarget) return;
            const square = e.target.closest(".square");
            const coodrs = square.dataset.coords.split("").map(el => Number(el));
            const resultMsg = enemyPlayer.board.receiveAttack(...coodrs)
            
            if(resultMsg === "Already been shot") return;
            else if(resultMsg === "Enemy Shot"){
                const shotShipImg = document.createElement("img");
                shotShipImg.src = crackImg;
                shotShipImg.style.transform = `rotate(${360 / Math.floor(Math.random() * 4 + 1)}deg)`;
                square.appendChild(shotShipImg);
            } else {
                // code for missed shot
            }

            enemyBoard1.removeEventListener("click", clicked);
            startRound(nr);
        }


        // enemyBoard.forEach(square => {
        //     square.onclick = (e)=>{ 
        //         console.log(e)
        //         console.log(e.target.dataset)
        //         console.log(e.target.dataset.coords)
        //         const coodrs = e.target.dataset.coords.split("").map(el => Number(el));
        //         // console.log(coodrs)
        //         console.log(enemyPlayer.board.receiveAttack(...coodrs));
        //         const shotShipImg = document.createElement("img");

        //         shotShipImg.src = crackImg;
        //         shotShipImg.style.transform = `rotate(${360/Math.floor(Math.random()*4+1)}deg)`;
        //         e.target.appendChild(shotShipImg);

        //         enemyBoard.forEach(square => square.onclick = null);

        //         startRound(nr);
        //     }
        // })

        // after shot
        if (enemyPlayer.board.allShipsDown()) return "finito";
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
        for (let i = 0; i < shipObjects1.length; i++) {
            const ship = document.createElement("div");
            ship.classList.add(`S${i + 1}`);

            for (let j = 0; j < shipObjects1[i].length; j++) {
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
        player1.type = "human";
        player2.type = "human";

        gameDiv.appendChild(buildStage(player1));
        gameDiv.appendChild(buildStage(player2));

        const dom_board1 = [...document.querySelectorAll(".board")[0].childNodes];
        const dom_board2 = [...document.querySelectorAll(".board")[1].childNodes];

        for (let i = 0; i < shipObjects1.length; i++) {
            const coords = placeShipsRandomly(shipObjects1[i], player1.board);
            drawShips(coords, dom_board1);
        }

        for (let i = 0; i < shipObjects2.length; i++) {
            const coords = placeShipsRandomly(shipObjects2[i], player2.board);
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
                    player1.type = "human";
                    player2.type = "computer";
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