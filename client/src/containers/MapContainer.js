import React, { Component } from 'react'
import { API_URL } from '../constants';
import axios from 'axios';
import { FEED_EVENTS } from '../../../constants';
import socket from '../io';
import * as _ from 'lodash';
import Map from '../components/map';

const sortedInsert = (arr, feed) => _.reverse(_.sortBy(_.concat(arr, feed), (feed) => feed.risk))

const sortedInsertAndSplice = (arr, feed) => {
    const newArr = arr.filter((f) => f.id !== feed.id);
    return sortedInsert(newArr, feed)
};

export default class MapContainer extends Component {

    state = {
        feeds: [],
    }

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
                this.setState({
                    feeds: data,
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
        clearInterval(this.interval);
    }

    handleDelete = (feed) => {
        console.log(feed);
    };

    handleUpdate = (feed) => {
        feed = JSON.parse(feed);
        let index = _.findIndex(this.state.feeds, (f) => f.id === feed.id);
        if (index === -1) {
            console.log(`Invalid feed ID: ${feed.id}`)
            return;
        }
        this.setState({
            feeds: sortedInsertAndSplice(this.state.feeds, feed)
        });
    };

    handleInsert = (feed) => {
        feed = JSON.parse(feed);

        this.setState({
            feeds: sortedInsert(this.state.feeds, feed)
        })
    };

    render() {
        return (
            <div
                style={{ margin: '2em 3em' }}
            >
                <Map
                    feeds={this.state.feeds}
                />
            </div>
        )
    }
}
