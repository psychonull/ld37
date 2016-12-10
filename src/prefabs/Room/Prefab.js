
const options = require('../../config/options.json'); 
import Alien from '../Alien';
//Documentation for Phaser's (2.6.2) group:: phaser.io/docs/2.6.2/Phaser.Group.html
class Room extends Phaser.Group {

  //initialization code in the constructor
  constructor(game, parent, level) {
    super(game, parent);
    this.shape = new Array(level.room[0]).fill(new Array(level.room[1]).fill(1));
    this.aliens = level.aliens.map( a =>
      new Alien(game, {
        x: options.tileSize * a.position[0], 
        y: options.tileSize * a.position[1],
        sprite: a.sprite,
        shape: a.shape
      })
    );
    this.aliens.forEach(a => this.add(a));
    
  }

}

export default Room;
