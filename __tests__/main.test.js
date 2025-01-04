const game = require("../src/main");

test("Increases the number of 'hits' in your ship", () => {
    const liburna = new game.Ship(5)
    liburna.hit();
    expect(liburna.hitsTaken).toBe(1);
    liburna.hit()
    liburna.hit()
    expect(liburna.hitsTaken).toBe(3)
});

test("Calculates whether a ship is considered sunk", () => {
    const liburna = new game.Ship(3)
    expect(liburna.isSunk()).toBe(false);
    liburna.hit()
    liburna.hit()
    expect(liburna.isSunk()).toBe(false);
    liburna.hit()
    expect(liburna.isSunk()).toBe(true);
})

test("Board should have 100 coordinates", () => {
    const gameBoard = new game.GameBoard();
    expect(gameBoard.board.length).toBe(100)
})

test("Place ship in specific coordinates", () => {
    const gameBoard = new game.GameBoard();
    const liburna = new game.Ship(3)

    expect(gameBoard.placeShip(liburna, -1, 0)).toBe(false);
    expect(gameBoard.placeShip(liburna, 0, 0)).toEqual([[0, 0], [0, 1], [0, 2]]);
    expect(gameBoard.placeShip(liburna, 0, 0, "horizontal")).toEqual([[0, 0], [1, 0], [2, 0]]);
    expect(gameBoard.placeShip(liburna, 7, 8, "horizontal")).toEqual([[7, 8], [8, 8], [9, 8]]);
    expect(gameBoard.placeShip(liburna, 7, 8)).toBe(false);
});

test("Find if ship is already on board", () => {
    const gameBoard = new game.GameBoard();
    const liburna = new game.Ship(3);
    expect(gameBoard.isShipOnBoard(liburna)).toBe(false);
    gameBoard.placeShip(liburna, 6, 7)
    expect(gameBoard.isShipOnBoard(liburna)).toBe(true)
});

test("Remove Ship", () => {
    const gameBoard = new game.GameBoard();
    const liburna = new game.Ship(3)

    gameBoard.placeShip(liburna, 0, 0);
    expect(gameBoard.board[0][2]).toBe(liburna);

    gameBoard.removeShip(liburna);
    expect(gameBoard.board[0][2]).toBe(null);
})

test("Ship cannot be placed two times in the borad", () => {
    const gameBoard = new game.GameBoard();
    const liburna = new game.Ship(3)

    gameBoard.placeShip(liburna, 0, 0);
    expect(gameBoard.board[0][2]).toBe(liburna);

    gameBoard.placeShip(liburna, 7, 8, "horizontal");
    expect(gameBoard.board[78][2]).toBe(liburna);
    expect(gameBoard.board[0][2]).toBe(null);
});

test("determines whether or not the attack hit a ship or not", () => {
    const gameBoard = new game.GameBoard();
    const liburna = new game.Ship(3)

    gameBoard.placeShip(liburna, 5, 5, "horizontal")

    expect(gameBoard.board[65][3]).toBe(false);
    expect(gameBoard.board[0][3]).toBe(false);

    expect(gameBoard.receiveAttack(0, 0)).toBe("Missed Shot");
    expect(gameBoard.receiveAttack(6, 5)).toBe("Enemy Shot");
    expect(liburna.hitsTaken).toBe(1);
    expect(gameBoard.board[65][3]).toBe(true);
    expect(gameBoard.board[0][3]).toBe(true);

    expect(gameBoard.receiveAttack(0, 0)).toBe("Already been shot");
});

test("Report whether or not all of their ships have been sunk", () => {
    const gameBoard = new game.GameBoard();
    const liburna = new game.Ship(3)
    const cajkovski = new game.Ship(3)
    const kafka = new game.Ship(3)

    expect(gameBoard.allShipsDown(liburna,cajkovski,kafka)).toBe(false);

    //pleace three ships on board
    gameBoard.placeShip(liburna, 0, 0);
    gameBoard.placeShip(cajkovski, 2, 0);
    gameBoard.placeShip(kafka, 4, 0);

    //attack liburna
    gameBoard.receiveAttack(0, 0)
    gameBoard.receiveAttack(0, 1)
    gameBoard.receiveAttack(0, 2)

    //attack cajkovski
    gameBoard.receiveAttack(2, 0)
    gameBoard.receiveAttack(2, 1)
    gameBoard.receiveAttack(2, 2)

    //attack kafka only 2/3
    gameBoard.receiveAttack(4, 0)
    gameBoard.receiveAttack(4, 1)

    expect(gameBoard.allShipsDown(liburna,cajkovski,kafka)).toBe(false);

    //finish kafka
    gameBoard.receiveAttack(4, 2);

    expect(gameBoard.allShipsDown(liburna,cajkovski,kafka)).toBe(true);
});