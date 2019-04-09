import React, { Component } from 'react';

import './Game.css';
import { GameProps } from './types';

export const GamePage = (props: GameProps) => {
  return (
    <div className="game-root">
      <div className="black field"></div>
      <div className="red field"></div>
      <div className="game-stats">
        <div className="game-count">0 - 0</div>
        <div className="game-role">
          <p className="attack symbol black">&#9876;</p>
          <p className="attack symbol red">&#9876;</p>
        </div>
        <div className="game-role">
          <p className="defense symbol black">&#128737;</p>
          <p className="defense symbol red">&#128737;</p>
        </div>
      </div>
    </div>
  );
}

export default GamePage;
