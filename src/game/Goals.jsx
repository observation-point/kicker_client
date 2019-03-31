import React from 'react';

const Goals = props => {
    return (
        <div className="goals">
            <div style={{color: 'red'}}>{props.goals.filter(item => item.side === 'RED').length}</div>
            -
            <div style={{color: 'white'}}>{props.goals.filter(item => item.side === 'BLACK').length}</div>
        </div>
    );
};

export default Goals;