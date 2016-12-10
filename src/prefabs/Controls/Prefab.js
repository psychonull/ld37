import {action} from './actions'

export default class Controls {

  minMagnitud = 20;
  minTime = 1000;
  minRelativeMove = 0.8;

  constructor(game){
    this.game = game;
  }

  getState() {
    return $$.getState().controls
  }

  enable() {
    this.game.input.onDown.add(this.beginSwipe, this);
    $$.dispatch(action.enable())
  }

  disable() {
    this.game.input.onDown.remove(this.beginSwipe, this);
    $$.dispatch(action.disable())
  }

  reset() {
    $$.dispatch(action.reset())
  }

  beginSwipe() {
    if (!this.getState().enabled) return;
    this.game.input.onDown.remove(this.beginSwipe, this);
    this.game.input.onUp.add(this.endSwipe, this);
  }

  endSwipe(e) {
    this.game.input.onUp.remove(this.endSwipe, this);
    if (!this.getState().enabled) return;

    const swipeMove = this.getSwipeMove(e)
    if (swipeMove) {
      const m = this.minRelativeMove
      const x = (swipeMove.x > m ? 1 : (swipeMove.x < -m ? -1 : 0))
      const y = (swipeMove.y > m ? 1 : (swipeMove.y < -m ? -1 : 0))

      $$.dispatch(action.move({x, y}))
      this.game.input.onDown.add(this.beginSwipe, this);
    }
    else {
       this.game.input.onDown.add(this.beginSwipe, this);
    }
  }

  getSwipeMove(e) {
    if (e.timeUp - e.timeDown > this.minTime) return null

    const swipeDistance = Phaser.Point.subtract(e.position, e.positionDown);
    if (swipeDistance.getMagnitude() < this.minMagnitud) return null

    const swipeNormal = Phaser.Point.normalize(swipeDistance);
    if (Math.abs(swipeNormal.x) > this.minRelativeMove || Math.abs(swipeNormal.y) > this.minRelativeMove) {
      return swipeNormal
    }

    return null
  }

}
