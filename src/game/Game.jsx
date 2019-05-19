import React from 'react';

import playerImg from './user.svg';
import playerRedImg from './user_red.svg';
import plusImg from './plus.svg';
import plusRedImg from './plus_red.svg';

import Title from '../components/Title';

import Goals from './Goals';
import ChanceSlider from './ChanceSlider';
import VideoPlayer from '../components/VideoPlayer';

const NOT_A_DATE = '- : -';
const BASE_REPLAY_URL = 'http://www130.lan';

class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showStreamButton: true,
            showReplayButton: false,
            showVideo: false,
            videoUrl: null
        }

        this.timer = setInterval(
            () =>
                this.setState({
                    time: this.props.startGame
                        ? Date.now() - new Date(this.props.startGame)
                        : NOT_A_DATE
                }),
            1000
        );
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.status === 'inprocess') {
            this.setState({ showStreamButton: true });
        } else {
            this.setState({ showStreamButton: false });
        }
        nextProps.goals.push({ team: 'RED', id: 'goal4' });
        if (nextProps.goals.length) {
            if (nextProps.goals !== this.props.goals) {
                this.setState({ showReplayButton: false });
            }
            this.setState({ showReplayButton: true });
        } else {
            this.setState({ showReplayButton: false });
        }
    }

    showStream() {
        const { showVideo } = this.state;
        if (showVideo) {
            this.setState({ showVideo: false });
        } else {
            this.setState({ videoUrl: `${BASE_REPLAY_URL}/stream/game.m3u8`, showVideo: true });
        }
    }

    showReplay() {
        const { showVideo } = this.state;
        if (showVideo) {
            this.setState({ showVideo: false });
        } else {
            const videoUrl = this.getLastGoalUrl();
            if (videoUrl) {
                this.setState({ videoUrl, showVideo: true });
            }
        }
    }

    getLastGoalUrl() {
        const { gameId, goals } = this.props;
        let lastGoalUrl = '';
        if (gameId && goals) {
            const { id: lastGoalId } = goals[goals.length - 1];
            lastGoalUrl = `${BASE_REPLAY_URL}/replay/${gameId}/${lastGoalId}.mp4`;
        }
        return lastGoalUrl;
    }

    render() {
        const { showStreamButton, showReplayButton, showVideo, videoUrl } = this.state;
        const { startGame, joinAs, getGoalCount, goals } = this.props;
        const { redAttack, redDef, blackAttack, blackDef } = this.props.players;
        const redWinrate = redAttack && redDef ? Math.round((redAttack.winRate + redDef.winRate) / 2) : 0.2;
        const blackWinrate = blackAttack && blackDef ? Math.round((blackAttack.winRate + blackDef.winRate) / 2) : 0.2;
        
        return (
            <div id="game_root" className="game_root">
                <Title pageTitle={getGoalCount()} />
                <div className="game_table">
                    <Goals goals={goals} startGame={startGame} />
                    <ChanceSlider
                        redWinrate={redWinrate}
                        blackWinrate={blackWinrate}
                        goals={goals}
                    />

                    <div className="game_title">kicker.lan</div>
                    
                    {showStreamButton ? <a onClick={() => this.showStream()} className="stream_button"/> : null}
                    {showReplayButton ? <a onClick={() => this.showReplay()} className="replay_button"/> : null}
                    {showVideo ? <VideoPlayer videoUrl={videoUrl}/> : null}

                    <div
                        className="player_button red attack"
                        disabled={!!redAttack}
                        onClick={() => joinAs('attack', 'RED')}
                    >
                        {!!redAttack ? (
                            <React.Fragment>
                                <img
                                    alt=" "
                                    className="ava"
                                    src={
                                        redAttack.user.avatar
                                            ? redAttack.user.avatar
                                            : playerRedImg
                                    }
                                />
                                <span className="role_name">
                                    {redAttack.user.fullname}
                                </span>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <img
                                    alt=" "
                                    className="role-char"
                                    src={plusRedImg}
                                />
                                <span className="role_name">
                                    attack
                                </span>
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
                                <img
                                    alt=" "
                                    className="ava"
                                    src={
                                        redDef.user.avatar
                                            ? redDef.user.avatar
                                            : playerRedImg
                                    }
                                />
                                <span className="role_name">
                                    {redDef.user.fullname}
                                </span>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <span className="role_name">
                                    defense
                                </span>
                                <img
                                    alt=" "
                                    className="role-char"
                                    src={plusRedImg}
                                />
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
                                <img
                                    alt=" "
                                    className="ava"
                                    src={
                                        blackAttack.user.avatar
                                            ? blackAttack.user.avatar
                                            : playerImg
                                    }
                                />
                                <span className="role_name">
                                    {blackAttack.user.fullname}
                                </span>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <img
                                    alt=" "
                                    className="role-char"
                                    src={plusImg}
                                />
                                <span className="role_name">
                                    attack
                                </span>
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
                                <img
                                    alt=" "
                                    className="ava"
                                    src={
                                        blackDef.user.avatar
                                            ? blackDef.user.avatar
                                            : playerImg
                                    }
                                />
                                <span className="role_name">
                                    {blackDef.user.fullname}
                                </span>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <span className="role_name">
                                    defense
                                </span>
                                <img
                                    alt=" "
                                    className="role-char"
                                    src={plusImg}
                                />
                            </React.Fragment>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default Game;
