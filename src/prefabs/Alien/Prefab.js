
//Documentation for Phaser's (2.6.2) sprites:: phaser.io/docs/2.6.2/Phaser.Sprite.html
class Alien extends Phaser.Sprite {

  //initialization code in the constructor
  constructor(game, options) {
    super(game, options.x, options.y, options.sprite || 'placeholder', options.frame);
    this.options = options;
  }

  //Code ran on each frame of game
  update() {

  }

}

export default Alien;
