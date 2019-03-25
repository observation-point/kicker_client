import React from 'react';
import axios from 'axios';

import Player from './Player';
import Goals from './Goals';

import Config from '../config/config';

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
        this.fetchData();
    }


    async join(role, side) {
        const { data } = await axios({
            method: 'post',
            url: `${Config.api_url}/game`,
            withCredentials: true,
            data: {
                role: role,
                side: side
            }
        });

        console.log(data);
    }

    async fetchData() {
        const { data } = await axios({
            method: 'get',
            url: `${Config.api_url}/game`,
            withCredentials: true,
        });

        const { players, goals } = data;
        console.log(goals);
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

                <Goals goals={goals} />

                {/* <div>{props.status}</div> */}

                <button
                    disabled={!!redAttack}
                    onClick={() => { this.join('attack', 'RED') }}
                >
                    Join (red attack)
            </button>
                <button
                    disabled={!!redDef}
                    onClick={() => { this.join('defense', 'RED') }}
                >
                    Join (red def)
            </button>
                <button
                    disabled={!!blackAttack}
                    onClick={() => { this.join('attack', 'BLACK') }}
                >
                    Join (black attack)
            </button>
                <button
                    disabled={!!blackDef}
                    onClick={() => { this.join('defense', 'BLACK') }}
                >
                    Join (black def)
            </button>
            </div>
        );
    }
};

export default Game;
