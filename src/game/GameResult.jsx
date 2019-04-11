import React from 'react';

class GameResult extends React.Component {

    render() {
        // const { goals, closeGameResult } = this.props;
        // const redTeamGoals = goals.filter(goal => goal.team === 'RED');
        // const blackTeamGoals = goals.filter(goal => goal.team === 'BLACK');

        return (
            <div className="gameResult">
                <a href="/"><button>Lobby</button></a>
                <h1>5 - 0</h1>
            </div>
        )
    }
}

export default GameResult;
