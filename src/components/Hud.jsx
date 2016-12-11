import React, {Component} from 'react';

export default class Hud extends Component {
  render() {
    return (
      this.props.level === null ?
        null :
      <div className="hud">
        <div className="stats">
          <div className="stat">Level: {this.props.level}</div>
          <div className="stat">Moves: {this.props.moves}</div>
        </div>
        <div className="commands">
          <a onClick={this.props.onRestartLevelClick} href="">Restart level</a>
        </div>
      </div>
    );
  }
}