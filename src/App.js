import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import Main from './main/Main';

class App extends Component {


  async componentDidMount() {

    const { data: gameData } = await axios.get('http://0.0.0.0:8888/api/game');
    // const { data: userData } = await axios.get('http://0.0.0.0:8888/api/auth');

    console.log(gameData);

    // this.setState({
    //   players: gameData.players,
    //   goals: gameData.goals,
    //   status: gameData.status,
    //   user: userData.user
    // });
  }

  render() {
    return (
      <div className="App">
        {/* <Main
          players={this.state.players}
          goals={this.state.goals}
          status={this.state.status}
          user={this.state.user}
        /> */}
      </div>
    );
  }
}

export default App;
