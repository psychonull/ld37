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

      return new Alien(this.game, {
        id,
        x: options.tileSize * position[0] + offsetX,
        y: options.tileSize * position[1] + offsetY,
        character
      });
    });

    $$.dispatch(action.receiveAliens(_aliens));
    this.aliens.forEach(alien => this.add(alien));
  }

}

export default Room;
