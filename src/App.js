import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import Main from './main/Main';

class App extends Component {

  state = {
    players: [],
    goals: [],
    status: 'ready',
    user: null
  };


  async componentDidMount() {

    const { data: gameData } = await axios.get('http://0.0.0.0:8888/api/game');
    let userData;
    try {
      userData = (await axios.get('http://0.0.0.0:8888/api/auth')).data;
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

  render() {
    return (
      <div className="App">
        <Main
          players={this.state.players}
          goals={this.state.goals}
          status={this.state.status}
          user={this.state.user}
        />
      </div>
    );
  }
}

export default App;
