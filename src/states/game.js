import Controls from '../prefabs/Controls'
import * as config from '../config';
import Room from '../prefabs/Room';
import Grid from '../prefabs/Grid';
import {action as roomActions} from '../prefabs/Room/actions';
import {restart, changeLevel, win} from '../gameActions';
import Lights from '../prefabs/Lights';

class Game extends Phaser.State {

  constructor() {
    super();
  }

  create() {
    const state = $$.getState()
    const currentLevel = config.select.level(state, state.room.level);

    this.game.add.sprite(0, 0, 'bg');

    this.room = new Room(this.game);
    this.game.add.existing(this.room);

    this.grid = new Grid(this.game);
    this.game.add.existing(this.grid);

    this.lights = new Lights(this.game, null, {type: 'moving'});
    this.game.add.existing(this.lights);

    this.game.controls = new Controls(this.game)
    this.game.controls.enable()

    $$.observer.once(getState => getState().target.win, () => {
      console.log('WIN!');

      // TODO: on loose > fire below action
      // $$.dispatch(restart());
      let state = $$.getState();
      if (!config.select.level(state, state.room.level + 1)){
        $$.dispatch(win());
      }
      else {
        $$.dispatch(changeLevel(state.room.level + 1))
      }
      this.game.state.start('game');
    });

    $$.observer.once(getState => getState().room.restart, () => {
      console.log('RESTART LEVEL ___---__');

      $$.dispatch(changeLevel($$.getState().room.level))
      this.game.state.start('game');
    });

    $$.observer.once(getState => getState().gameStats.win, () => {
      console.log('WIN GAME ! ! ! :D');

      this.game.state.start('win');
    });

    this.restartKey = this.game.input.keyboard.addKey(Phaser.Keyboard.R);
    this.restartKey.onDown.add(() => $$.dispatch(roomActions.restartLevel()));

  }

  update() {

  }

  endGame() {
    this.game.state.start('gameover');
  }

}

export default Game;
