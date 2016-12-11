import React, {Component} from 'react';

export default class Hud extends Component {
  render() {
    return (
      this.props.level === null ?
        null :
      <div>
        <div>Level: {this.props.level}</div>
        <div>Moves: {this.props.moves}</div>
        <a onClick={this.props.onRestartLevelClick} href="">Restart level</a>
      </div>
    );
  }
}