import React, { Component } from 'react';

import './App.css';
import { Header } from './header/Header';
import Game from './game/GameContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Game />
      </div>
    );
  }
}

export default App;
