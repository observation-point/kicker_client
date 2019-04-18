import React from 'react';
import axios from 'axios';
import './Game.css';
import io from 'socket.io-client';
import { withRouter } from "react-router-dom";

import Game from './Game';
import Config from '../config/config';

export const socket = io(Config.socket_url);

const getSlots = (players) => {
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

    return slots;
}

class Lobby extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            redAttack: null,
            redDef: null,
            blackAttack: null,
            blackDef: null,
            goals: props.goals,
            status: props.status,
            startGame: props.startGame
        };
    }

    componentDidMount() {
        const { goals, status } = this.props;
        this.setState({
            status,
            goals
        });

        socket.on('updated_game', this.fetchSocketData.bind(this));
    }

    fetchSocketData(data) {
        console.log('fetchSocketData');

        const { id, players, goals, status, startGame } = data;

        const slots = getSlots(players);

        this.setState({
            goals,
            status,
            startGame,
            redAttack: slots.red.attack,
            redDef: slots.red.def,
            blackAttack: slots.black.attack,
            blackDef: slots.black.def
        });

        if (status === 'finished') {
            this.setState({
                gameResult: true,
                gameId: id
            });

            this.props.history.push(`/game/${id}`);
        }
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
        const { user, history, enterToLobby } = this.props;
        if (!user) {
            history.push('/login');
        } else {
            await axios({
                method: 'post',
                url: `${Config.api_url}/game`,
                withCredentials: true,
                data: {
                    role: role,
                    team: team
                }
            });
            enterToLobby();
        }
    }

    render() {
        const { joinAs, getGoalCount } = this;
        const {
            redAttack,
            redDef,
            blackAttack,
            blackDef,
            goals,
            startGame
        } = this.state;
        const players = { redAttack, redDef, blackAttack, blackDef };
        console.log('render lobby, players: ', players);
        return (
            <Game
                startGame={startGame}
                goals={goals}
                players={players}
                joinAs={joinAs.bind(this)}
                getGoalCount={getGoalCount.bind(this)}
            />
        );
    }
}

export default withRouter(Lobby);
