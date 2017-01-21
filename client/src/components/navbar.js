import React from 'react';

class Navbar extends React.Component {

    render() {
        return (
          <nav className="pt-navbar">
              <div className="pt-navbar-group pt-align-left">
                  <div className="pt-navbar-heading">CrowdSniper</div>
              </div>
              <div className="pt-navbar-group pt-align-right">
                  <button className="pt-button pt-minimal pt-icon-home">Dashboard</button>
                  <button className="pt-button pt-minimal pt-icon-locate">Map</button>
              </div>
          </nav>
        );
    }
}

export default Navbar;

