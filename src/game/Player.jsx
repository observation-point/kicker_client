import React from 'react';

const Player = props => {
    return (
        <div className='player_name'>{props.firstName} {props.secondName}</div>
    );
}

export default Player;