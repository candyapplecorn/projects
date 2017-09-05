const MovingObject = require('./moving_object');
const Util = require('./utils');
const Ship = require('./ship');

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
