import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './App'
import IndexContainer from './containers/IndexContainer'

export default function getRoutes() {

    return (
        <Route path="/" component={App}>
            <IndexRoute component={IndexContainer}/>
        </Route>
    )
}