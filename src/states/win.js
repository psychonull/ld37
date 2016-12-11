class Menu extends Phaser.State {

  constructor() {
    super();
  }
  
  create() {
    var text = this.add.text(this.game.width * 0.5, this.game.height * 0.5, 'WIN! THANKS FOR PLAYING, DANCING', {
      font: '42px Arial', fill: '#ffffff', align: 'center'
    });
    text.anchor.set(0.5);
  }

  update() {}

}

export default Menu;
