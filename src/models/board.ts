import { BoardElements } from "./board-elements";
import { Coord } from "./coord";

export class Board {
    private _width: number;
    get width() { return this._width };

    private _height: number;
    get height() { return this._height };

    constructor(private layout: BoardElements[][], private snake: Coord[]) {
        this._height = layout.length;
        this._width = layout[0].length;
        layout.forEach(r => {
            if (r.length != this.width) throw Error('Inconsistent width!');
        });
    }

    getBoard(): BoardElements[][] {
        return this.layout;
    }

    getEmptyTiles(): Coord[] {
        let emptyTiles: Coord[] = [];
        for (let y = 0; y < this.layout.length; y++) {
            for (let x = 0; x < this.layout[y].length; x++) {
                if (this.layout[y][x] == BoardElements.empty) {
                    emptyTiles.push({ x: x, y: y });
                }
            }
        }
        return emptyTiles;
    }

    getSnake(): Coord[] {
        return this.snake;
    }
}