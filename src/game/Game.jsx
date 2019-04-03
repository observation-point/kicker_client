import React from 'react';
import axios from 'axios';
import './Game.css';
import io from 'socket.io-client';
import Goals from './Goals';
import playerImg from './user.svg';
import attackImg from './attack.svg';
import defImg from './defense.svg';

import Config from '../config/config';
import Title from '../components/Title';

let socket = io(Config.socket_url);

class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            redAttack: null,
            redDef: null,
            blackAttack: null,
            blackDef: null,
            goals: props.goals,
            status: props.status,
            startGame: props.startGame
        };
    }

    componentDidMount() {
        const { players, goals, status } = this.props;
        this.setState({
            status,
            goals
        });
        this.setPlayers(players);
        socket.on('updated_game', this.fetchSocketData.bind(this));
    }

    async join(role, side) {
        await axios({
            method: 'post',
            url: `${Config.api_url}/game`,
            withCredentials: true,
            data: {
                role: role,
                side: side
            }
        });
    }

    fetchSocketData(data) {
        const { players, goals, status, startGame } = data;

        this.setState({
            goals,
            status,
            startGame
        });
        this.setPlayers(players);
    }

    setPlayers(players) {
        const slots = {
            red: {
                attack: null,
                def: null
            },
            black: {
                attack: null,
                def: null
            }
        };

        players.forEach(player => {
            if (player.side === 'BLACK') {
                if (player.role === 'attack') {
                    slots.black.attack = player;
                } else {
                    slots.black.def = player;
                }
            } else {
                if (player.role === 'attack') {
                    slots.red.attack = player;
                } else {
                    slots.red.def = player;
                }
            }
        });

        this.setState({
            redAttack: slots.red.attack,
            redDef: slots.red.def,
            blackAttack: slots.black.attack,
            blackDef: slots.black.def
        });
    }

    getGoalCount() {
        const redTeamGoals = this.state.goals.filter(item => item.side === 'RED').length
        const blackTeamGoals = this.state.goals.filter(item => item.side === 'BLACK').length
        return `${redTeamGoals} : ${blackTeamGoals} | ${this.state.status}`
    }

    render() {
        const { redAttack, redDef, blackAttack, blackDef, goals, status, startGame } = this.state;
        console.log(redAttack);
        return (
            <div id="game_root" className="game_root">
                <Title pageTitle={this.getGoalCount()} />
                <div className="game_table">
                    <Goals goals={goals} status={status} startGame={startGame} />

                    <div className="game_title">kicker.lan</div>

                    <button
                        className="player_button red attack"
                        disabled={!!redAttack}
                        onClick={() => {
                            this.join('attack', 'RED');
                        }}
                    >
                        {!!redAttack ? (
                            <React.Fragment>
                            <img alt=" " className="ava" src={playerImg} />
                            <span className="role_name">{redAttack.user.firstName}</span>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <img alt=" " className="ava_role_attack" src={attackImg} />
                                <span className="role_name">attack</span>
                            </React.Fragment>
                        )}
                    </button>
                    <button
                        className="player_button red defense"
                        disabled={!!redDef}
                        onClick={() => {
                            this.join('defense', 'RED');
                        }}
                    >
                        {!!redDef ? (
                            <React.Fragment>
                                <img alt=" " className="ava" src={playerImg} />
                                <span className="role_name">{redDef.user.firstName}</span>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <img alt=" " className="ava_role_def" src={defImg} />
                                <span className="role_name">defense</span>
                            </React.Fragment>
                        )}
                    </button>
                    <button
                        className="player_button black attack"
                        disabled={!!blackAttack}
                        onClick={() => {
                            this.join('attack', 'BLACK');
                        }}
                    >
                        {!!blackAttack ? (
                            <React.Fragment>
                                <img alt=" " className="ava" src={playerImg} />
                                <span className="role_name">{blackAttack.user.firstName}</span>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <img alt=" " className="ava_role_attack" src={attackImg} />
                                <span className="role_name">attack</span>
                            </React.Fragment>
                        )}
                    </button>
                    <button
                        className="player_button black defense"
                        disabled={!!blackDef}
                        onClick={() => {
                            this.join('defense', 'BLACK');
                        }}
                    >
                        {!!blackDef ? (
                            <React.Fragment>
                                <img alt=" " className="ava" src={playerImg} />
                                <span className="role_name">{blackDef.user.firstName}</span>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <img alt=" " className="ava_role_def" src={defImg} />
                                <span className="role_name">defense</span>
                            </React.Fragment>
                        )}
                    </button>
                </div>
            </div>
        );
    }
}

export default Game;
