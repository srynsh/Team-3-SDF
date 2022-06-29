import React, { Component } from "react";

class SideBar extends Component {
  state = {};

  render() {
    return (
      <div className = 'sidebar'>
        <h4>Options</h4>
            <a href="#home">Home</a>
            <a href="#news">News</a>
            <a href="#contact">Contact</a>
            <a href="#about">About</a>
      </div>
    );
  }
}

export default SideBar;
