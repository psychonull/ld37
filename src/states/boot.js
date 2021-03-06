import { createStore, compose } from 'redux';
import createStoreObserver from 'redux-store-observer';
import reducer from '../reducers';
import resetStore from '../middlewares/resetStore';
import {getDefaultState} from '../baseState'

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import React from 'react';
import Hud from '../containers/HudContainer.jsx';
import Overlay from '../containers/OverlayContainer.jsx';

class Boot extends Phaser.State {

  constructor() {
    super();
  }

  preload() {
    let enhancedStore;

    if (window.__REDUX_DEVTOOLS_EXTENSION__) {
      enhancedStore = compose(resetStore, window.__REDUX_DEVTOOLS_EXTENSION__())(createStore)
    }
    else {
      enhancedStore = compose(resetStore)(createStore)
    }

    window.$$ = enhancedStore(reducer, getDefaultState(true))
    window.$$.observer = createStoreObserver(window.$$);

    this.load.image('preloader', 'assets/preloader.gif');
    this.initReact();
  }

  create() {
    this.game.input.maxPointers = 1;

    //setup device scaling
    if (this.game.device.desktop) {
      //this.game.scale.pageAlignHorizontally = true;
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

  initReact(){
    ReactDOM.render(
      <Provider store={$$}>
        <Hud />
      </Provider>,
      document.getElementById('hud')
    );
    ReactDOM.render(
      <Provider store={$$}>
        <Overlay />
      </Provider>,
      document.getElementById('overlay')
    );
  }

}

export default Boot;
