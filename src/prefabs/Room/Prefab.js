const options = require('../../config/options.json');
import Alien from '../Alien';
import Target from '../Target';
import {generate as newId} from 'shortid'
import {action} from './actions'
import {getCurrentLevel} from './selector'

class Room extends Phaser.Group {

  constructor(game, parent) {
    super(game, parent);

    const level = getCurrentLevel($$.getState())
    this.target = new Target(this.game)
    this.add(this.target)
    this.add(this.target.door)

    this.createAliens(level)
  }

  createAliens(level) {
    const _aliens = []
    const {config} = $$.getState()
    const {offsetX, offsetY} = config.options;

    this.aliens = level.aliens.map(({position, character}) => {
      const id = newId();
      const shape = config.characters[character].shape;

      _aliens.push({id, position, character, shape});

      const pos = {
        x: options.tileSize * position[0] + offsetX,
        y: options.tileSize * position[1] + offsetY
      };

      const isTarget = character === level.target.character
      const cells = this.createAlienCells(pos, shape, isTarget);
      const alien = new Alien(this.game, {
        id,
        x: pos.x,
        y: pos.y,
        character
      });

      return {
        alien,
        cells
      };
    });

    $$.dispatch(action.receiveAliens(_aliens));
    this.aliens.forEach(({alien, cells}) => {
      this.add(cells);
      this.add(alien);
      alien.setCells(cells);
    });
  }


  createAlienCells(position, shape, isTarget) {
    const alienCells = this.game.add.group(); // using a group to keep sort
    let cellType = 'cell_red'

    if (isTarget){
      cellType = 'cell_target'
    }

    const sprite = alienCells.add(this.game.add.sprite(position.x, position.y, cellType))
    sprite.scale.x = shape[0].length;
    sprite.scale.y = shape.length;

    return alienCells;
  }

/* Cells group marking every square of the color (instead of one scaled > above)
  createAlienCells(position, shape, isTarget) {
    const alienCells = this.game.add.group();

    shape.forEach((row, i) => {
      row.forEach((cell, j) => {
        const p = {
          x: position.x + (options.tileSize*j),
          y: position.y + (options.tileSize*i)
        };

        if (isTarget){
          alienCells.add(this.game.add.sprite(p.x, p.y, 'cell_target'))
        }
        else {
          alienCells.add(this.game.add.sprite(p.x, p.y, 'cell_red'))
        }
      })
    })

    return alienCells;
  }
*/
  update() {
    this.sort('y', Phaser.Group.SORT_ASCENDING);
  }

}

export default Room;
