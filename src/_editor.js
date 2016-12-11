import Boot from './states/boot';
import Editor from './states/editor';

//HACK: $$ and state is not yet available
const {gameWidth, gameHeight} = require('./config/options.json');
const game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, 'ld37-game');

game.state.add('boot', new Boot());
game.state.add('editor', new Editor());

game.state.start('boot');
