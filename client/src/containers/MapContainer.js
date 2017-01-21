import React, { Component } from 'react'
import { API_URL } from '../constants';
import axios from 'axios';
import { FEED_EVENTS } from '../../../constants';
import socket from '../io';
import * as _ from 'lodash';
import update from 'immutability-helper';
import Map from '../components/map';

const sortedInsert = (arr, feed) => _.reverse(_.sortBy(_.concat(arr, feed), (feed) => feed.risk))

export default class MapContainer extends Component {

    state = {
        feeds: [],
        riskFeeds: []
    }

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
                    if (feed.active) {
                        riskFeeds.push(feed);
                    } else {
                        feeds.push(feed)
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

    componentWillUnmount() {
        socket.removeListener(FEED_EVENTS.update);
        socket.removeListener(FEED_EVENTS.delete);
        socket.removeListener(FEED_EVENTS.insert);
    }

    handleDelete = (feed) => {
        console.log(feed);
    };

    handleUpdate = (feed) => {
        feed = JSON.parse(feed);
        let field = 'feeds';
        let index = _.findIndex(this.state.feeds, (f) => f.id === feed.id);
        if (index === -1) {
            index = _.findIndex(this.state.riskFeeds, (f) => f.id === feed.id);
            if (index === -1) {
                console.log(`Invalid feed ID: ${feed.id}`)
                return;
            } else {
                field = 'riskFeeds';
            }
        }
        const oldActive = this.state[field][index].active;
        let newField = field;
        if (oldActive !== feed.active) {
            newField = field === 'feeds' ? 'riskFeeds' : 'feeds';
        }
        this.setState(update(this.state, {
            [field]: {
                $splice: [[index, 1]]
            },
            [newField]: {
                $set: sortedInsert(this.state[newField], feed)
            }
        }));
    };

    handleInsert = (feed) => {
        feed = JSON.parse(feed);
        let field = 'feeds';
        if (!feed.active) {
            field = 'riskFeeds';
        }

        this.setState({
            [field]: sortedInsert(this.state[field], feed)
        })
    };

    render() {
        return (
            <div
                style={{ margin: '2em 3em' }}
            >
                <Map
                    feeds={this.state.riskFeeds}
                />
            </div>
        )
    }
}
