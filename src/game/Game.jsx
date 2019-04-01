import React from 'react';
import axios from 'axios';
import './Game.css'
import io from 'socket.io-client';
import Goals from './Goals';
import playerImg from './user.svg';

import Config from '../config/config';

let socket = io(Config.socket_url);

class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            redAttack: null,
            redDef: null,
            blackAttack: null,
            blackDef: null,
            goals: []
        }

    }


    componentDidMount() {

        const { players, goals } = this.props;

        this.setPlayers(players);
        this.setGoals(goals);

        socket.on('updated_game', this.fetchSocketData.bind(this));
    }


    async join(role, side) {
        await axios({
            method: 'post',
            url: `${Config.api_url}/game`,
            withCredentials: true,
            data: {
                role: role,
                side: side
            }
        });
    }



    fetchSocketData(data) {
        const { players, goals } = data;

        this.setPlayers(players);
        this.setGoals(goals);
    }

    setGoals(goals) {
        this.setState({
            goals
        });
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

        players.forEach((player) => {
            if (player.side === 'BLACK') {
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

    render() {
        const { redAttack, redDef, blackAttack, blackDef, goals } = this.state;

        return (
            <div className='game_root'>
                <div className='game_title'>kicker.lan</div>
                <div className='game_table'>
                    <Goals goals={goals} />

                    {/* <div>{props.status}</div> */}

                    <button className="player_button red attack"
                        disabled={!!redAttack}
                        onClick={() => { this.join('attack', 'RED') }}
                    >
                        {!!redAttack ? <img className="ava" src={playerImg} /> : <span>+</span> }
                </button>
                    <button className="player_button red defense"
                        disabled={!!redDef}
                        onClick={() => { this.join('defense', 'RED') }}
                    >
                        {!!redDef ? <img className="ava" src={playerImg} /> : <span>+</span> }
                </button>
                    <button className="player_button black attack"
                        disabled={!!blackAttack}
                        onClick={() => { this.join('attack', 'BLACK') }}
                    >
                        {!!blackAttack ? <img className="ava" src={playerImg} /> : <span>+</span> }
                </button>
                    <button className="player_button black defense"
                        disabled={!!blackDef}
                        onClick={() => { this.join('defense', 'BLACK') }}
                    >
                        {!!blackDef ? <img className="ava" src={playerImg} /> : <span>+</span> }
                </button>
                </div>
            </div>
        );
    }
};

export default Game;
