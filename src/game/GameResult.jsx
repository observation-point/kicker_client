import React from 'react';

class GameResult extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { goals, closeGameResult } = this.props;
        const redTeamGoals = goals.filter(goal => goal.team === 'RED');
        const blackTeamGoals = goals.filter(goal => goal.team === 'BLACK');

        return (
            <div className="gameResult">
                <button onClick={() => closeGameResult()} />
                <h1>{redTeamGoals} - {blackTeamGoals}</h1>
            </div>
        )
    }
}

export default GameResult;
