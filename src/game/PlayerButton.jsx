import React from 'react';

const PlayerButton = props => {
    return (
        <div className='player_button_root'>
            <div className='player_button_title'>{props.title}</div>
            <input
                className={props.classNames}
                value={props.value}
                onChange={props.onChange}
            /> 
        </div>
    );
}

export default Field;