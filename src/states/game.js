import * as counter from '../counter';
import * as config from '../config';

import Room from '../prefabs/Room';

class Game extends Phaser.State {

  constructor() {
    super();
  }

  create() {
    //TODO: Use currentlevel from game state
    let currentLevel = config.select.level($$.getState(), 0);

    var text = this.add.text(this.game.width * 0.5, this.game.height * 0.5, currentLevel.name, {
      font: '42px Arial', fill: '#ffffff', align: 'center'
    });
    text.anchor.set(0.5);

    this.text = this.add.text(50, 50, counter.select.current($$.getState()), {
      font: '42px Arial', fill: '#ffffff', align: 'center'
    });
    this.text.anchor.set(0.5);

    this.input.onDown.add(() => $$.dispatch(counter.action.incrementBy(5)))
    this.room = new Room(this.game, undefined, currentLevel);
    this.game.add.existing(this.room);  
  }

  update() {
    this.text.text = counter.select.current($$.getState())
  }

  endGame() {
    this.game.state.start('gameover');
  }

}

export default Game;
