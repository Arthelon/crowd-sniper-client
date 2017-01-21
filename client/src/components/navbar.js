import React from 'react';
import logo from '../logo.png';

class Navbar extends React.Component {

    handleNavbarClick = (path) => () => {
        this.context.router.push(path);
    };

    render() {
        return (
          <nav className="pt-navbar" style={{ zIndex: 1000}}>
              <div
                  style={{ cursor: 'pointer' }}
                  onClick={this.handleNavbarClick('/')}
                  className="pt-navbar-group pt-align-left">
                      <img
                          style={{ height: '60%' }}
                          src={logo}
                      />
                      <div
                          style={{ marginLeft: '0.5em' }}
                          className="pt-navbar-heading"
                      >
                          CrowdSniper
                      </div>
              </div>
              <div className="pt-navbar-group pt-align-right">
                  <button
                      onClick={this.handleNavbarClick('/')}
                      className="pt-button pt-minimal pt-icon-home"
                  >
                      Dashboard
                  </button>
                  <button
                      onClick={this.handleNavbarClick('/map')}
                      className="pt-button pt-minimal pt-icon-locate"
                  >
                      Map
                  </button>
              </div>
          </nav>
        );
    }
}
Navbar.contextTypes = {
    router: React.PropTypes.object,
};

export default Navbar;

