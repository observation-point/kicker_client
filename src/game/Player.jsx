import React from 'react';

const Player = props => {
    return (
        props.player
            ? (
                <div className='player_name'>{props.firstName} {props.secondName}</div>
            )
            : (
                <div className='player_addButton'>++++++++</div>
            )
    );
}

export default Player;