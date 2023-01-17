export interface EngineConfig {
    ticksPerSecond: number; // snake's initial speed. At each tick the snake will move one tile
    speedUp: number; // speedup factor
    speedUpInterval: number; // number of apples between each speedup
    maxTPS: number; // max ticks per second 
}