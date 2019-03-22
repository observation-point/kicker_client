import React from 'react';
import axios from 'axios';

import Player from './Player';
import Goals from './Goals';

const Game = props => {
    const addPlayer = async(side, role) => {
        await axios.post('http://0.0.0.0:8888/api/auth', {
            side,
            role
        });
    }

    return (
        <div className='game_root'>
            <div className='game_title'>kicker.lan</div>

            {renderPlayerButton('red', 'attack')}
            {renderPlayerButton('red', 'defence')}
            {renderPlayerButton('black', 'attack')}
            {renderPlayerButton('black', 'defence')}

            <Goals goals={props.goals} />

            <div>{props.status}</div>
        </div>
    );

    function renderPlayerButton(side, role) {
        return (
            <Player
                side={side}
                role={role}
                player={getPlayerBySideAndRole(props.player, side, role)}
                onAddClick={() => addPlayer(side, role)}
            />
        );
    }
}

function getPlayerBySideAndRole(players, side, role) {
    return players && players.find(item => item.side === side && item.role === role);
}

export default Game;