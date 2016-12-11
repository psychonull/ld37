import Boot from './states/boot';
import Game from './states/game';
import Menu from './states/menu';
import Preloader from './states/preloader';
import Gameover from './states/gameover';
import Win from './states/win';

//HACK: $$ and state is not yet available
const {gameWidth, gameHeight} = require('./config/options.json');
const game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, 'ld37-game');

game.state.add('boot', new Boot());
game.state.add('game', new Game());
game.state.add('menu', new Menu());
game.state.add('preloader', new Preloader());
game.state.add('gameover', new Gameover());
game.state.add('win', new Win());

game.state.start('boot');