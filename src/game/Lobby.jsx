import React from 'react';
import axios from 'axios';
import './Game.css';
import io from 'socket.io-client';
import { withRouter } from "react-router-dom";

import Game from './Game';
import Config from '../config/config';

export const socket = io(Config.socket_url);

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

const setSlots = (players) => {

    slots.black.attack = null;
    slots.black.def = null;
    slots.red.attack = null;
    slots.red.def = null;

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
            startGame: props.startGame,
            test: true
        };
    }

    componentWillMount() {
        socket.on('updated_game', this.fetchSocketData.bind(this));
    }
    
    componentWillReceiveProps() {
        const { goals, status } = this.props;
        this.setState({
            status,
            goals
        });
    }


    fetchSocketData(data) {
        console.log('fetchSocketData');

        const { id, players, goals, status, startGame } = data;

        setSlots(players);

        this.setState({
            test: !this.state.test
        });

        if (players.length !== this.props.players.length || goals.length !== this.state.goals.length) {
            this.setState({
                goals,
                status,
                startGame
            });
        }

        if (status === 'finished') {
            this.setState({
                gameResult: true,
                gameId: id
            });
            this.props.history.push(`/game/${id}`);
        }
    }

    getGoalCount() {
        const redTeamGoals = this.state.goals.filter(item => item.team === 'RED').length;
        const blackTeamGoals = this.state.goals.filter(item => item.team === 'BLACK').length;
        return `${redTeamGoals} : ${blackTeamGoals} | ${this.state.status}`;
    }

    joinAs(role, team) {
        const {  enterToLobby } = this.props;
        axios({
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

    render() {
        const { joinAs, getGoalCount } = this;
        const {
            goals,
            startGame
        } = this.state;
        const {
            redAttack,
            redDef,
            blackAttack,
            blackDef,
        } = slots;

        console.log('slots', slots);
        const players = {
            redAttack: slots.red.attack,
            redDef: slots.red.def,
            blackAttack: slots.black.attack,
            blackDef: slots.black.def
        };

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
