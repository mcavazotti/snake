# Snake

# Architecture description

## Overview
The game itself will be contained inside an object of the class `SnakeGame`. It will take the HTML canvas **id** and an optional `GameConfig` object as constructor parameters. The class `SnakeGame` will be responsible of:

- setting up the canvas' event listeners
- rendering the game
- handling user input and other game events (game loop)
- taking care of the game board

The game will start when the method `SnakeGame.start() => void` is called. It will be possible to capture end game results through a callback provied to the method `SnakeGame.setOnEndGame((GameResult)=>void) => void`.

## Game board and game loop
The class `SnakeGame` will contain an instance of the class `GameEngine`. This class takes a `Board` object, a `InputHandler`(dependency injection) and an optional `EngineConfig` object as constructor parameters. The `Board` serves as the initial state of the game.

The `GameEngine` will take care of the game loop. Every game cycle, it will read the input state from a `InputHandler` and update the board accordingly. The new board state will be made available as a parameter to the callback `GameEngine.setOnUpdate((Board)=>void) => void`.

The game loop will begin when the function `GameEngine.start() => void` is called.

## Input
The class `InputHandler` is an abstract class that will listen to the events fired by a canvas of which the **id** was passed to the constructor.

Every time an event listener is fired, this class will process the event and update a private object `InputState` accordingly. An immutable copy of this object can be retrieved through the function `InputHandler.getState() => InputState`.

The implementations for this abstract class will be: `KeyboardInputHandler` and `TouchInputHandler` (planned).

## Rendering
The class `Renderer` will be an abstract class that will take the canvas' **id** in its (abstract) contructor and will be responsible of drawing the game on the canvas. The rendering will happen when the function `Renderer.render(Board) => void` is called.

The implementations for this abstract class will be: `CanvasRenderer` and `WebGLRenderer` (planned).


# Detailed Design
Types categorization:
- **"Functional" Classes**
    - Object classes that have active roles in the system.
- **Configuration Interfaces**
    - Data structures that group configuration parameters for some **functional class**.
- **Data Classes/Interfaces**
    - Data classes/structures that hold some type of complex data (such as the board state or the input state).

## Functional Classes:
```ts
class SnakeGame {
    constructor(id: string, config?: GameConfig) {
        /** create instances of the following classes: 
         * - InpuHandler (the specific class depends on the configuration)
         * - GameEngine
         * - Renderer (the specific class depends on the configuration)
         * 
         * Set the callback for GameEngine.setOnUpdate(). This callback will call the method Renderer.render(). If the game is finished, it'll call the function provided to Snakegame.setOnEndGame()
         */
    }

    start() {
        // calls GameEngine.start()
    }

    setOnEndGame((result: GameResult)=> void) {
        // stores the reference to the callback function in a private member variable
    }
}
```

```ts
class GameEngine {
    constructor(initialState: Board, inputHandler: InputHandler, config: EngineConfig) {
        // initialize internal variables
    }

    private gameLoop(timestamp: number) {
        /** this method will be passed as a callback to resquestAnimationFrame.
         * it will read the input state from the InputHandler, compute the next state in the game
         * and then call the function provided in setOnUpdate()
         */
    }

    start() {
        // set appropriate flags and makes the first call to requestAnimationFrame
    }

    stop() {
        // stop callback loop
    }

    setOnUpdate((state: Board)=> void) {
        // stores the reference to the callback function in a private member variable
    }
}
```

```ts
abstract class InputHandler {
    constructor(id:string) {
        // setup corresponding listeners to the canvas element which has the id
    }

    getState(): InputState {
        // returns a copy of the InputState
    }
}
```

```ts
abstract class Renderer {
    constructor(id:string) {
        // setup corresponding context from the canvas element which has the id
    }

    render(board: Board) {
        // execute all the rendering procedures
    }
}
```

## Configuration Interfaces
```ts
interface GameConfig {
    inputType: 'keyboard' | 'touch'; //default: 'keyboard'
    renderMode: 'canvas' | 'webgl'; //default: 'canvas'
    engineConfig?: EngineConfig;
}
```

```ts
interface EngineConfig {
    ticksPerSecond: number; // snake's initial speed. At each tick the snake will move one tile
    speedUp: number; // speedup factor
    speedUpInterval: number; // number of apples between each speedup
    maxTPS: number; // max ticks per second 
}
```

## Data Classes/Interfaces
```ts
class Board {
    get width(): number;
    get height(): number;
    getBoard(): BoardElements[][];
    getEmptyTiles(): Coord[];
    getSnake(): Coord[];
}
```

```ts
interface InputState {
    direction: Direction 
}
```