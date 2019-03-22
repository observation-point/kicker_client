import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Config from './config/config';

import Main from './main/Main';

class App extends Component {

  state = {
    players: [],
    goals: [],
    status: 'ready',
    user: null
  };


  async componentDidMount() {

    const { data: gameData } = await axios.get(Config.api_url + '/game');
    let userData;
    try {
      userData = (await axios.get(Config.api_url + '/auth')).data;
    } catch (error) {
      userData = null;
    }

    console.log(gameData);

    this.setState({
      players: gameData.players,
      goals: gameData.goals,
      status: gameData.status,
      user: userData.user
    });

    console.log(this.state);
  }

  async join(role, side) {
      await axios.post(Config.api_url + '/game', {
          role: role,
          side: side
      });
  }

  render() {
    const { players } = this.state;

    const slots = {
        red: {
            attack: null,
            def: null
        },
        black: {
            attack: null,
            def: null
        }
    };

    players.forEach((player) => {
        if (player.side === 'BLACK') {
            if (player.role === 'attack') {
                slots.black.attack = player;
            } else {
                slots.black.def = player;
            }
        } else {
            if (player.role === 'attack') {
                slots.red.attack = player;
            } else {
                slots.red.def = player;
            }
        }
    });

    return (
      <div className="App">
        <Main
          players={this.state.players}
          goals={this.state.goals}
          status={this.state.status}
          user={this.state.user}
        />
        <button
            disabled={!!slots.red.attack}
            onClick={() => {this.join('attack', 'RED')}}
        >
            Join (red attack)
        </button>
        <button
            disabled={!!slots.red.def}
            onClick={() => {this.join('defense', 'RED')}}
        >
            Join (red def)
        </button>
        <button
            disabled={!!slots.black.attack}
            onClick={() => {this.join('attack', 'BLACK')}}
        >
            Join (black attack)
        </button>
        <button
            disabled={!!slots.black.def}
            onClick={() => {this.join('defense', 'BLACK')}}
        >
            Join (black def)
        </button>
      </div>
    );
  }
}

export default App;
