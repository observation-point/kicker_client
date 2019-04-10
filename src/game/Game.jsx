import React from 'react';
import Goals from './Goals';
import playerImg from './user.svg';
import playerRedImg from './user_red.svg';
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
                                <img alt=" " className="ava" src={playerRedImg}/>
                                <span className="role_name">
                                    {redAttack.user.login} ({redAttack.user.rating})
                                </span>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <img alt=" " className="ava_role_attack" src={attackImg} />
                                <p className="role-char">+</p>
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
                                <img alt=" " className="ava" src={playerRedImg}/>
                                <span className="role_name">
                                    {redDef.user.login} ({redDef.user.rating})
                                </span>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <img alt=" " className="ava_role_def" src={defImg} />
                                <span className="role_name">defense</span>
                                <p className="role-char">+</p>
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
                                <img alt=" " className="ava" src={playerImg} />
                                <span className="role_name">
                                    {blackAttack.user.login} ({blackAttack.user.rating})
                                </span>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <img alt=" " className="ava_role_attack" src={attackImg} />
                                <p className="role-char">+</p>
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
                                <img alt=" " className="ava" src={playerImg} />
                                <span className="role_name">
                                    {blackDef.user.login} ({blackDef.user.rating})
                                </span>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <img alt=" " className="ava_role_def" src={defImg} />
                                <span className="role_name">defense</span>
                                <p className="role-char">+</p>
                            </React.Fragment>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default Game;
