import createGame from "./game.js";

const game = createGame();

function initGame() {
  game.registerCharacter('cabbage');
  game.registerCharacter('wolf');
  game.registerCharacter('sheep');
  game.createBoat();
}

window.onload = () => {
  initGame();
}