import React from 'react';

const Field = props => {
    return (
        <div className='field_root'>
            {/* <div className='field_title'>{props.title}</div> */}
            <input
                placeholder={props.title}
                className='field_input'
                value={props.value}
                onChange={props.onChange}
                type={props.type ? props.type : 'text'}
            />
        </div>
    );
}

export default Field;
