// Function.prototype.inherits = function(parent) {
//   function Surrogate (){}
//   Surrogate.prototype = parent.prototype;
//   this.prototype = new Surrogate();
//   this.prototype.constructor = this;
// };

Function.prototype.inherits = function(parent){
  this.prototype = Object.create(parent.prototype);
  this.constructor = this;
};

function MovingObject (name) {
  this.name = name;
  this.dog = 5;
}

MovingObject.prototype.sail = function(){
  console.log("sail on what?");
};

MovingObject.prototype.crash = function(){
  console.log("crash on what?");
};

function Ship (name) {
  MovingObject.call(this);
  this.name = name;
}
Ship.inherits(MovingObject);

function Asteroid () {}
Asteroid.inherits(MovingObject);


Ship.prototype.sail = function(){
  console.log("on water");
  // this.__proto__.sail();
};

Asteroid.prototype.crash = function (){
  console.log("on earth");
};

const object = new MovingObject("jerry");
const ship = new Ship("burger");
const asteroid = new Asteroid();

// object.sail();
// object.crash();
console.log(ship.dog);
ship.sail();
