import React, { Component } from 'react';
import Navbar from './components/navbar';
import { FEED_EVENTS } from '../../constants';
import { RISK_THRESHOLD } from './constants';
import { Toaster, Position, Intent } from '@blueprintjs/core'
import io from './io';
import * as _ from 'lodash';
import './styles.css'


class App extends Component {

    componentDidMount() {
        io.on(FEED_EVENTS.update, _.throttle(this.handleUpdate.bind(this), 5000));
    }

    handleUpdate = (feed) => {
        feed = JSON.parse(feed);
        const toast = Toaster.create({
            inline: true,
            position: Position.TOP,
        });
        toast.show({
            message: `Warning, high probability of violence in ${feed.name}`,
            intent: Intent.DANGER,
            timeout: 4000
        });
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
