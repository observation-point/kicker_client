import React from 'react';
import axios from 'axios';
import './Game.css';
import io from 'socket.io-client';

import Game from './Game';
import Config from '../config/config';
import GameResult from './GameResult';

let socket = io(Config.socket_url);

class Lobby extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
            redAttack: null,
            redDef: null,
            blackAttack: null,
            blackDef: null,
            players: [],
            goals: [],
            status: null,
            startGame: null,
            gameResult: false
        };
    }

    componentDidMount() {
        const { players, goals, status } = this.props;
        this.setState({
            status,
            goals
        });
        this.setPlayers(players);
        socket.on('updated_game', this.fetchSocketData.bind(this));
    }

    fetchSocketData(data) {
        const { players, goals, status, startGame } = data;
        
        if (status === 'finished') {
            this.setState({
                gameResult: true
            });
        }

        this.setState({
            goals,
            status,
            startGame
        });
        this.setPlayers(players);

    }

    setPlayers(players) {
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

        players.forEach(player => {
            if (player.team === 'BLACK') {
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

        this.setState({
            redAttack: slots.red.attack,
            redDef: slots.red.def,
            blackAttack: slots.black.attack,
            blackDef: slots.black.def
        });
    }

    getGoalCount() {
        const redTeamGoals = this.state.goals.filter(
            item => item.team === 'RED'
        ).length;
        const blackTeamGoals = this.state.goals.filter(
            item => item.team === 'BLACK'
        ).length;
        return `${redTeamGoals} : ${blackTeamGoals} | ${this.state.status}`;
    }

    async joinAs(role, team) {
        await axios({
            method: 'post',
            url: `${Config.api_url}/game`,
            withCredentials: true,
            data: {
                role: role,
                team: team
            }
        });
    }

    closeGameResult() {
        this.setState({
            gameResult: false
        });
    }

    render() {
        const { joinAs, getGoalCount, closeGameResult } = this;
        const {
            redAttack,
            redDef,
            blackAttack,
            blackDef,
            goals,
            gameResult,
            startGame
        } = this.state;
        const players = { redAttack, redDef, blackAttack, blackDef };

        return !gameResult ? (
            <Game
                startGame={startGame}
                goals={goals}
                players={players}
                joinAs={joinAs.bind(this)}
                getGoalCount={getGoalCount.bind(this)}
            />
        ) : (
            <GameResult players={players} goals={goals} closeGameResult={closeGameResult.bind(this)}/>
        );
    }
}

export default Lobby;
