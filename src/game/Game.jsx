import React, { useState } from 'react';

import Player from './Player';
import Goals from './Goals';

const Game = props => {
    const [state, setState] = useState();

    return (
        <div className='game_root'>
            <div className='game_title'>kicker.lan</div>

            {props.players.map(item => (
                <Player key={item.user.login} {...item.user} />
            ))}

            <Goals goals={props.goals} />

            <div>{props.status}</div>
        </div>
    );
}

export default Game;