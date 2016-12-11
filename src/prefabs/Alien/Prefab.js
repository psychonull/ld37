import {action as roomActions} from '../Room/actions'
import {getAlien} from '../Room/selector'
const {tileSize} = require('../../config/options.json');
import {getGrid} from '../../config'

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
    this.scale.setTo(0.5, 0.5);

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

  _sumPosition(a, b){
    return [a[0] + b[0], a[1] + b[1]];
  }

  move(room, controls) {
    this.game.controls.disable();

    if (this.canMove(this.id, controls.move, room.aliens)) {
      const alien = getAlien($$.getState(), this.id)

      const position = this._sumPosition(alien.position, [controls.move.x, controls.move.y]);

      const x = tileSize * position[0];
      const y = tileSize * position[1];

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
    const map = getGrid($$.getState())

    const aliensAfterMove = this._getAliensMoved(aliens, alienId, [x, y]);
    for(let i = 0; i < aliensAfterMove.length; i++){
      let alien = aliensAfterMove[i];

      for(let yi = 0; yi < alien.shape.length; yi++){
        let row = map[yi + alien.position[1]];
        if(typeof row === 'undefined'){
          return false;
        }
        for(let xi = 0; xi < alien.shape[yi].length; xi++){
          let cell = row[xi + alien.position[0]];
          if(typeof cell === 'undefined'){
            return false;
          }
          else {
            map[yi + alien.position[1] ][xi + alien.position[0]] = cell + 1;
          }
        }
      }
    }
    return !map.some(mapRow => mapRow.some(e => e > 1));
  }

  update() {
    // TODO: mark me as selected when
    // $$.getState().room.alienSelected === this.id
  }
  _cloneMap(m){
    return m.map(mapRow => Array.from(mapRow));
  }

  _getAliensMoved(aliens, id, dir){
    return aliens.map(alien => {
      if(alien.id === id){
        return Object.assign({}, alien, {position: this._sumPosition(alien.position, dir)});
      }
      else return alien;
    });
  }

}

export default Alien;
