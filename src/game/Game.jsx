import React from 'react';
import axios from 'axios';

import Player from './Player';
import Goals from './Goals';

import Config from '../config/config';

const join = async (role, side) => {
    await axios.post(Config.api_url + '/game', {
        role: role,
        side: side
    });
}

const Game = props => {
    const { players } = props;

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

    return (
        <div className='game_root'>
            <div className='game_title'>kicker.lan</div>

            <Goals goals={props.goals} />

            <div>{props.status}</div>

            <button
                disabled={!!slots.red.attack}
                onClick={() => { join('attack', 'RED') }}
            >
                Join (red attack)
        </button>
            <button
                disabled={!!slots.red.def}
                onClick={() => { join('defense', 'RED') }}
            >
                Join (red def)
        </button>
            <button
                disabled={!!slots.black.attack}
                onClick={() => { join('attack', 'BLACK') }}
            >
                Join (black attack)
        </button>
            <button
                disabled={!!slots.black.def}
                onClick={() => { join('defense', 'BLACK') }}
            >
                Join (black def)
        </button>
        </div>
    );
}

export default Game;