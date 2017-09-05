const Game = require("./game");

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
