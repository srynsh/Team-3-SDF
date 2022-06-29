import React, { Component } from "react";
import NavBar from "../Components/NavBar";
import "./Home.css";

class HomeMain extends Component {
  state = {};

  render() {
    return (
      <div className="home-main">
        <NavBar />
        <div className="main">
          <div className="content" style={{ marginLeft: 0, width: "100%" }}>
            <div
              className="card text-center case-counter"
              style={{ marginLeft: "20%", marginRight: "20%", width: "60%" }}
            >
              <div className="card-header">
                <h2>CASES</h2>
              </div>
              <div className="card-body">
                <h5 className="card-title">Daily Cases</h5>
                <p className="card-text">
                  <span class="cases-box">Cases</span>
                  <span class="deaths-box">Deaths</span>
                </p>
              </div>
            </div>
          </div>

          
        </div>
      </div>
    );
  }
}

export default HomeMain;
