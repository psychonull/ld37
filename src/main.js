import Boot from './states/boot';
import Game from './states/game';
import Menu from './states/menu';
import Preloader from './states/preloader';
import Gameover from './states/gameover';

import ReactDOM from 'react-dom';
import React from 'react';
import Hud from './components/Hud.jsx';
//HACK: $$ and state is not yet available
const {gameWidth, gameHeight} = require('./config/options.json');
const game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, 'ld37-game');

game.state.add('boot', new Boot());
game.state.add('game', new Game());
game.state.add('menu', new Menu());
game.state.add('preloader', new Preloader());
game.state.add('gameover', new Gameover());

game.state.start('boot');

ReactDOM.render(
  <Hud name="ld37" />,
  document.getElementById('hud')
);