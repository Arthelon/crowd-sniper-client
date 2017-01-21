import React from 'react';
import ReactPlayer from 'react-player';
import { API_URL } from '../../constants';
import axios from 'axios';

class FeedVideo extends React.Component {

    handleProgress = () => {
        const { updateRisk, id } = this.props;
        axios.get(`${API_URL}/feeds/ts/${id}`)
            .then((resp) => {
                const { data } = resp.data;
                updateRisk(data);
            })
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