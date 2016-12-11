import {getGrid} from '../../config'

class Cell extends Phaser.Sprite {
  constructor(game, options) {
    super(game, options.x, options.y, 'cell_gray', options.frame);
    // this.scale.setTo(0.5, 0.5);
  }
}

class Grid extends Phaser.Group {
  constructor(game, parent) {
    super(game, parent);

    const state = $$.getState()
    this._grid = getGrid(state)

    const tileSize = state.config.options.tileSize
    this._grid.forEach((row, i) => {
      row.forEach((cell, j) => {
        const c = new Cell(game, {
          x: tileSize * i,
          y: tileSize * j
        })

        this.add(c)
      })
    })
    this.position.setTo(state.config.options.offsetX, state.config.options.offsetY);
  }
}

export default Grid;
