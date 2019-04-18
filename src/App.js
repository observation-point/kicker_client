import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Config from './config/config';

import Sidebar from './components/Sidebar';
import Leaderboard from './components/Leaderboard';

import Auth from './auth/Auth';
import GameResult from './game/GameResult';
import Lobby, { socket } from './game/Lobby';

console.log('TARGET: ', window.location.hostname);

const WithToken = ({match}) => {
    const token = match.params.token;
    console.log(token);
    const [user, setUser] = React.useState(null);

    axios({
        method: 'post',
        url: Config.api_url + '/auth/token',
        withCredentials: true,
        data: {token}
    }).then(({data}) => setUser(data.user));

    console.log(user);
    
    return user && <Redirect to={'/'} />;
}

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: null,
            players: [],
            goals: [],
            status: null,
            startGame: null,
            isInLobby: false 
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
            startGame: gameData.startGame,
            isInLobby: !!gameData.players.find(player => player.user.id === userData.user.id)
        });

        socket.on('update_rating', async () => {

            const { data: userData } = await axios({
                method: 'get',
                url: Config.api_url + '/auth',
                withCredentials: true
            });
            this.setState({
                user: userData.user
            });
        });
    }

    onLogin(user) {
        this.setState({
            user: user
        });
    }

    enterToLobby() {
        this.setState({
            isInLobby: true
        })
    }

    async goAway() {
        await axios({
            method: 'delete',
            url: `${Config.api_url}/game`,
            withCredentials: true
        });
        this.setState({
            isInLobby: false
        })
    }

    async stopgame() {
        await axios({
            method: 'post',
            url: `${Config.api_url}/game/stop`,
            withCredentials: true
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

    render() {
        const { user: userProfile, isInLobby, status } = this.state;
        const menuOptions = {
            logout: {
                show: !!userProfile,
                method: () => this.logout(),
            },
            stopGame: {
                show: !!userProfile && isInLobby,
                method: () => this.stopgame(),
            },
            goAway: {
                show: !!userProfile && isInLobby && status === 'ready',
                method: () => this.goAway()
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
                            path="/"
                            component={() => (
                                <Lobby
                                    user={this.state.user}
                                    goals={this.state.goals}
                                    players={this.state.players}
                                    status={this.state.status}
                                    startGame={this.state.startGame}
                                    enterToLobby={this.enterToLobby.bind(this)}
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
                        <Route path="/token/:token/" component={WithToken} />
                        <Route path="/leaderboard/" component={Leaderboard} />

                        <Redirect from="*" to="/" />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
