import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './App'
import IndexContainer from './containers/IndexContainer'
import MapContainer from './containers/MapContainer';
import FeedContainer from './containers/FeedContainer';

export default function getRoutes() {

    return (
        <Route path="/" component={App}>
            <IndexRoute component={IndexContainer}/>
            <Route path="/map" component={MapContainer}/>
            <Route path="/feeds/:id" component={FeedContainer}/>
        </Route>
    )
}