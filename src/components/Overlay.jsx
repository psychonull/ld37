import React, {Component} from 'react';
import MenuScreen from './MenuScreen.jsx';
import WinScreen from './WinScreen.jsx';

export default class Hud extends Component {

  _getComponent() {
    switch (this.props.gameState) {
      case 'menu':
        return MenuScreen;        
      case 'win':
        return WinScreen;        
      default:
        return null;
    }
  }

  render() {
    let Component = this._getComponent(); //MEGAHYPERCOOL COMPONENT ROUTING!!

    return (
      Component ?
      <div className="overlay">
        <Component {...this.props} />
      </div>
      :
      null
    );
  }
}