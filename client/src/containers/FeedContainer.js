import React from 'react';
import axios from 'axios';
import { API_URL } from '../constants';
import { FEED_EVENTS } from '../../../constants';
import FeedDetails from '../components/feed/FeedDetails';
import RiskSlider from '../components/feed/RiskSlider';
import FeedVideo from '../components/feed/FeedVideo';
import io from '../io';

class FeedContainer extends React.Component {

    state = {
        isLoading: true,
        feed: {}
    };

    componentDidMount() {
        io.on(FEED_EVENTS.update, this.handleUpdate);
        axios.get(`${API_URL}/feeds/${this.props.params.id}`)
            .then((resp) => {
                const { data } = resp.data;
                this.setState({
                    feed: data,
                    isLoading: false,
                })
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    isLoading: false
                })
            })
    }

    handleUpdate = (feed) => {
        feed = JSON.parse(feed);
        if (feed.id === this.state.feed.id) {
            this.setState({
                feed,
            })
        }
    };

    render() {
        const { feed } = this.state;

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    padding: '2em 3em'
                }}
            >
                <FeedDetails
                    {...feed}
                />
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '65%',
                        padding: '1em 3em'
                    }}
                >
                    <RiskSlider
                        risk={feed.risk}
                    />
                    <FeedVideo
                        url={feed.video}
                    />
                </div>
            </div>
        );
    }
}

export default FeedContainer;