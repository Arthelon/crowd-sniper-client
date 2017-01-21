import React, { Component } from 'react'
import { API_URL, RISK_THRESHOLD } from '../constants';
import FeedList from '../components/dashboard/FeedList';
import axios from 'axios';
import { FEED_EVENTS } from '../../../constants';
import socket from '../io';
import _findIndex from 'lodash.findindex';
import update from 'immutability-helper';

const replaceAtIndex = (arr, index, data) => update(arr, {
    [index]: {
        $set: data
    }
});


export default class IndexContainer extends Component {

    state = {
        isLoading: true,
        feeds: [],
        riskFeeds: []
    };

    componentDidMount() {
        socket.on(FEED_EVENTS.delete, this.handleDelete);
        socket.on(FEED_EVENTS.insert, this.handleInsert);
        socket.on(FEED_EVENTS.update, this.handleUpdate);
        axios.get(`${API_URL}/feeds`)
        .then((resp) => {
            const { data } = resp.data;
            const feeds = [];
            const riskFeeds = [];
            data.forEach((feed) => {
                if (typeof feed.risk === 'undefined' || feed.risk < RISK_THRESHOLD) {
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

    handleDelete = (feed) => {
        console.log(feed);
    };

    handleUpdate = (feed) => {
        feed = JSON.parse(feed);
        let field = 'feeds';
        let index = _findIndex(this.state.feeds, (f) => f.id === feed.id);
        if (index === -1) {
            index = _findIndex(this.state.riskFeeds, (f) => f.id === feed.id);
            if (index === -1) {
                console.log(`Invalid feed ID: ${feed.id}`)
                return;
            } else {
                field = 'riskFeeds';
            }
        }
        const oldRiskBool = this.state[field][index].risk >= RISK_THRESHOLD;
        if (oldRiskBool !== feed.risk >= RISK_THRESHOLD) {
            const newField = field === 'feeds' ? 'riskFeeds' : 'feeds';
            this.setState(update(this.state, {
                [field]: {
                    $splice: [[index, 1]]
                },
                [newField]: {
                    $push: [feed]
                }
            }));
        } else {
            this.setState({
                [field]: replaceAtIndex(this.state[field], index, feed),
            });
        }
    };

    handleInsert = (feed) => {
        feed = JSON.parse(feed);
        let field = 'feeds';
        if (feed.risk >= RISK_THRESHOLD) {
            field = 'riskFeeds';
        }
        this.setState(update(this.state, {
           [field]: {
               $push: [feed]
           }
        }));
    };

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