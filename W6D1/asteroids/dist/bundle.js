/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const GameView = __webpack_require__(1);

window.addEventListener("DOMContentLoaded", function(){
  const canvas = document.getElementById("game-canvas");
  const ctx = canvas.getContext("2d");


  const gameview = new GameView(ctx);
  gameview.start();
});


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(2);

const GameView = function GameView(ctx){
  this.ctx = ctx;
  this.game = new Game();
};

GameView.prototype.start = function start(){
  // function animate(){
  //   this.game.moveObjects();
  //   this.game.draw();
  //   window.requestAnimationFrame(animate.bind(this));
  // }
  // window.requestAnimationFrame(animate.bind(this));
  window.setInterval(function(){
    this.game.step();
    this.game.draw(this.ctx);
  }.bind(this), 20);
};

module.exports = GameView;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Asteroid = __webpack_require__(3);
const Util = __webpack_require__(5);
const Ship = __webpack_require__(6);

const Game = function Game(){
  this.asteroids = [];
  this.addAsteroids();
  this.image = document.getElementById("background");
  this.ship = new Ship({pos: this.randomPosition(true),
                        vel: Util.randomVec(0),
                        game: this});
};

Game.DIM_X = 1200;
Game.DIM_Y = 600;
Game.NUM_ASTEROIDS = 20;

Game.prototype.randomPosition = function (ship) {
  if (ship){
    return [
      Math.floor(Math.random() * Game.DIM_X),
      Math.floor(Math.random() * Game.DIM_Y)
    ];
  }
  if (Math.random() < 0.5){
    return [
      Math.floor(Math.random() * Game.DIM_X),
      Math.random() < 0.5 ? 0 : Game.DIM_Y
    ];
  }else{
    return [
      Math.random() < 0.5 ? 0 : Game.DIM_X,
      Math.floor(Math.random() * Game.DIM_Y)
    ];
  }
};

Game.prototype.allObjects = function () {
  let all = this.asteroids.concat(this.ship);
  return all;
};

Game.prototype.draw = function (ctx) {
  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  ctx.drawImage(this.image, 0, 0, Game.DIM_X, Game.DIM_Y);
  this.allObjects().forEach(function(a){ a.draw(ctx); });
};

Game.prototype.checkCollisions = function () {
  this.allObjects().forEach(function(a, i){
    this.allObjects().forEach(function(b, i2){
      if (i < i2 && a.isCollidedWith(b) && b instanceof Ship){
        a.collideWith(b);
      }
    });
  }.bind(this));
};

Game.prototype.remove = function (asteroid) {
  // let index = this.asteroids.indexOf(asteroid);
  // this.asteroids.splice(index, 1);
  this.asteroids = this.asteroids.filter(a => a !== asteroid);
};

Game.prototype.step = function () {
  this.moveObjects();
  this.checkCollisions();
};


Game.prototype.moveObjects = function (){
  this.allObjects().forEach(el => el.move());
  this.prune();
  this.addAsteroids();
};

Game.prototype.prune = function (){
  this.asteroids = this.asteroids.filter(asteroid =>
    asteroid.pos[0] >= 0 - Asteroid.RADIUS &&
    asteroid.pos[1] >= 0 - Asteroid.RADIUS &&
    asteroid.pos[0] <= Game.DIM_X + Asteroid.RADIUS &&
    asteroid.pos[1] <= Game.DIM_Y + Asteroid.RADIUS
  );
};

Game.prototype.addAsteroids = function () {
  while(this.asteroids.length < Game.NUM_ASTEROIDS){
    this.asteroids.push(new Asteroid({ pos: this.randomPosition(),
                                       game: this }));
  }
};

module.exports = Game;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(4);
const Util = __webpack_require__(5);
const Ship = __webpack_require__(6);

const Asteroid = function Asteroid(options){
  // to call MovingObject constructor: MovingObject.call(this)
  MovingObject.call(this, { radius: Asteroid.RADIUS,
                            color: Asteroid.COLOR,
                            pos: options.pos,
                            vel: Util.randomVec(Asteroid.SPEED),
                            game: options.game
                          });

};

window.Ship = Ship;


Asteroid.COLOR = "grey";
Asteroid.RADIUS = 25;
Asteroid.SPEED = 2;

Util.inherits(Asteroid, MovingObject);

Asteroid.prototype.collideWith = function (otherObject) {
  if (otherObject instanceof Ship){
    otherObject.relocate();
    this.game.remove(this);
  }
  // otherObject.game.remove(otherObject);
};

module.exports = Asteroid;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(5);

function MovingObject(attributes){
  this.pos = attributes["pos"];
  this.vel = attributes["vel"];
  this.radius = attributes["radius"];
  this.color = attributes["color"];
  this.game = attributes.game;
}

MovingObject.prototype.draw = function(ctx){
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.strokeStyle = "black";
  ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2*Math.PI);
  ctx.fill();
  ctx.stroke();
  return this;
};

MovingObject.prototype.collideWith = function (otherObject) {
  console.log("asteroid collideWith");
};

MovingObject.prototype.isCollidedWith = function (otherObject) {
  let distance = Util.distance(this.pos, otherObject.pos);
  return distance < this.radius + otherObject.radius;
};

MovingObject.prototype.move = function(){
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];
  return this;
};

module.exports = MovingObject;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

const Util = {
  inherits (childClass, parentClass){
    childClass.prototype = Object.create(parentClass.prototype);
    childClass.constructor = childClass;
  },

  distance(pos1, pos2){
    const [x1, y1] = pos1;
    const [x2, y2] = pos2;
    const squared = n => Math.pow(n, 2);

    return Math.sqrt(
      squared(x1 - x2) + squared(y1 - y2)
    );
  },

  // Return a randomly oriented vector with the given length.
  randomVec (length) {
    const deg = 2 * Math.PI * Math.random();
    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
  },

    // Scale the length of a vector by the given amount.
  scale (vec, m) {
    return [vec[0] * m, vec[1] * m];
  }
};

module.exports = Util;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(5);
const MovingObject = __webpack_require__(4);

function Ship(options){
  options.radius = Ship.RADIUS;
  options.color = Ship.COLOR;
  MovingObject.call(this, options);
}
Util.inherits(Ship, MovingObject);

Ship.RADIUS = 15;
Ship.COLOR = "red";

Ship.prototype.relocate = function () {
  this.pos = this.game.randomPosition(true);
  this.vel = Util.randomVec(0);
};

module.exports = Ship;


/***/ })
/******/ ]);