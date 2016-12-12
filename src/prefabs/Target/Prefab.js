const _options = require('../../config/options.json');
import {getCurrentLevel, getAlien} from '../Room/selector'
import {action} from './actions';

class Target extends Phaser.Sprite {

  constructor(game, options) {
    const state = $$.getState()
    const level = getCurrentLevel(state)
    const {target} = level
    const targetChar = target.character;

    const expecChar = state.config.characters[targetChar]
    if(!expecChar){
      throw new Error(`Target: cannot find character ${targetChar} in characters.json`);
    }

    const {offsetX, offsetY} = state.config.options;

    const pos = {
      x: _options.tileSize * target.position[0] + offsetX,
      y: _options.tileSize * target.position[1] + offsetY
    };

    const shape = expecChar.shape;
    super(game, pos.x, pos.y, `target${shape[0].length}x${shape.length}`, (options || {}).frame);

    this.targetPosition = target.position;
    this.targetCharacter = target.character;

    $$.observer.once(getState => {
      const {lastAlienMoved, win} = getState().target;
      return !win && lastAlienMoved && this.isExpectedAlien(lastAlienMoved);
    }, () => {
      $$.dispatch(action.setWin());
    });
  }

  isExpectedAlien(move) {
    return move.position[0] === this.targetPosition[0] &&
      move.position[1] === this.targetPosition[1] &&
      getAlien($$.getState(), move.id).character === this.targetCharacter;
  }

  update() {

  }

}

export default Target;
