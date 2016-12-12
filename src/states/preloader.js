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


      this.game.load.image('target1x1','assets/sprites/target1x1.png');
      this.game.load.image('target1x2','assets/sprites/target1x2.png');
      this.game.load.image('target1x3','assets/sprites/target1x3.png');
      this.game.load.image('target2x1','assets/sprites/target2x1.png');
      this.game.load.image('target2x2','assets/sprites/target2x2.png');
      this.game.load.image('target3x1','assets/sprites/target3x1.png');

      this.game.load.atlas('1_1x1', 'assets/spritesheets/1_1x1_rebuild.png', 'assets/spritesheets/1_1x1.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
      this.game.load.atlas('2_1x1', 'assets/spritesheets/2_1x1_rebuild.png', 'assets/spritesheets/2_1x1.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
      this.game.load.atlas('3_1x1', 'assets/spritesheets/3_1x1_rebuild.png', 'assets/spritesheets/3_1x1.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
      this.game.load.atlas('4_1x1', 'assets/spritesheets/4_1x1_rebuild.png', 'assets/spritesheets/4_1x1.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);

      this.game.load.atlas('5_2x2', 'assets/spritesheets/5_2x2_rebuild.png', 'assets/spritesheets/5_2x2.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
      this.game.load.atlas('6_2x2', 'assets/spritesheets/6_2x2_rebuild.png', 'assets/spritesheets/6_2x2.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
      this.game.load.atlas('7_2x2', 'assets/spritesheets/7_2x2_rebuild.png', 'assets/spritesheets/7_2x2.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
      this.game.load.atlas('8_2x2', 'assets/spritesheets/8_2x2_rebuild.png', 'assets/spritesheets/8_2x2.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);

      this.game.load.atlas('9_2x1', 'assets/spritesheets/9_2x1_rebuild.png', 'assets/spritesheets/9_2x1.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
      this.game.load.atlas('10_2x1', 'assets/spritesheets/10_2x1_rebuild.png', 'assets/spritesheets/10_2x1.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);

      this.game.load.atlas('11_1x2', 'assets/spritesheets/11_1x2_rebuild.png', 'assets/spritesheets/11_1x2.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
      this.game.load.atlas('12_1x2', 'assets/spritesheets/12_1x2_rebuild.png', 'assets/spritesheets/12_1x2.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
      this.game.load.atlas('13_1x2', 'assets/spritesheets/13_1x2_rebuild.png', 'assets/spritesheets/13_1x2.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);

      this.game.load.image('cell_gray','assets/sprites/cell_gray.png');
  }

  onLoadComplete() {
    this.ready = true;
  }
}

export default Preloader;
