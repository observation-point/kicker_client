import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Config from './config/config';

import Auth from './auth/Auth';
import Game from './game/Game';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: null
        }
    }

    componentDidMount() {
        try {
            axios.get(Config.api_url + '/auth').then(({data}) => {
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

    render() {
        return (
            <div className="App">
                {this.state.user ?
                    <Game
                        user={this.state.user}
                    /> : <Auth onLogin={this.onLogin.bind(this)}/>
                }
            </div>
        );
    }
}

export default App;
