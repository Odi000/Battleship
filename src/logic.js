class Ship {
    constructor(length) {
        this.length = length;
        this.hitsTaken = 0;
        this.sunk = false;
        this.coordinates = null;
        this.adjacentLocations = null;
    };

    hit() {
        this.hitsTaken++;
    };

    isSunk() {
        let result = this.hitsTaken >= this.length ? true : false;
        return result;
    };
};

class GameBoard {
    constructor() {
        this.board = [];

        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                //index meaning
                //0: for x
                //1: for y
                //2: shows if there is a shipObj or if ship is nextby
                //3: if this location has been hit 
                this.board.push([i, j, null, false]);
            }
        }
    };

    findCoords(coords) {
        return this.board.find(location => {
            if (coords[0] === location[0] && coords[1] === location[1]) return location;
        })
    };

    placeShip(ship, x, y, direction) {
        if (!(x >= 0 && x <= 9) || !(y >= 0 && y <= 9)) return false;
        //check if ship exits in the board and if yes remove it
        if (this.isShipOnBoard(ship)) this.removeShip(ship);
        //---//

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
            };
        };

        for (const coordinate of coordinates) {
            const location = this.findCoords(coordinate);
            if (location[2]) {
                if (this.isShipOnBoard(ship)) this.removeShip(ship);
                return false;
            }
            location[2] = ship;
        }

        
        ship.coordinates = coordinates;
        ship.adjacentLocations = this.occupyAdjacentCoords(coordinates);
        return coordinates;
    };

    occupyAdjacentCoords(coordinates) {
        const adjacentLocations = [];

        for (const c of coordinates) {
            const adjacentCoords = [
                [c[0] - 1, c[1]],
                [c[0] + 1, c[1]],
                [c[0], c[1] - 1],
                [c[0], c[1] + 1]
            ];

            for (const coord of adjacentCoords) {
                const location = this.findCoords(coord);
                if (!location) continue;
                if(location[2]) continue;
                location[2] = true;
                adjacentLocations.push(location);
            };
        };

        return adjacentLocations;
    }

    isShipOnBoard(ship) {
        if (this.board.find(location => location[2] === ship)) return true;
        else return false;
    };

    removeShip(ship) {
        if (!ship.coordinates) return;

        ship.coordinates.forEach(coordinate => {
            const location = this.findCoords(coordinate);
            location[2] = null;
        });

        console.log(ship)

        ship.adjacentLocations.forEach(coordinate => {
            const location = this.findCoords(coordinate);
            location[2] = null;
        })
    };

    receiveAttack(x, y) {
        const location = this.findCoords([x, y]);

        if (location[3]) return "Already been shot";
        location[3] = true;

        if (location[2]) {
            const ship = location[2];
            ship.hit();
            return "Enemy Shot";
        } else return "Missed Shot";
    };

    allShipsDown(...ships) {
        let sunkenShips = 0;
        for (let ship of ships) {
            if (ship.isSunk()) sunkenShips++;
        };

        if (sunkenShips === ships.length) return true;
        else return false;
    }
};

class Player {
    constructor(turn) {
        this.type = null;
        this.turn = turn
        this.board = new GameBoard();
    }
}

module.exports = {
    Ship,
    GameBoard,
    Player,
};