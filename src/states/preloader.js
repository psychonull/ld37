class Preloader extends Phaser.State {

  constructor() {
    super();
    this.asset = null;
    this.ready = false;
  }

  preload() {
    //setup loading bar
    this.asset = this.add.sprite(this.game.width * 0.5 - 110, this.game.height * 0.5 - 10, 'preloader');
    this.load.setPreloadSprite(this.asset);

    //Setup loading and its events
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.loadResources();
  }

  update() {
      if (this.ready) {
        $$.dispatch({
          type: 'GAME_STATE_CHANGE',
          payload: 'menu'
        });
        this.game.state.start('menu');
      }
  }

  loadResources() {
      // load your resources here
      this.game.load.image('bg','assets/sprites/bg.png');
      this.game.load.image('light','assets/sprites/light.png');
      this.game.load.image('door','assets/sprites/puerta.png');
      this.game.load.image('doorx2','assets/sprites/puerta_x2.png');

      this.game.load.atlas('1_1x1', 'assets/spritesheets/1_1x1.png', 'assets/spritesheets/1_1x1.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
      this.game.load.atlas('2_1x1', 'assets/spritesheets/2_1x1.png', 'assets/spritesheets/2_1x1.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
      this.game.load.atlas('3_1x1', 'assets/spritesheets/3_1x1.png', 'assets/spritesheets/3_1x1.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
      this.game.load.atlas('4_1x1', 'assets/spritesheets/4_1x1.png', 'assets/spritesheets/4_1x1.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);

      this.game.load.atlas('5_2x2', 'assets/spritesheets/5_2x2.png', 'assets/spritesheets/5_2x2.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
      this.game.load.atlas('6_2x2', 'assets/spritesheets/6_2x2.png', 'assets/spritesheets/6_2x2.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
      this.game.load.atlas('7_2x2', 'assets/spritesheets/7_2x2.png', 'assets/spritesheets/7_2x2.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
      this.game.load.atlas('8_2x2', 'assets/spritesheets/8_2x2.png', 'assets/spritesheets/8_2x2.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);

      this.game.load.atlas('9_2x1', 'assets/spritesheets/9_2x1.png', 'assets/spritesheets/9_2x1.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
      this.game.load.atlas('10_2x1', 'assets/spritesheets/10_2x1.png', 'assets/spritesheets/10_2x1.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);

      this.game.load.atlas('11_1x2', 'assets/spritesheets/11_1x2.png', 'assets/spritesheets/11_1x2.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
      this.game.load.atlas('12_1x2', 'assets/spritesheets/12_1x2.png', 'assets/spritesheets/12_1x2.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
      this.game.load.atlas('13_1x2', 'assets/spritesheets/13_1x2.png', 'assets/spritesheets/13_1x2.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);

      this.game.load.image('cell_gray','assets/sprites/cell_gray.png');
      this.game.load.image('cell_red','assets/sprites/cell_red.png');
      this.game.load.image('cell_white','assets/sprites/cell_white.png');
      this.game.load.image('cell_target','assets/sprites/cell_target.png');

      this.game.load.audio('ending_5', ['assets/sound/ending_5.mp3', 'assets/sound/ending_5.ogg']);
      this.game.load.audio('accion_2', ['assets/sound/accion_2.mp3', 'assets/sound/accion_2.ogg']);
      this.game.load.audio('accion_9', ['assets/sound/accion_9.mp3', 'assets/sound/accion_9.ogg']);
      this.game.load.audio('suspenso_4', ['assets/sound/suspenso_4.mp3', 'assets/sound/suspenso_4.ogg']);
      this.game.load.audio('intermedio', ['assets/sound/intermedio.mp3', 'assets/sound/intermedio.ogg']);
  }

  onLoadComplete() {
    this.ready = true;
  }
}

export default Preloader;
