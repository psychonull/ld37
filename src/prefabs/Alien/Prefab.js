
//Documentation for Phaser's (2.6.2) sprites:: phaser.io/docs/2.6.2/Phaser.Sprite.html
class Alien extends Phaser.Sprite {

  //initialization code in the constructor
  constructor(game, options) {
    let character = $$.getState().config.characters[options.character];
    if(!character){
      throw new Error(`cannot find character ${options.character} in characters.json`);
    }
    super(game, options.x, options.y, character.sprite || 'placeholder', options.frame);
    this.options = options;
    this.character = character;
  }

  //Code ran on each frame of game
  update() {

  }

}

export default Alien;
