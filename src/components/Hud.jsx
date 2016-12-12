import React, {Component} from 'react';

export default class Hud extends Component {
  render() {
    const res = this.props.targetSprite ? this.props.targetSprite.split('_')[1] : '';
    console.log('sound', this.props.sound);
    return (
      this.props.level === null ?
        null :
      <div className="hud">
        <div className="stats">
          <div className="stat">Level: {this.props.level}</div>
          <div className="stat">Moves: {this.props.moves}</div>
          <div className="stat">
            <span>Get to the end:</span> 
            <div className={`target-img target-img-${res} img-${this.props.targetSprite}`} />
          </div>
        </div>
        <div className="commands">
          <div><a onClick={this.props.onRestartLevelClick} href="">Restart level</a></div>
          <div><a onClick={this.props.onToggleSoundClick} href="">
            { this.props.sound ? 'Sound off' : 'Sound on'}
          </a></div>
        </div>
      </div>
    );
  }
}