import React, {Component} from 'react';

export default function MenuScreen (props) {
  return (
    <div className="menu">
      <h1 className="game-title">Space Punky Reggae Party</h1>
      <a className="menu-item" onClick={props.onStartGameClick} href="">Start Game</a>
      <div className="instructions">
        <h3>Instructions:</h3>
        <p>Get the unsuspecting subject out of the place by reorganizing everyone’s position.</p>
        <p><b>CONTROLS:</b> Swipe / Click subject and move to an empty space.</p>
      </div>
    </div>
  );
}