import React from 'react';
import ReactPlayer from 'react-player';

class FeedVideo extends React.Component {

    handleEnded = () => {
        console.log('ended');
    }

    render() {
        const { url } = this.props;

        return (
            <ReactPlayer
                playing
                loop
                url={url}
                onEnded={this.handleEnded}
            />
        )
    }
}
FeedVideo.propTypes = {
    url: React.PropTypes.string,
};

export default FeedVideo;