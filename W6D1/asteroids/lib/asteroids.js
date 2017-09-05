const GameView = require('./game_view');

window.addEventListener("DOMContentLoaded", function(){
  const canvas = document.getElementById("game-canvas");
  const ctx = canvas.getContext("2d");


  const gameview = new GameView(ctx);
  gameview.start();
});
