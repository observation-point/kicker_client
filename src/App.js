import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Config from './config/config';

import Auth from './auth/Auth';
import Game from './game/Game';

console.log(window.location.hostname);

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: null,
            goals: [],
            players: []
        }
    }

    async componentDidMount() {
        const { data: userData } = await axios({
            method: 'get',
            url: Config.api_url + '/auth',
            withCredentials: true,
        });

        const { data: gameData } = await axios({
            method: 'get',
            url: Config.api_url + '/game',
            withCredentials: true,
        });

        this.setState({
            user: userData.user,
            players: gameData.players,
            golas: gameData.goals
        });
    
    }

    onLogin(user) {
        this.setState({
            user: user
        });
    }

    async logout() {
        await axios({
            method: 'get',
            url: `${Config.api_url}/auth/logout`,
            withCredentials: true
        });

        this.setState({
            user: null
        });
    }

    async stopgame() {
        await axios({
            method: 'post',
            url: `${Config.api_url}/game/stop`,
            withCredentials: true
        });
    }

    render() {
        return (
            <div className="App">
                {this.state.user ?
                    <React.Fragment>
                        <Game
                            goals={this.state.goals}
                            players={this.state.players}
                        />
                        <div className="footer">
                        <button
                            className="logout"
                            onClick={() => { this.logout() }}
                        >
                            log out
                        </button>
                        <span className="user_name">
                            {this.state.user.firstName}
                        </span>
                        <button 
                            className="stopgame"
                            onClick={() => { this.stopgame() }}
                        >
                            stop game
                        </button>
                        </div>
                    </React.Fragment> :
                    <Auth onLogin={this.onLogin.bind(this)}/>
                }
            </div>
        );
    }
}

export default App;
