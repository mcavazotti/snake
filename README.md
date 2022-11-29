# Snake

## Architecture description

### Overview
The game itself will be contained inside an object of the class `SnakeGame`. It will take the HTML canvas **id** and an optional `GameConfig` object as constructor parameters. The class `SnakeGame` will be responsible of:

- setting up the canvas' event listeners
- rendering the game
- handling user input and other game events (game loop)
- taking care of the game board

The game will start when the method `SnakeGame.start() => void` is called. It will be possible to capture end game results through a callback provied to the method `SnakeGame.setOnEndGame((GameResult)=>void) => void`.

### Game board and game loop
The class `SnakeGame` will contain an instance of the class `GameEngine`. This class takes a `Board` object, a `InputHandler`(dependency injection) and an optional `EngineConfig` object as constructor parameters. The `Board` serves as the initial state of the game.

The `GameEngine` will take care of the game loop. Every game cycle, it will read the input state from a `InputHandler` and update the board accordingly. The new board state will be made available as a parameter to the callback `GameEngine.setOnUpdate((Board)=>void) => void`.

The game loop will begin when the function `GameEngine.start() => void` is called.

### Input
The class `InputHandler` is an abstract class that will listen to the events fired by a canvas of which the **id** was passed to the constructor.

Every time an event listener is fired, this class will process the event and update a private object `InputState` accordingly. An immutable copy of this object can be retrieved through the function `InputHandler.getState() => InputState`.

The implementations for this abstract class will be: `KeyboardInputHandler` and `TouchInputHandler` (planned).

### Rendering
The class `Renderer` will be an abstract class that will take the canvas' **id** in its (abstract) contructor and will be responsible of drawing the game on the canvas. The rendering will happen when the function `Renderer.render(Board) => void` is called.

The implementations for this abstract class will be: `CanvasRenderer` and `WebGLRenderer` (planned).