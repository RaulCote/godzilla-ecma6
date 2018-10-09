
const buildDom = (html) => {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.children[0];
}

const main = () => {
  const mainContainerElement = document.querySelector('#main-container');
  
  let splashElement = null;
  let splashButton = null;
  let controlsElement = null; // Alias real Splash
  let controlsButton = null;

  
  const startGame = () => {
    destroySplash();
    buildGame();
  }
  
  const controlsGame = () => {
    destroySplash();
    buildControls();
  }

  const controlsBackToMenu = () => {
    destroyControls();
    buildSplash();
  }

  const buildSplash = () => {
    splashElement = buildDom(`
    <main class="splash container">
      <h1 class="splash__title">Go Go Godzilla!</h1>
      <button class="button start">Start</button>
      <button class="button controls">Controls</button>
    </main>
    `)
    mainContainerElement.appendChild(splashElement);

    controlsButton = document.querySelector('.controls');
    controlsButton.addEventListener('click', controlsGame);

    splashButton = document.querySelector('.start');
    splashButton.addEventListener('click', startGame);
  }

  const destroySplash = () => {
    controlsButton.removeEventListener('click', controlsBackToMenu);
    splashButton.removeEventListener('click', startGame);
    splashElement.remove();
  }


const buildControls = () => {
  controlsElement = buildDom(`
  <main class="splash container">
    <div class ="history">
      <h2>History</h2>
      <p class="p-history">Yesterday Godzilla was partying with Gamera, it was a great Saturday night. Boozing around, playing billard, going from one pub to another. But suddenly Godzilla turned crazy just as Rottweilers do and now they are having the fight of their lives! Go Go Godzilla!</p>
    </div>
    <h2 class="controls-title">Controls</h2>
    <div class ="controls">
      <div class ="controls-godzilla">
        <p>Godzilla</p>
        <p>Fight : Arrow Left</p>
        <p>Scream : 0</p>
      </div>
      <div class="controls-gamera">
        <p>Gamera</p>
        <p>Fight : Arrow Right</p>
        <p>Scream : 1</p>
      </div>
    </div>
    <button class="button back-to-start">Back</button>
  </main>
  `)
  mainContainerElement.appendChild(controlsElement);

  backToStartButton = document.querySelector('.back-to-start');
  backToStartButton.addEventListener('click', controlsBackToMenu)
}

const destroyControls = () => {
  backToStartButton.removeEventListener('click', controlsBackToMenu)
  controlsElement.remove();
}

let game = null;
const handleGameOver = () => {
  destroyGame();
 buildGameover(game.godzilla.score, game.gamera.score, game.godzilla.coolness, game.gamera.coolness);
}

const buildGame = () => {
  game = new Game(mainContainerElement);
  game.onOver(handleGameOver);
}

const destroyGame = () => {
  game.destroy(); 
}

let gameoverElement = null;
let gameoverButton = null;

const handleGameoverClick = () => {
  destroyGameover();
  buildSplash();
}

const buildGameover = () => {
  gameoverElement = buildDom(`
  <main class="gameover container">
  <h1>Game Over</h1>
  <p>Godzilla score: <span class="godzilla-score"></span></p>
  <p>Godzilla coolness: <span class="godzilla-coolness"></span></p>
  <p>Gamera score: <span class="gamera-score"></span></p>
  <p>Gamera coolness: <span class="gamera-coolness"></span></p>
  <button class="button restart">Restart</button>
  </main>
  `);
  mainContainerElement.appendChild(gameoverElement);
  
  gameoverButton = document.querySelector('button');
  gameoverButton.addEventListener('click', handleGameoverClick);
  
  const scoreGodzillaElement = document.querySelector('.godzilla-score');
  scoreGodzillaElement.innerText = game.godzilla.score;
  const coolnessGodzillaElement = document.querySelector('.godzilla-coolness');
  coolnessGodzillaElement.innerText = game.godzilla.coolness;

  const scoreGameraElement = document.querySelector('.gamera-score');
  scoreGameraElement.innerText = game.gamera.score;
  const coolnessGameraElement = document.querySelector('.gamera-coolness');
  coolnessGameraElement.innerText = game.gamera.coolness;
}

const destroyGameover = () => {
  gameoverButton.removeEventListener('click', handleGameoverClick);
  gameoverElement.remove();
}

buildSplash();

}

document.addEventListener('DOMContentLoaded', main);
