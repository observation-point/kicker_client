import React, { Component } from 'react';
import ReactPlayer from 'react-player';

class VideoPlayer extends Component {
    render() {
        const { videoUrl } = this.props;

        const style = {
            position: 'absolute'
            // zIndex: -1
        };

        // const config = {
        //     file: {
        //         hlsOptions: {
        //             forceHLS: true,
        //             debug: false
        //         }
        //     }
        // };

        return (
            <ReactPlayer style={style} url={videoUrl} config={config} playing loop controls />
        );
    }
}

export default VideoPlayer;
