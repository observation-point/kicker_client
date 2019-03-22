import React from 'react';

const Field = props => {
    return (
        <div className='field_root'>
            <div className='field_title'>{props.title}</div>
            <input
                className='field_input'
                value={props.value}
                onChange={props.onChange}
            /> 
        </div>
    );
}

export default Field;