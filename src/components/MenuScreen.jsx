import React, {Component} from 'react';

export default function MenuScreen (props) {
  return (
    <div>
      <h1>LD37: the game</h1>
      <a onClick={props.onStartGameClick} href="">StartGame</a>
    </div>
  );
}