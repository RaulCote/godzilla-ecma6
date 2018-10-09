# Go Go Godzilla!

## Description
**Go Go Godzilla!** is a game to put in practice some basic concepts from JavaScript 00P and Canvas. The concept is easy, it's a multiplayer game, almost a sumo simulator. Godzilla and Gamera will be pushing each other until any of them gets out of the scenary. The players will control one of the monsters just by pushing a key, it will make it move forward until they touch each other, at that moment the player that pushes harder, the player that will win. To make it fun, there's an extra key to make either Godzilla or Gamera scream.  


## MVP (DOM - CANVAS)
The MVP version will be the concept itself working. One object pushing the other until one it's out of screen, next step is put Canvas to work on it and give it graphical appareance and sounds.

- Create Godzilla
- Create Gamera
- Make them move
- Collision between Godzilla & Gamera
- Collision with screen border

## Backlog
- Add points
- Images
- Design
- Music
- Player sounds
- Rounds
- Different Game Over screens

## Data structure
### main.js
```javascript

buildSplash();
destroySplash();
buildControls();
destroyControls();
buildGame();
destroyGame();
buildGameOver();
destroyGameOver();

```

### player.js
```javascript
Player {
  self.x
  self.y
  self.size
  self.vel 
  self.side
  self.score
  self.coolness
  self.ctx
}

Player.prototype.initialPosition;
Player.prototype.resetRound;
Player.prototype.update;
Player.prototype.render;
Player.prototype.checkCollision;

```

### game.js
```javascript
Game() {
  self.round
}

Game.prototype._init
Game.prototype._startLoop {
  self._clearAll
  self._updateAll
  self._renderAll
}
Game.prototype._setupEventListener
Game.prototype._fightMode
Game.prototype._screams
Game.prototype._updateAll
Game.prototype._renderAll
Game.prototype._clearAll
Game.prototype._checkAllCollision
Game.prototype._rounds
Game.prototype._nextRound
Game.prototype._updateUI
Game.prototype.onOver
Game.prototype.destroy

```


## States and States Transitions
Definition of the different states and their transition (transition functions)
```javascript
- splashScreen
  - destroyGameOver();
  - buildSplash();

- controlsScreen
  - destroySplash();
  - buildControls();
  - create New Game();

- gameScreen
  - destroyControls();

- gameoverScreen
  - destroyGame()
  - buildGameOver()
  - addEventListener( if splashScreen, else starGame) 

```

## Task
Task definition in order of priority
- Create files
- Main - buildDOM
- Main - Build Splash
- Main - addEventListener to Start Button
- Main - destroySplash
- Main - Build Controls Menu
- Main - addEventListener to Controls Button
- Main - destroyControls
- Game - buildDOM
- Main - GameOver
- Main - Destroy Game
- Main - GameOver Restart
- Player - Create
- Player - Functions
- Game - Create Player
- Game - Loop
- Game - Clear
- Game - Canvas
- Player - Collisions
- Game - Collisions
- Game - Fight Mode
- Game - Rounds
- Game - Game Over


## Links


### Git
URls for the project repo and deploy
[Link Repo](https://github.com/RaulCote/go-go-godzilla)
[Link Deploy](https://raulcote.github.io/go-go-godzilla/)


### Slides
URls for the project presentation (slides)
[Link Slides.com](https://slides.com/raulcote/raul-cote-utor/fullscreen)