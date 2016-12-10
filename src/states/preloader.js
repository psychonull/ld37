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
        this.game.state.start('menu');
      }
  }

  loadResources() {
      // load your resources here
      this.game.load.image('placeholder1x3','assets/sprites/placeholder1x3.png');
      this.game.load.image('placeholder2x2','assets/sprites/placeholder2x2.png');
      this.game.load.image('placeholder3x1','assets/sprites/placeholder3x1.png');
  }

  onLoadComplete() {
    this.ready = true;
  }
}

export default Preloader;
