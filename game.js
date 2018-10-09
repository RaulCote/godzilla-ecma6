class Game {

  constructor(parent) {
  const self = this;

  self.parentElement = parent;
  self.gameElement = null;

  self._init();
  self._startLoop();
  }

  ////////////////START POINT ::: Game HTML design plus some early function launchers. 
  _init() {
    const self = this;

    self.gameElement = buildDom(`
      <main class="game container">
        <header class="game__header">
          <div class="godzilla-div">
            <span class="godzilla">GODZILLA  ||</span>
            <span class="score">score:</span>
            <span class="score-value"></span>
            <span class="coolness"> ||  coolness:</span>
            <span class="coolness-value"><span>
          </div>
          <div class="rounds">
            <span class="round">Round:</span>
            <span class="round-value"></span>
          </div>
          <div class="gamera-div">
            <span class="gamera">GAMERA  ||</span>
            <span class="gscore">score:</span>
            <span class="gscore-value"></span>
            <span class="gcoolness">||  coolness:</span>
            <span class="gcoolness-value"></span>
          </div>
        </header>
        <div class="game__canvas">
          <canvas class="canvas"></canvas>
        </div>
      </main>
    `)
    self.parentElement.appendChild(self.gameElement);

    self.canvasParentElement = document.querySelector('.game__canvas');
    self.canvasElement = document.querySelector('.canvas');

    self.godzillaScoreElement = document.querySelector('.score-value');
    self.godzillaCoolnessElement = document.querySelector('.coolness-value');

    self.gameraScoreElement = document.querySelector('.gscore-value');
    self.gameraCoolnessElement = document.querySelector('.gcoolness-value');

    self.roundElement = document.querySelector('.round-value');


    self.width = self.canvasParentElement.clientWidth;
    self.height = self.canvasParentElement.clientHeight;

    self.canvasElement.setAttribute('width', self.width);
    self.canvasElement.setAttribute('height', self.height);

    self.ctx = self.canvasElement.getContext('2d');  
    
    self.soundtrack = new Audio('./sounds/soundtrack-limpio-2.mp3');
    self.soundtrack.play();
    self.soundtrack.currentTime = 0;

    self._setupEventListener();
    self._screams();
  }

  ////////////START LOOP ::: Updates canvas, player positions and checks for Game Over.
  _startLoop() {
    const self = this;
                // Son los argumentos del Player(canvasElement, y, x)
    self.godzilla = new Player(self.canvasElement, self.canvasElement.height, self.canvasElement.width, 'left', 'fighter-left'); 
    self.gamera = new Player(self.canvasElement, self.canvasElement.height, self.canvasElement.width, 'right', 'fighter-right');
    
    self.godzilla.initialPosition();
    self.gamera.initialPosition();

    self.round = 1;

    function loop() {
      self._clearAll();
      self._updateAll();
      self._renderAll();

      if (self.godzilla.score > 1 || self.gamera.score > 1) {
        self.onGameOverCallback();
      } else {
        requestAnimationFrame(loop);
      }
    }
    requestAnimationFrame(loop);
  }


  ////////////PASSIVE MODE ::: Before they get into fight. Movement behavior.
  _setupEventListener() {
    const self = this;

    self.handleKeyDown = function(evt) {
      if (evt.key === "ArrowLeft" && self.godzilla.push === 0) {
        self.godzilla.vel++;
        self.godzilla.push = 1;
      }
      else if (evt.key === "ArrowRight" && self.gamera.push === 0) {
        self.gamera.vel++;
        self.gamera.push = 1
      }
    };

    self.handleKeyUp = function(evt) {
  
      if (evt.key === "ArrowLeft" && self.godzilla.push === 1)  {
        self.godzilla.push = 0;
      }
      else if (evt.key === "ArrowRight" && self.gamera.push === 1) {
        self.gamera.push = 0;
      }
    }; 

    document.addEventListener('keydown', self.handleKeyDown);
    document.addEventListener('keyup', self.handleKeyUp);
  }

  //////////// FIGHT MODE ::: When players collision change the movements behavior.
  _fightMode() {
    const self = this;
    document.removeEventListener('keydown', self.handleKeyDown);
    document.removeEventListener('keyup', self.handleKeyUp);

    self.isFightMode = true;

    self.fightKeyDown = function(evt) {
      if (evt.key === "ArrowLeft" && self.godzilla.push === 0) {
        self.godzilla.x+=100;
        self.gamera.x+=100;
        self.godzilla.push = 1;
      }
      else if (evt.key === "ArrowRight" && self.gamera.push === 0) {
        self.godzilla.x-=100;
        self.gamera.x-=100;
        self.gamera.push = 1;
      }
    }
    
    self.fightKeyUp = function(evt) {
      if (evt.key === "ArrowLeft" && self.godzilla.push ===1) {
        self.godzilla.push = 0;
        }
        else if (evt.key === "ArrowRight" && self.gamera.push ===1) {
          self.gamera.push = 0;
        }
      }

      document.addEventListener('keydown', self.fightKeyDown)
      document.addEventListener('keyup', self.fightKeyUp)
    };

    /////////////  PLAYER SOUNDS ::: Controlled with keyboard. Give coolness points.
  _screams() {
    const self = this;

    self.screamKey = function(evt) {
      if (evt.key === "0") {
        console.log('hey')
        const audioGodzilla = new Audio('./sounds/godzilla-scream-corto-2.mp3')
        audioGodzilla.play()
        self.godzilla.coolness += 100
      }

      else if (evt.key === "1") {
        const audioGamera = new Audio('./sounds/gamera-scream.wav')
        audioGamera.play()
        self.gamera.coolness += 100
      }
      
    }
      document.addEventListener('keydown', self.screamKey)
  }

  /////////////// UPDATE ::: Checks if there are collisions
  _updateAll() {
    const self = this;

    self._rounds();
    self._checkAllCollision();
    
    if (!self.isFightMode) {
      self.godzilla.update();
      self.gamera.update();
    }
  }

  ////////////// RENDER ::: UI and Players
  _renderAll() {
    const self = this;
    self._updateUI();
    self.godzilla.render();
    self.gamera.render();
  }

  ////////////// CLEAR ::: Resets the canvas.
  _clearAll()  {
    const self = this;
    self.ctx.clearRect(0, 0, self.width, self.height);
  }

  ////////////// COLLISIONS ::: Between players, most logic is on player.js itself. This is the logic for changing between passive mode and fight mode.
  _checkAllCollision() {
    const self = this;
    
    if (self.godzilla.checkCollision(self.gamera) && !self.isFightMode) {
      self._fightMode();
    }
  }

  //////////////  DEADS ::: Logic when a player touch the screen border (ie: next round, introducing sound and update scores)
  _rounds() {
    const self = this;
    
    if (self.gamera.x > self.canvasElement.width /*- self.gamera.size*/) {
      self.godzilla.score++;
      const audioGamera = new Audio('./sounds/gamera-scream.wav')
      audioGamera.play()
      self._nextRound();
    }

    else if (self.godzilla.x /* self.godzilla.size  */ < 0 - self.godzilla.size) {
      self.gamera.score++;
      const audioGodzilla = new Audio('./sounds/godzilla-scream-corto-2.mp3')
      audioGodzilla.play()
      self._nextRound();
    }
  }

  //////////////// NEXT ROUND RESET :: Some properties come from Player.js
  _nextRound() {
    const self = this;
    self.round++;
    document.removeEventListener('keyup', self.fightKeyDown)
    document.removeEventListener('keydown', self.fightKeyDown)
    self.godzilla.resetRound();
    self.gamera.resetRound();
    self.isFightMode = false;
    self._setupEventListener();
  }

  //////////////// UPDATES GAME SCORES (ON GAME SCREEN)
  _updateUI() {
    const self = this;
    
    self.roundElement.innerText = self.round;
    self.godzillaScoreElement.innerText = self.godzilla.score;
    self.godzillaCoolnessElement.innerText = self.godzilla.coolness;
    self.gameraScoreElement.innerText = self.gamera.score;
    self.gameraCoolnessElement.innerText = self.gamera.coolness;

  }

  //////////////// GAME OVER

  onOver(callback) {
    const self = this;

    self.onGameOverCallback = callback;
  }


  destroy() {
    const self = this;
    self.gameElement.remove();
    self.soundtrack.pause();
    document.removeEventListener('keydown', self.screamKey)
  }

}
 
