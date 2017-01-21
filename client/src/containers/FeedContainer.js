import React from 'react';
import axios from 'axios';
import { API_URL } from '../constants';
import FeedDetails from '../components/feed/FeedDetails';

class FeedContainer extends React.Component {

    state = {
        isLoading: true,
        feed: {}
    };

    componentDidMount() {
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

    render() {
        const { feed } = this.state;

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    margin: '2em 3em'
                }}
            >
                <FeedDetails
                    {...feed}
                />
            </div>
        );
    }
}

export default FeedContainer;