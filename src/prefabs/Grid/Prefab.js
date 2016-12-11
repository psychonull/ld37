const options = require('../../config/options.json');
import {getCurrentLevel} from '../Room/selector'

class Cell extends Phaser.Sprite {
  constructor(game, options) {
    super(game, options.x, options.y, 'cell_gray', options.frame);
  }
}

class Grid extends Phaser.Group {
  constructor(game, parent) {
    super(game, parent);

    const level = getCurrentLevel($$.getState())
    this._grid = new Array(level.room[1]).fill(1).map(() => new Array(level.room[0]).fill(0));

    this._grid.forEach((row, i) => {
      row.forEach((cell, j) => {
        const c = new Cell(game, {
          x: options.tileSize * i,
          y: options.tileSize * j
        })

        this.add(c)
      })
    })
  }
}

export default Grid;
