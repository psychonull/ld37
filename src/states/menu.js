import {start as gameStart} from '../gameActions';

class Menu extends Phaser.State {

  constructor() {
    super();
  }
  
  create() {

    $$.observer.once(getState => getState().gameState, () => {
      console.log('enter game');

      this.game.state.start('game');
    });

  }

  update() {}

}

export default Menu;
