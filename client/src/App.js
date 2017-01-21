import React, { Component } from 'react';
import Navbar from './components/navbar';

class App extends Component {

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
