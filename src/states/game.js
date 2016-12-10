import * as counter from '../counter'
import Controls from '../controls'

class Game extends Phaser.State {

  constructor() {
    super();
  }

  create() {
    const text = this.add.text(this.game.width * 0.5, this.game.height * 0.5, 'Game', {
      font: '42px Arial', fill: '#ffffff', align: 'center'
    });
    text.anchor.set(0.5);

    this.text = this.add.text(50, 50, counter.select.current(), {
      font: '42px Arial', fill: '#ffffff', align: 'center'
    });
    this.text.anchor.set(0.5);

    // this.input.onDown.add(() => $$.dispatch(counter.action.incrementBy(5)))

    this.controls = new Controls(this.game)
    this.controls.enable()
  }

  update() {
    this.text.text = counter.select.current()
  }

  endGame() {
    this.game.state.start('gameover');
  }

}

export default Game;
