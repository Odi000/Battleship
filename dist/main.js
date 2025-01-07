/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/logic.js":
/*!**********************!*\
  !*** ./src/logic.js ***!
  \**********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GameBoard: () => (/* binding */ GameBoard),\n/* harmony export */   Player: () => (/* binding */ Player),\n/* harmony export */   Ship: () => (/* binding */ Ship)\n/* harmony export */ });\n/* module decorator */ module = __webpack_require__.hmd(module);\n\n\nclass Ship {\n    constructor(length) {\n        this.length = length;\n        this.hitsTaken = 0;\n        this.sunk = false;\n        this.coordinates = null;\n    };\n\n    hit() {\n        this.hitsTaken++;\n    };\n\n    isSunk() {\n        let result = this.hitsTaken >= this.length ? true : false;\n        return result;\n    };\n};\n\nclass GameBoard {\n    constructor() {\n        this.board = [];\n\n        for (let i = 0; i < 10; i++) {\n            for (let j = 0; j < 10; j++) {\n                //index meaning 0 for x, 1 for y, 2 if a ship is there, 3 if this location has been hit \n                this.board.push([i, j, null, false]);\n            }\n        }\n    };\n\n    findCoords(coords) {\n        return this.board.find(location => {\n            if (coords[0] === location[0] && coords[1] === location[1]) return location;\n        })\n    };\n\n    placeShip(ship, x, y, direction) {\n        if (!(x >= 0 && x <= 9) || !(y >= 0 && y <= 9)) return false;\n\n        //check if ship exits in the board and if yes remove it\n        if (this.isShipOnBoard(ship)) this.removeShip(ship);\n        //---//\n\n        const coordinates = [];\n\n        for (let i = 0; i < ship.length; i++) {\n            if (!i) {\n                coordinates.push([x, y]);\n            } else if (direction === \"horizontal\") {\n                if (++x > 9) return false;\n                coordinates.push([x, y]);\n            } else {\n                if (++y > 9) return false;\n                coordinates.push([x, y]);\n            };\n        };\n\n        coordinates.forEach(coordinate => {\n            const location = this.findCoords(coordinate);\n            location[2] = ship;\n        });\n\n        ship.coordinates = coordinates;\n        return coordinates;\n\n    };\n\n    isShipOnBoard(ship) {\n        if (this.board.find(location => location[2] === ship)) return true;\n        else return false;\n    };\n\n    removeShip(ship) {\n        if (!ship.coordinates) return;\n\n        ship.coordinates.forEach(coordinate => {\n            const location = this.findCoords(coordinate);\n\n            location[2] = null;\n        });\n    };\n\n    receiveAttack(x, y) {\n        const location = this.findCoords([x, y]);\n\n        if (location[3]) return \"Already been shot\";\n        location[3] = true;\n\n        if (location[2]) {\n            const ship = location[2];\n            ship.hit();\n            return \"Enemy Shot\";\n        } else return \"Missed Shot\";\n    };\n\n    allShipsDown(...ships) {\n        let sunkenShips = 0;\n        // console.log(ships)\n        for (let ship of ships) {\n            if (ship.isSunk()) sunkenShips++;\n        };\n\n        if (sunkenShips === ships.length) return true;\n        else return false;\n    }\n};\n\nclass Player {\n    constructor(type){\n        this.type = type;\n        this.board = new GameBoard();\n    }\n}\n\nmodule.exports = {\n    Ship,\n    GameBoard\n};\n\n//# sourceURL=webpack://battleship/./src/logic.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _logic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./logic */ \"./src/logic.js\");\n\n\nconsole.log(_logic__WEBPACK_IMPORTED_MODULE_0__.Ship);\n\n//# sourceURL=webpack://battleship/./src/main.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/harmony module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.hmd = (module) => {
/******/ 			module = Object.create(module);
/******/ 			if (!module.children) module.children = [];
/******/ 			Object.defineProperty(module, 'exports', {
/******/ 				enumerable: true,
/******/ 				set: () => {
/******/ 					throw new Error('ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: ' + module.id);
/******/ 				}
/******/ 			});
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.js");
/******/ 	
/******/ })()
;