import React, { Component } from 'react';
import ReactPlayer from 'react-player';

class VideoPlayer extends Component {
    render() {
        const { videoUrl } = this.props;

        const style = {
            position: 'absolute',
            // zIndex: -1
        };

        return <ReactPlayer style={style} url={videoUrl} playing loop controls />;
    }
}

export default VideoPlayer;
