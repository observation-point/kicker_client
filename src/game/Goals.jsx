import React from 'react';

const Goals = props => {
    return (
        <>
            <div style="color: red">{props.goals.filter(item => item.side === 'RED').length}</div>
            -
            <div style="color: black">{props.goals.filter(item => item.side === 'BLACK').length}</div>
        </>
    );
};

export default Goals;