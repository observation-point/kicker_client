import axios from 'axios';
import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';
import './App.sass';
import Config from './config/config';

import Leaderboard from './components/Leaderboard';
import Sidebar from './components/Sidebar';

import Auth from './auth/Auth';
import GameResult from './game/GameResult';
import Lobby, { socket } from './game/Lobby';

console.log('TARGET: ', window.location.hostname);

type TokenParams = {
    token: string;
};

type State = {
    user: null;
    players: void[];
    goals: void[];
    status: null;
    startGame: null;
};

const WithToken = ({ match }: RouteComponentProps<TokenParams>) => {
    const { token } = match.params;
    console.log(token);
    const [ user, setUser ] = React.useState(null);

    axios({
        method: 'post',
        url: Config.api_url + '/auth/token',
        withCredentials: true,
        data: { token },
    }).then(({ data }) => setUser(data.user));

    console.log(user);

    return user && <Redirect to={'/'} />;
};

class App extends Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            user: null,
            players: [],
            goals: [],
            status: null,
            startGame: null,
        };
    }

    public async componentDidMount() {
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
            goals: gameData.goals,
            status: gameData.status,
            startGame: gameData.startGame,
        });

        socket.on('update_rating', async() => {
            const { data: userData } = await axios({
                method: 'get',
                url: Config.api_url + '/auth',
                withCredentials: true,
            });

            this.setState({
                user: userData.user,
            });
        });
    }

    public readonly onLogin = user => {
        this.setState({
            user,
        });
    }

    public readonly logout = async() => {
        await axios({
            method: 'get',
            url: `${Config.api_url}/auth/logout`,
            withCredentials: true,
        });

        this.setState({
            user: null,
        });
    }

    public readonly stopgame = async() => {
        await axios({
            method: 'post',
            url: `${Config.api_url}/game/stop`,
            withCredentials: true,
        });
    }

    public render() {
        const { user: userProfile } = this.state;
        const menuOptions = {
            logout: {
                title: 'Logout',
                method: this.logout,
            },
            stopGame: {
                title: 'Stop game',
                method: this.stopgame(),
            },
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
                            exact={true}
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
                                <Auth onLogin={this.onLogin} />
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
