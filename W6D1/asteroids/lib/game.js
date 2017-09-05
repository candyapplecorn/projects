const Asteroid = require('./asteroid');
const Util = require('./utils');
const Ship = require('./ship');

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
