import React, { Component } from 'react'
import { API_URL } from '../constants';
import FeedList from '../components/dashboard/FeedList';
import axios from 'axios';
import { FEED_EVENTS } from '../../../constants';
import socket from '../io';
import * as _ from 'lodash';
import update from 'immutability-helper';
import { Spinner } from '@blueprintjs/core';

const sortedInsert = (arr, feed) => _.reverse(_.sortBy(_.concat(arr, feed), (feed) => feed.risk));

const sortedInsertAndSplice = (arr, feed) => {
    const newArr = arr.filter((f) => f.id !== feed.id);
    return sortedInsert(newArr, feed)
};


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
            data.forEach((feed) =>  {
                axios.put(`${API_URL}/feeds/ts/${feed.id}?new=true`, {})
                    .catch(console.log)
            })
            this.interval = setInterval(() => {
                data.forEach((feed) =>  {
                    axios.put(`${API_URL}/feeds/ts/${feed.id}`, {})
                        .catch(console.log)
                })
            }, 1000);
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
                riskFeeds,
                isLoading: false,
            });

        })
        .catch((err) => {
            console.log(err);
            this.setState({
                isLoading: false,
            })
        })
    }

    componentWillUnmount() {
        socket.removeListener(FEED_EVENTS.update);
        socket.removeListener(FEED_EVENTS.delete);
        socket.removeListener(FEED_EVENTS.insert);
        clearInterval(this.interval);
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
        if (newField !== field) {
            this.setState(update(this.state, {
                [field]: {
                    $splice: [[index, 1]]
                },
                [newField]: {
                    $set: sortedInsert(this.state[newField], feed)
                }
            }));
        } else {
            console.log(sortedInsertAndSplice(this.state[field], feed));
            this.setState({
                [field]: sortedInsertAndSplice(this.state[field], feed)
            });
        }
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
        const { feeds, riskFeeds, isLoading } = this.state;

        return (
            <div
                style={{ textAlign: 'center' }}
            >
                {isLoading ?
                    <Spinner className="pt-large" style={{ top: '2em' }} /> :
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
                }
            </div>
        )
    }
}