import React, {Component} from 'react';

export default class Hud extends Component {
  render() {
    return <h1>{this.props.name}</h1>;
  }
}