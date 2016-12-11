const {tileSize, gameWidth, gameHeight} = require('../../config/options.json');

class Cell extends Phaser.Sprite {
  constructor(game, options) {
    super(game, options.x, options.y, 'cell_gray', options.frame);
  }
}

class Grid extends Phaser.Group {
  constructor(game, parent) {
    super(game, parent);

    const rows = Math.floor(gameHeight/tileSize);
    const cols = Math.floor(gameWidth/tileSize);
    this._grid = new Array(cols).fill(1).map(() => new Array(rows).fill(0));

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
