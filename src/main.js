class Ship {
    constructor(length) {
        this.length = length;
        this.hitsTaken = 0;
        this.sunk = false;
    }

    hit() {
        this.hitsTaken++;
    }

    isSunk() {
        let result = this.hitsTaken >= this.length ? true : false;
        return result;
    }
}

class GameBoard {
    constructor() {
        this.board = [];

        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                this.board.push([i, j, null]);
            }
        }
    }

    placeShip(ship, x, y, direction) {
        if (!(x >= 0 && x <= 9) || !(y >= 0 && y <= 9)) return false;
        const coordinates = [];
        
        for (let i = 0; i < ship.length; i++) {
            if (!i) {
                coordinates.push([x, y]);
            } else if (direction === "horizontal") {
                if (++x > 9) return false;
                coordinates.push([x, y]);
            } else {
                if (++y > 9) return false;
                coordinates.push([x, y]);
            }
        }
        
        console.log(coordinates)

        return coordinates;
    }
}

module.exports = {
    Ship,
    GameBoard
};