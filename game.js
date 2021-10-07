export default function createGame() {
  
  let state = {};

  function enterBoat(characterObject, lakeDiv) {
    if (!characterObject.onBoat) {
      if (characterObject.margin === state.boat.margin) {
        characterObject.onBoat = true;
        state.boat.empty = false;
        lakeDiv.appendChild(characterObject.characterDiv);
        console.log(characterObject);
      }
    }
  }

  function gameWin() {
    setTimeout(() => {
      alert('Parabéns, você conseguiu vencer o jogo!');
      resetGame();
    }, 200);
  }

  function checkGameWin() {
    const testGameWin = Object.keys(state).every((key) => {
      const currentCharacter = state[key];
      return (currentCharacter.margin === 'right');
    });
    if (testGameWin) gameWin();
  }

  function exitBoat(characterObject, margin) {
    const currentCharacterMargin = document.querySelector(`#margin-${margin}`);
    if (characterObject.onBoat) {
      currentCharacterMargin.appendChild(characterObject.characterDiv);
      characterObject.onBoat = false;
      state.boat.empty = true;
    }
    checkGameWin();
  }

  function unregisterCharacter(character) {
    const currentCharacter = document.querySelector(`#${character}`);
    currentCharacter.remove();
  }

  function resetGame() {
    state = {};
    unregisterCharacter('cabbage');
    unregisterCharacter('wolf');
    unregisterCharacter('sheep');
    unregisterCharacter('boat');
    const lakeDiv = document.querySelector('#lake');
    lakeDiv.style.alignContent = 'flex-start';
    registerCharacter('cabbage');
    registerCharacter('wolf');
    registerCharacter('sheep');
    createBoat();
  }

  function checkGameLose() {
    if (state.wolf.margin === state.sheep.margin) {
      if (state.wolf.onBoat) return;
      if (state.sheep.onBoat) return;
      resetGame();
      return alert('O lobo e a ovelha não podem ficar sozinhos!');
    } else if (state.sheep.margin === state.cabbage.margin) {
      if (state.cabbage.onBoat) return;
      if (state.sheep.onBoat) return;
      resetGame();
      return alert('A ovelha e o repolho não podem ficar sozinhos!');
    }
  }

  function checkMovementBoat() {
    const lakeDiv = document.querySelector('#lake');
    const currentCharacterOnBoat = Object.keys(state).find((key) => {
      return state[key].onBoat;
    })
    if (state.boat.margin === 'left') {
      state.boat.margin = 'right';
      lakeDiv.style.alignContent = 'flex-end';
      if (currentCharacterOnBoat) state[currentCharacterOnBoat].margin = 'right';
    } else if (state.boat.margin === 'right') {
      state.boat.margin = 'left';
      lakeDiv.style.alignContent = 'flex-start';
      if (currentCharacterOnBoat) state[currentCharacterOnBoat].margin = 'left';
    }
    checkGameLose();
  }

  function createBoat() {
    const boatDiv = document.createElement('div');
    boatDiv.classList.add('character');
    boatDiv.id = 'boat';
    boatDiv.addEventListener('click', checkMovementBoat);
    boatDiv.style.backgroundImage = 'url(./img/boat.svg)';
    const lakeDiv = document.querySelector('#lake');
    state['boat'] = {
      empty: true,
      margin: 'left',
    };
    lakeDiv.appendChild(boatDiv);
  }

  function checkMoveCharacter(event) {
    const character = event.target.id;
    const lakeDiv = document.querySelector('#lake');
    if (state.boat.empty) {
      enterBoat(state[character], lakeDiv);
    } else if (!state.boat.empty) {
      exitBoat(state[character], state[character].margin);
    }
  }

  function registerCharacter(character) {
    const characterDiv = document.createElement('div');
    characterDiv.classList.add('character');
    characterDiv.id = character;
    characterDiv.addEventListener('click', checkMoveCharacter)
    characterDiv.style.backgroundImage = `url(./img/${character}.svg)`;
    const marginLeftDiv = document.querySelector('#margin-left');
    state[character] = {
      character,
      characterDiv,
      margin: 'left',
      onBoat: false
    };
    marginLeftDiv.appendChild(characterDiv);
  }

  return {
    registerCharacter,
    createBoat,
  };
}
