import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Config from './config/config';

import Sidebar from './components/Sidebar';
import Auth from './auth/Auth';
import GameResult from './game/GameResult';
import Lobby from './game/Lobby';

console.log('TARGET: ', window.location.hostname);

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: null,
            players: [],
            goals: [],
            status: null,
            startGame: null,
        };
    }

    async componentDidMount() {

        const { data: userData } = await axios({
            method: 'get',
            url: Config.api_url + '/auth',
            withCredentials: true
        });

        const { data: gameData } = await axios({
            method: 'get',
            url: Config.api_url + '/game',
            withCredentials: true
        });

        this.setState({
            user: userData.user,
            players: gameData.players,
            goals: gameData.goals,
            status: gameData.status,
            startGame: gameData.startGame
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
        const { user: userProfile } = this.state;
        const menuOptions = {
            logout: {
                title: 'Logout',
                method: () => {
                    this.logout();
                }
            },
            stopGame: {
                title: 'Stop game',
                method: () => {
                    this.stopgame();
                }
            }
        };

        return (
            <Router>
                <div id="App">
                    <Sidebar
                        pageWrapId={'game_root'}
                        outerContainerId={'App'}
                        userProfile={userProfile}
                        menuOptions={menuOptions}
                    />
                    <Switch>
                        <Route
                            exact
                            path="/"
                            component={() => (
                                <Lobby
                                    user={this.state.user}
                                    goals={this.state.goals}
                                    players={this.state.players}
                                    status={this.state.status}
                                    startGame={this.state.startGame}
                                />
                            )}
                        />
                        <Route
                            path="/login/"
                            component={() => (
                                <Auth onLogin={this.onLogin.bind(this)} />
                            )}
                        />
                        <Route path="/game/:gameId/" component={GameResult} />

                        <Redirect from="*" to="/" />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
