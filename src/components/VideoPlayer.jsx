import React, { Component } from 'react';
import ReactPlayer from 'react-player';

class VideoPlayer extends Component {
    render() {
        const { gameId, goalId } = this.props;
        const replayUrl =
            gameId && gameId
                ? `http://www.130.lan:8888/${gameId}/${goalId}.mp4`
                : 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
        return <ReactPlayer url={replayUrl} playing />;
    }
}

export default VideoPlayer;