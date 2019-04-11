import React from 'react';
import Goals from './Goals';
import plusImg from './plus.svg';
import plusRedImg from './plus_red.svg';
import Title from '../components/Title';

const NOT_A_DATE = '- : -';

class Game extends React.Component {
    constructor(props) {
        super(props);

        this.timer = setInterval(
            () =>
                this.setState({
                    time: this.props.startGame
                        ? Date.now() - new Date(this.props.startGame)
                        : NOT_A_DATE
                }),
            1
        );
    }

    render() {
        const { startGame, goals, joinAs, getGoalCount } = this.props;
        const { redAttack, redDef, blackAttack, blackDef } = this.props.players;

        console.log(this.props.players);

        return (
            <div id="game_root" className="game_root">
                <Title pageTitle={getGoalCount()} />
                <div className="game_table">
                    <Goals goals={goals} startGame={startGame} />

                    <div className="game_title">kicker.lan</div>

                    <div
                        className="player_button red attack"
                        disabled={!!redAttack}
                        onClick={() => joinAs('attack', 'RED')}
                    >
                        {!!redAttack ? (
                            <React.Fragment>
                            <img alt=" " className="ava" src={redAttack.user.avatar} />
                            <span className="role_name">{redAttack.user.fullname}</span>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <img alt=" " className="role-char" src={plusRedImg} />
                                <span className="role_name">attack</span>
                            </React.Fragment>
                        )}
                    </div>
                    <div
                        className="player_button red defense"
                        disabled={!!redDef}
                        onClick={() => joinAs('defense', 'RED')}
                    >
                        {!!redDef ? (
                            <React.Fragment>
                                <img alt=" " className="ava" src={redDef.user.avatar} />
                                <span className="role_name">{redDef.user.fullname}</span>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <span className="role_name">defense</span>
                                <img alt=" " className="role-char" src={plusRedImg} />
                            </React.Fragment>
                        )}
                    </div>
                    <div
                        className="player_button black attack"
                        disabled={!!blackAttack}
                        onClick={() => joinAs('attack', 'BLACK')}
                    >
                        {!!blackAttack ? (
                            <React.Fragment>
                                <img alt=" " className="ava" src={blackAttack.user.avatar} />
                                <span className="role_name">{blackAttack.user.fullname}</span>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <img alt=" " className="role-char" src={plusImg} />
                                <span className="role_name">attack</span>
                            </React.Fragment>
                        )}
                    </div>
                    <div
                        className="player_button black defense"
                        disabled={!!blackDef}
                        onClick={() => joinAs('defense', 'BLACK')}
                    >
                        {!!blackDef ? (
                            <React.Fragment>
                                <img alt=" " className="ava" src={blackDef.user.avatar} />
                                <span className="role_name">{blackDef.user.fullname}</span>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <span className="role_name">defense</span>
                                <img alt=" " className="role-char" src={plusImg} />
                            </React.Fragment>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default Game;
