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
            user: null
        }
    }

    componentDidMount() {
        try {
            axios({
                method: 'get',
                url: Config.api_url + '/auth',
                withCredentials: true,
            }).then(({data}) => {
                this.setState({
                    user: data.user
                });
            });
        } catch (e) {
            console.log('err');
        }
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
                    <Game
                        user={this.state.user}
                    /> 
                    : <Auth onLogin={this.onLogin.bind(this)}/>
                }
                {
                    this.state.user ?
                    <button className="logout"
                    onClick={() => { this.logout() }}
                >
                    log out
                </button> : null
                }
                {
                    this.state.user ?
                    <button className="stopgame"
                    onClick={() => { this.stopgame() }}
                >
                    stop game
                </button> : null
                }
            </div>
        );
    }
}

export default App;
