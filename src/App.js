import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Config from './config/config';

import Auth from './auth/Auth';
import Game from './game/Game';

class App extends Component {

  state = {
    players: [],
    goals: [],
    status: 'ready',
    user: undefined
  };


  async componentDidMount() {
    console.log(Config.api_url);
    const { data: gameData } = await axios.get(Config.api_url + '/game');
    let user;
    try {
      user = (await axios.get(Config.api_url + '/auth')).data.user;
    } catch (error) {
      user = null;
    }

    console.log(gameData);

    this.setState({
      players: gameData.players,
      goals: gameData.goals,
      status: gameData.status,
      user
    });

    console.log(this.state);
  }

  render() {
    

    return (
      <div className="App">
      {this.state.user
      ? <Game
          players={this.state.players}
          goals={this.state.goals}
          status={this.state.status}
          user={this.state.user}
        />
        : <Auth/>
      }
      </div>
    );
  }
}

export default App;
