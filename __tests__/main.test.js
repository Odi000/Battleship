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
    expect(gameBoard.placeShip(liburna, -1, 0, "vertical")).toBe(false);
    expect(gameBoard.placeShip(liburna, 0, 0, "vertical")).toEqual([[0, 0], [0, 1], [0, 2]]);
    expect(gameBoard.placeShip(liburna, 0, 0, "horizontal")).toEqual([[0, 0], [1, 0], [2, 0]]);
    expect(gameBoard.placeShip(liburna, 7, 8, "horizontal")).toEqual([[7, 8], [8, 8], [9, 8]]);
    expect(gameBoard.placeShip(liburna, 7, 8, "vertical")).toBe(false);
})