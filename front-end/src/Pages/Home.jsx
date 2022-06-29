import React, { Component } from "react";
import NavBar from "../Components/NavBar";
import SideBar from "../Components/SideBar";
import './Home.css';

class Home extends Component {
  state = {};

  render() {
    return (
      <div className='home'>
        <NavBar/>
        <div className='main'>
          <SideBar/>
          <div className="content">
            <h3>Some Latin Nonsense</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
