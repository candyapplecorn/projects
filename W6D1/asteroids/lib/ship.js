const Util = require('./utils');
const MovingObject = require('./moving_object');

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
