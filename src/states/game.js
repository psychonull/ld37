import Controls from '../prefabs/Controls'
import * as config from '../config';
import Room from '../prefabs/Room';
import {restart, changeLevel} from '../gameActions'

class Game extends Phaser.State {

  constructor() {
    super();
  }

  create() {
    const state = $$.getState()
    const currentLevel = config.select.level(state, state.room.level);

    var text = this.add.text(this.game.width * 0.5, this.game.height * 0.5, currentLevel.name, {
      font: '42px Arial', fill: '#ffffff', align: 'center'
    });
    text.anchor.set(0.5);

    this.room = new Room(this.game);
    this.game.add.existing(this.room);

    this.game.controls = new Controls(this.game)
    this.game.controls.enable()

    $$.observer.once(getState => getState().target.win, () => {
      console.log('WIN!');

      // TODO: on loose > fire below action
      // $$.dispatch(restart());

      $$.dispatch(changeLevel($$.getState().room.level + 1))
      this.game.state.start('game');
    });
  }

  update() {

  }

  endGame() {
    this.game.state.start('gameover');
  }

}

export default Game;
