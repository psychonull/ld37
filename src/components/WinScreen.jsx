import React, {Component} from 'react';

export default function WinScreen (props) {
  const phrase = 'THATS ALL, FOLKS!';
  return (
    <div className="win-screen">
      <div className="headers">
        <h4>{phrase}</h4>
        <h3>{phrase}</h3>
        <h2>{phrase}</h2>
        <h1>{phrase}</h1>
      </div>
      <p>:D Thanks for playing :D</p>
    </div>
  );
}