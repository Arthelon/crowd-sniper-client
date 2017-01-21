import React from 'react';
import axios from 'axios';
import { API_URL } from '../constants';


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
        return (
            <div
                style={{ display: 'flex', flexDirection: 'row' }}
            >
            </div>
        );
    }
}

export default FeedContainer;