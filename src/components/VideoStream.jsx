import React, { PureComponent }  from 'react';
import FlvJs from 'flv.js';

class VideoStream extends PureComponent {

    componentDidMount() {
        if (FlvJs.isSupported) {
            const videoElement = document.getElementById('videoElement');
            const flvPlayer = FlvJs.createPlayer({
                type: 'flv',
                url: 'http://www130.lan:8000/live/stream.flv'
            });
            flvPlayer.attachMediaElement(videoElement);
            flvPlayer.load();
            flvPlayer.play();
        }
    }

    render() {
        return <video id="videoElement" />;
    }
}

export default VideoStream;
