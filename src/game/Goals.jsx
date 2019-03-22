import React from 'react';

const Goals = props => {
    return (
        <>
            <div>{props.goals.filter(item => item.side === 'defence').length}</div>
            -
            <div>{props.goals.filter(item => item.side === 'attack').length}</div>
        </>
    );
};

export default Goals;