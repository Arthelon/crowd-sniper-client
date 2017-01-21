import React from 'react';

class Navbar extends React.Component {

    handleNavbarClick = (path) => () => {
        this.context.router.push(path);
    };

    render() {
        return (
          <nav className="pt-navbar" style={{ zIndex: 1000}}>
              <div className="pt-navbar-group pt-align-left">
                  <div className="pt-navbar-heading">CrowdSniper</div>
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

