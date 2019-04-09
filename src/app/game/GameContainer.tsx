import React, { Component } from 'react';

import GamePage from './GamePage';
import { GameProps, GameState } from './types';
import { GameApi } from '../../api/GameApi';

class Game extends Component<GameProps, GameState> {
  public constructor(props: GameProps) {
    super(props);

    this.state = {
      goals: [],
      players: []
    }
  }

  public async componentDidMount() {
    const { goals, players } = await GameApi.getState();

    this.setState({ goals, players });
  }

  render() {
    return (
      <GamePage />
    );
  }
}

export default Game;
