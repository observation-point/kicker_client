import React from 'react';
import { withRouter } from "react-router-dom";

import Config from '../config/config';
import axios from 'axios';

import Title from '../components/Title';

const ResultPLayer = (props) => {
    const { role, team, user } = props;

    return (
        <div className="result-player">
            {
                team === 'BLACK' ?
                    <div className="result-team-black">{role[0].toUpperCase()}</div> : 
                    <div className="result-team-red">{role[0].toUpperCase()}</div> 
            }

            <div className="result-player-name">{user.fullname}</div>
            <div>{user.rating}</div>
        </div>
    );
}

class GameResult extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            goals: [],
            players: [],
            playTime: 0
        }
    }

    async componentDidMount() {
        const { gameId } = this.props.match.params;

        const { data: gameData } = await axios({
            method: 'get',
            url: Config.api_url + '/game/' + gameId,
            withCredentials: true
        });

        const playTime = new Date(gameData.endGame) - new Date(gameData.startGame);
    
        this.setState({
            goals: gameData.goals,
            players: gameData.players.sort((a, b) => a.team < b.team),
            playTime: new Date(playTime)
        })

    }

    async nextGameAction() {
        await axios({
            method: 'post',
            url: Config.api_url + '/game/new',
            withCredentials: true,
            data: { type: 'next' }
        });

        this.props.history.push('/');
    }

    async playAgainAction() {
        await axios({
            method: 'post',
            url: Config.api_url + '/game/new',
            withCredentials: true,
            data: { type: 'play_again' }
        });

        this.props.history.push('/');
    }

    render() {
        const { goals, playTime, players } = this.state;

        const redTeamGoals = goals.filter(goal => goal.team === 'RED');
        const blackTeamGoals = goals.filter(goal => goal.team === 'BLACK');

        const minutes = playTime && playTime.getMinutes();
        const seconds = playTime && playTime.getSeconds();

        return (
            <div id="game_root" className="game_root">
                <Title />
                <div className="game_table">
                    <div className="game_title">kicker.lan</div>
                    <h1 className="result-count">{redTeamGoals.length} - {blackTeamGoals.length}</h1>

                    <p className="result-time">
                        play time - {`${minutes > 9 ? minutes : '0'+minutes}:${seconds > 9 ? seconds : '0'+seconds}`}
                    </p>
                    <div className="result-players">
                        {
                            players.map(item => 
                                <ResultPLayer role={item.role} team={item.team} user={item.user} />
                            )
                        }

                    </div>
                    <div className="next-game">
                    <a className="next" onClick={() => this.nextGameAction()}>next</a>
                         | 
                    <a className="play-again" onClick={() => this.playAgainAction()}>play again</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(GameResult);
