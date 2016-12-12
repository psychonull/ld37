import {getCurrentLevel, getAlien} from '../Room/selector'
import {action} from './actions';

class Target extends Phaser.Group {

  constructor(game, parent) {
    const state = $$.getState()
    const level = getCurrentLevel(state)
    const {target} = level
    const targetChar = target.character;

    const expecChar = state.config.characters[targetChar]
    if(!expecChar){
      throw new Error(`Target: cannot find character ${targetChar} in characters.json`);
    }

    super(game, parent);

    const {offsetX, offsetY, tileSize} = state.config.options;

    const pos = {
      x: tileSize * target.position[0] + offsetX,
      y: tileSize * target.position[1] + offsetY
    };

    const shape = expecChar.shape;
    shape.forEach((row, i) => {
      row.forEach((cell, j) => {
        const p = {
          x: pos.x + (tileSize*j),
          y: pos.y + (tileSize*i)
        };

        const targetCell = game.add.sprite(p.x, p.y, 'cell_target')
        this.add(targetCell)
      })
    })


    if (shape[0].length > 1) {
      game.add.sprite(pos.x-(tileSize/1.5), 0, 'doorx2');
    }
    else {
      game.add.sprite(pos.x-(tileSize/3), 0, 'door');
    }

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
