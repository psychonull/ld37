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

    this.animationSpeed = 8;
    this._setupAnimations();
    this.moving = false;
    this.animations.play('none', 1, true);
    this.playIdleAtRandom();

    if (character.anchor){
      this.anchor.setTo(character.anchor[0], character.anchor[1]);
    }
    else {
      this.anchor.setTo(0, 0);
    }
  }

  setCells(cells) {
    this.cells = cells;
  }

  _setupAnimations(){
    let [spriteIndex, spriteDimensions] = this.character.sprite.split('_');
    this.animations.add('none', [`${spriteIndex}_iddle_1_${spriteDimensions}_sprite`]);
    this.animations.add('idle', [
      `${spriteIndex}_iddle_1_${spriteDimensions}_sprite`,
      `${spriteIndex}_iddle_2_${spriteDimensions}_sprite`,
      `${spriteIndex}_iddle_3_${spriteDimensions}_sprite`,
      `${spriteIndex}_iddle_2_${spriteDimensions}_sprite`
    ]);
    this.animations.add('leftright', [
      `${spriteIndex}_iddle_1_${spriteDimensions}_sprite`,
      `${spriteIndex}_leftright_2_${spriteDimensions}_sprite`,
      `${spriteIndex}_leftright_3_${spriteDimensions}_sprite`
    ]);
    this.animations.add('updown', [
      `${spriteIndex}_iddle_1_${spriteDimensions}_sprite`,
      `${spriteIndex}_updown_2_${spriteDimensions}_sprite`,
      `${spriteIndex}_updown_3_${spriteDimensions}_sprite`
    ]);
  }

  playIdleAtRandom(){
    if(!this.moving){
      this.animations.play('idle', this.animationSpeed);
    }
    this.game.time.events.add(this.game.rnd.integerInRange(0, 100), () => {
      this.playIdleAtRandom();
    });
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
    //tween.to(toPos, 500, Phaser.Easing.Bounce.Out, true);

    // TODO: Use the following when sprites are done
    tween.to(toPos, 500, Phaser.Linear, true);
  }

  _sumPosition(a, b){
    return [a[0] + b[0], a[1] + b[1]];
  }

  move(room, controls) {
    this.game.controls.disable();

    if (!this.moving && this.canMove(this.id, controls.move, room.aliens)) {
      const alien = getAlien($$.getState(), this.id)

      const position = this._sumPosition(alien.position, [controls.move.x, controls.move.y]);

      const {offsetX, offsetY} = $$.getState().config.options;
      const x = tileSize * position[0] + offsetX;
      const y = tileSize * position[1] + offsetY;

      const cx = tileSize * controls.move.x;
      const cy = tileSize * controls.move.y;
      this.cells.visible = false;

      this.playMovingAnimation(controls.move);
      this.animateMove({x, y}, () => {
        $$.dispatch(roomActions.alienMoveTo({id: this.id, position}));
        this.animations.play('none', 1, true);
        this.moving = false;

        this.cells.position.x += cx;
        this.cells.position.y += cy;
        this.cells.visible = true;
      })
    }

    $$.dispatch(roomActions.alienReleased(this.id));
    this.game.controls.enable(true);
  }

  playMovingAnimation(move){
    this.moving = true;
    if(move.x === 1){
      this.animations.play('leftright', this.animationSpeed, true);
      this.scale.x = Math.abs(this.scale.x);
    }
    else if(move.x === -1){
      this.animations.play('leftright', this.animationSpeed, true);
      //this.scale.x = Math.abs(this.scale.x) * -1; //flip x, needs x anchor in 0.5
    }
    else if(move.y === 1){
      this.animations.play('updown', this.animationSpeed, true);
    }
    else if(move.y === -1){
      this.animations.play('updown', this.animationSpeed, true);
    }
  }

  // x and y posible values = 1, 0 or -1
  // x === -1 is Left
  // y === -1 is Up
  canMove(alienId, {x, y}, aliens) {
    const transpose = m => m[0].map((x,i) => m.map(x => x[i]));
    const map = transpose(getGrid($$.getState())); //hackahackia

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
