const options = require('../../config/options.json');
import Alien from '../Alien';
import {generate as newId} from 'shortid'
import {action} from './actions'

class Room extends Phaser.Group {

  constructor(game, parent, level) {
    super(game, parent);

    this.shape = new Array(level.room[0]).fill(new Array(level.room[1]).fill(1));
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
