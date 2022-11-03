# Snake

## Architecture description

The game itself will be contained inside an object of the class `SnakeGame`. It will take the HTML canvas **id** and an optional `GameConfig` object as constructor parameters. The class `SnakeGame` will be responsible of:

- setting up the canvas' event listeners
- rendering the game
- handling user input and other game events (game loop)
- taking care of the game board

The game will start when the method `SnakeGame.start() => void` is called. It will be possible to capture end game results through a callback provied to the method `SnakeGame.onEndGame((GameResult)=>void) => void`.