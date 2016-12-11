const options = require('../../config/options.json');
import Alien from '../Alien';
import Target from '../Target';
import {generate as newId} from 'shortid'
import {action} from './actions'
import {getCurrentLevel} from './selector'

class Cell extends Phaser.Sprite {
  constructor(game, options) {
    super(game, options.x, options.y, 'cell_gray', options.frame);
  }
}

class Cells extends Phaser.Group {
  constructor(game, parent, {shape}) {
    super(game, parent, {shape});
    
    shape.forEach((row, i) => {
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

class Room extends Phaser.Group {

  constructor(game, parent) {
    super(game, parent);

    const level = getCurrentLevel($$.getState())
    this.shape = new Array(level.room[1]).fill(1).map(() => new Array(level.room[0]).fill(0));
    this.target = new Target(this.game)
    this.add(this.target)

    this.cells = new Cells(game, undefined, {shape: this.shape})
    this.createAliens(level)
  }

  createAliens(level) {
    const _aliens = []
    const {config} = $$.getState()

    this.aliens = level.aliens.map(({position, character}) => {
      const id = newId();
      const shape = config.characters[character].shape;

      _aliens.push({id, position, character, shape});

      return new Alien(this.game, {
        id,
        x: options.tileSize * position[0],
        y: options.tileSize * position[1],
        character
      });
    });

    $$.dispatch(action.receiveAliens(_aliens));
    this.aliens.forEach(alien => this.add(alien));
  }

}

export default Room;
