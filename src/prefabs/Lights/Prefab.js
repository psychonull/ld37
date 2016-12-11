class Light extends Phaser.Sprite {

  constructor(game, options) {
    super(game, 0, 0, 'light');
    this.options = options;
    this.options.speed = this.options.speed || 200;
    this.anchor.setTo(0.5, 0.5);
    this.blendMode = Phaser.blendModes.ADD;
    this.scale.setTo(this.game.rnd.realInRange(options.minScale || 1, options.maxScale || 1));
    this.position.setTo(100, 100);
    this.alpha = 0.5;
    this.tint = options.color;
    this.position = this._getRandomPos();
    this.movementMode();
  }

  update(){

  }

  _getRandomPos(){
    return new Phaser.Point(
      this.game.rnd.realInRange(0, this.game.width),
      this.game.rnd.realInRange(0, this.game.height)
    );
  }

  movementMode(){
    const tween = this.game.add.tween(this);
    let toPos = this._getRandomPos();
    tween.onComplete.add(() => this.movementMode());

    var duration = (Phaser.Point.distance(this.position, toPos) / this.options.speed) * 1000;

    // TODO: Use the following when sprites are done
    tween.to(toPos, duration, Phaser.Linear, true);
  }

}

class FlashingLight extends Phaser.Sprite {

  defaultOptions = {
    alpha: 0.9,
    rithm: [1000, 100, 1000, 100, 1000, 100, 50, 50, 50, 50, 50, 50] // MAKE IT PAIR
  }

  constructor(game, options) {
    super(game, 0, 0, 'light');
    this.options = Object.assign({}, this.defaultOptions, options);
    this.anchor.setTo(0.5, 0.5);
    this.blendMode = Phaser.blendModes.ADD;
    this.scale.setTo(100);
    this.position.setTo(this.game.world.centerX, this.game.world.centerY);
    this.alpha = this.options.alpha;
    
    // starts off
    this.visible = false;
    this.currentFlash = -1;
    this.flashing();
  }

  update(){

  }

  _getNextFlash(){
    let nextFlash = this.options.rithm[this.currentFlash + 1];
    if(!nextFlash){
      this.currentFlash = 0;
      return this.options.rithm[0];
    }
    else {
      this.currentFlash = this.currentFlash + 1;
      return this.options.rithm[this.currentFlash];
    }
  }

  flashing(){
    this.game.time.events.add(this._getNextFlash(), () => {
      this.visible = !this.visible;
      this.flashing();
    });
  }

}

class Lights extends Phaser.Group {

  colors = [
    0xea1a1a,
    0xcaea1a,
    0x1d1aea,
    0x800080,
    0x4fc505
  ];

  defaultOptions = {
    maxScale: 2,
    amount: 20,
    minSpeed: 300,
    maxSpeed: 700
  };

  // options: { maxScale: 4, amount: 4}
  constructor(game, parent, options) {
    super(game, parent);
    this.options = Object.assign({}, this.defaultOptions, options);

    if(this.options.type === 'flash'){
      this.add(new FlashingLight(this.game, this.options));
    }
    else if(this.options.type === 'moving'){
      for(let i = 0; i < this.options.amount; i++){
        this.add(this.createLight());
      }
    }
  }

  createLight(){
    let light = new Light(this.game, {
      color: this.game.rnd.pick(this.colors),
      maxScale: this.options.maxScale || 4,
      speed: this.game.rnd.realInRange(this.options.minSpeed, this.options.maxSpeed)
    });
    return light;
  }

}

export default Lights;
