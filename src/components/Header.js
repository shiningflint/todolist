import React, { Component } from 'react';

class Header extends Component {
  render() {
    return(
      <div className="header-wrap">
        <p className="header-txt">
          <span className="header-day">Fri.</span>
          <span className="header-date">2017.05.03</span>
        </p>
      </div>
    )
  }
}

export default Header
