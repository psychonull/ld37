import { createStore, compose } from 'redux';
import createStoreObserver from 'redux-store-observer';
import reducer from '../reducers';
import resetStore from '../middlewares/resetStore';
import {getDefaultState} from '../baseState'

class Boot extends Phaser.State {

  constructor() {
    super();
  }

  preload() {
    const enhancedStore = compose(
      resetStore,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )(createStore)

    window.$$ = enhancedStore(reducer, getDefaultState(true))
    window.$$.observer = createStoreObserver(window.$$);

    this.load.image('preloader', 'assets/preloader.gif');
  }

  create() {
    this.game.input.maxPointers = 1;

    //setup device scaling
    if (this.game.device.desktop) {
      this.game.scale.pageAlignHorizontally = true;
    } else {
      this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.game.scale.minWidth =  480;
      this.game.scale.minHeight = 260;
      this.game.scale.maxWidth = 640;
      this.game.scale.maxHeight = 480;
      this.game.scale.forceOrientation(true);
      this.game.scale.pageAlignHorizontally = true;
      this.game.scale.setScreenSize(true);
    }

    this.initGlobalVariables();

    this.game.state.start('preloader');
  }

  initGlobalVariables(){
    this.game.global = {

    };
  }

}

export default Boot;
