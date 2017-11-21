import React, { Component } from 'react';
const days = ['日','月','火','水','木','金','土'];

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
    };
  }

  render() {
    const today = this.state.date;
    return(
      <div className="header-wrap">
        <p className="header-txt">
          <span className="header-day">{days[today.getDay()]}</span>
          <span className="header-date">
            {(today.getFullYear()+"."+
            (today.getMonth()+1)+"."+
            today.getDate())}
          </span>
        </p>
      </div>
    )
  }
}

export default Header
