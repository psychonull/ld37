import {getGrid} from '../../config'

class Cell extends Phaser.Sprite {
  constructor(game, options) {
    super(game, options.x, options.y, 'cell_gray', options.frame);
  }
}

class Grid extends Phaser.Group {
  constructor(game, parent) {
    super(game, parent);

    this._grid = getGrid($$.getState())

    this._grid.forEach((row, i) => {
      row.forEach((cell, j) => {
        const c = new Cell(game, {
          x: tileSize * i,
          y: tileSize * j
        })

        this.add(c)
      })
    })
  }
}

export default Grid;
