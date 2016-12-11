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

  move(room, controls) {
    this.game.controls.disable();

    if (this.canMove(this.id, controls.move, room.aliens)) {
      const alien = getAlien($$.getState(), this.id)

      const x = alien.position[0] + controls.move.x;
      const y = alien.position[1] + controls.move.y;

      $$.dispatch(roomActions.alienMoveTo({
        id: this.id,
        position: [x, y]
      }));

      this.position.x = options.tileSize * x;
      this.position.y = options.tileSize * y;
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
