import React, { Component } from 'react'
import { API_URL, RISK_THRESHOLD } from '../constants';
import FeedList from '../components/dashboard/FeedList';
import axios from 'axios';

export default class IndexContainer extends Component {

    state = {
        isLoading: true,
        feeds: [],
        riskFeeds: []
    };

    componentDidMount() {
        axios.get(`${API_URL}/feeds`)
        .then((resp) => {
            const { data } = resp.data;
            const feeds = [];
            const riskFeeds = [];
            data.forEach((feed) => {
                if (!feed.risk || feed.risk < RISK_THRESHOLD) {
                    feeds.push(feed);
                } else {
                    riskFeeds.push(feed)
                }
            });
            this.setState({
                feeds,
                riskFeeds
            });
        })
        .catch((err) => {
            console.log(err);
        })
    }

    render() {
        const { feeds, riskFeeds } = this.state;

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}
            >
                <FeedList
                  feeds={feeds}
                />
                <FeedList
                    risk
                    feeds={riskFeeds}
                />
            </div>
        )
    }
}