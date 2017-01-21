import React from 'react';
import ReactPlayer from 'react-player';
import { API_URL } from '../../constants';
import axios from 'axios';

class FeedVideo extends React.Component {

    handleProgress = () => {
        const { id } = this.props;
        axios.put(`${API_URL}/feeds/ts/${id}`, {})
            .catch((err) => {
                console.log(err);
            })
    }

    render() {
        const { url } = this.props;

        return (
            <ReactPlayer
                playing
                loop
                url={url}
                style={{marginTop: '2em'}}
                onProgress={this.handleProgress}
            />
        )
    }
}
FeedVideo.propTypes = {
    url: React.PropTypes.string,
    id: React.PropTypes.string,
    updateRisk: React.PropTypes.func.isRequired,
};

export default FeedVideo;