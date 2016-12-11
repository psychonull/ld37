import {action as roomActions} from '../Room/actions'
import {getAlien} from '../Room'
const options = require('../../config/options.json');

class Alien extends Phaser.Sprite {

  constructor(game, options) {
    let character = $$.getState().config.characters[options.character];
    if(!character){
      throw new Error(`cannot find character ${options.character} in characters.json`);
    }

    super(game, options.x, options.y, character.sprite || 'placeholder', options.frame);
    this.id = options.id;

    this.options = options;
    this.character = character;

    this.inputEnabled = true;
    this.events.onInputDown.add(this.onInputDown, this);
  }

  onInputDown() {
    $$.dispatch(roomActions.alienSelected(this.id));
    this.events.onInputUp.add(this.onInputUp, this);
  }

  onInputUp() {
    const {room, controls} = $$.getState();
    if (controls.move && room.alienSelected === this.id){
      this.events.onInputUp.remove(this.onInputUp, this);
      this.move(room, controls);
    }
  }

  animateMove(toPos, done) {
    const tween = this.game.add.tween(this);
    tween.onComplete.add(done);
    tween.to(toPos, 500, Phaser.Easing.Bounce.Out, true);

    // TODO: Use the following when sprites are done
    // tween.to(toPos, 500, Phaser.Linear, true);
  }

  move(room, controls) {
    this.game.controls.disable();

    if (this.canMove(this.id, controls.move, room.aliens)) {
      const alien = getAlien($$.getState(), this.id)

      const position = [
        alien.position[0] + controls.move.x,
        alien.position[1] + controls.move.y
      ];

      const x = options.tileSize * position[0];
      const y = options.tileSize * position[1];

      this.animateMove({x, y}, () => {
        $$.dispatch(roomActions.alienMoveTo({id: this.id, position}));
      })
    }

    $$.dispatch(roomActions.alienReleased(this.id));
    this.game.controls.enable(true);
  }

  // x and y posible values = 1, 0 or -1
  // x === -1 is Left
  // y === -1 is Up
  canMove(alienId, {x, y}, aliens) {
    // TODO: Implement Mati great algorithm
    return true;
  }

  update() {
    // TODO: mark me as selected when
    // $$.getState().room.alienSelected === this.id
  }

}

export default Alien;
