import React, { Component }  from 'react';
import ReactPlayer from 'react-player';

class VideoStream extends Component {
    render () {
        return <ReactPlayer url={`http://www.130.lan:8888/${this.props.gameId}/${this.props.goalId}.mp4`} playing />
    }
}

export default VideoStream;
