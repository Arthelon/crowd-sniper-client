import React, { Component } from 'react';
import Navbar from './components/navbar';
import { FEED_EVENTS } from '../../constants';
import { RISK_THRESHOLD } from './constants';
import { Toaster, Position, Intent } from '@blueprintjs/core'
import io from './io';


class App extends Component {

    componentDidMount() {
        io.on(FEED_EVENTS.update, this.handleUpdate);
    }

    handleUpdate = (feed) => {
        feed = JSON.parse(feed);
        if (feed.risk >= RISK_THRESHOLD) {
            const toast = Toaster.create({
                position: Position.TOP,
            });
            toast.show({
                message: `Warning, high probability of violence in ${feed.name}`,
                intent: Intent.DANGER
            })
        }
    };

    render() {
        return (
            <div>
                <Navbar />
                {this.props.children}
            </div>
        );
    }
}

export default App;
