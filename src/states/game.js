import Controls from '../prefabs/Controls'
import * as config from '../config';
import Room from '../prefabs/Room';
import Grid from '../prefabs/Grid';
import {action as roomActions} from '../prefabs/Room/actions';
import {changeLevel, win} from '../gameActions';
import Lights from '../prefabs/Lights';

class Game extends Phaser.State {

  constructor() {
    super();
  }

  create() {
    const state = $$.getState()
    const currentLevel = config.select.level(state, state.room.level);

    this.game.sound.volume = state.config.options.volume;
    this.game.add.sprite(0, 0, 'bg');

    this.grid = new Grid(this.game);
    this.game.add.existing(this.grid);

    this.room = new Room(this.game);
    this.game.add.existing(this.room);

    if(currentLevel.lights){
      this.lights = new Lights(this.game, null, currentLevel.lights);
      this.game.add.existing(this.lights);
    }

    if(currentLevel.music){
      this.music = this.game.add.audio(currentLevel.music);
      this.music.loop = true;
      this.music.play();
    }

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

    $$.subscribe(() => this.game.sound.mute = !$$.getState().gameStats.sound);

    this.restartKey = this.game.input.keyboard.addKey(Phaser.Keyboard.R);
    this.restartKey.onDown.add(() => $$.dispatch(roomActions.restartLevel()));

  }

  update() {
  
  }

  endGame() {
    this.game.state.start('gameover');
  }

  shutdown(){
    if(this.music){
      this.music.stop();
    }
  }

}

export default Game;
