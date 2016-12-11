import * as config from '../config';
import Room from '../prefabs/Room';
import {action as roomActions} from '../prefabs/Room/actions';
import {restart, changeLevel, win} from '../gameActions';

class Game extends Phaser.State {

  constructor() {
    super();
  }

  create() {
    const state = $$.getState()
    const currentLevel = config.select.level(state, state.room.level);

    this.room = new Room(this.game);
    this.game.add.existing(this.room);
  }

  update() {

  }

  endGame() {
    this.game.state.start('gameover');
  }

}

export default Game;
