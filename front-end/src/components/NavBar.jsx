import React, { Component } from 'react';

class NavBar extends Component {
    state = {}

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark">
                <a className="navbar-brand fw-bold fs-2" href="#">Covid Management System</a>
                
                <div className="collapse navbar-collapse d-flex flex-row-reverse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item fs-4">
                            <a className="nav-link text-end" href="#Home">Home</a>
                        </li>
                        <li className="nav-item fs-4">
                            <a className="nav-link text-end" href="#Logout">Register</a>
                        </li>
                        <li className="nav-item fs-4">
                            <a className="nav-link text-end" href="#Logout">Sign In</a>
                        </li>
                        <li className="nav-item fs-4">
                            <a className="nav-link text-end" href="#FAQ">FAQ</a>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default NavBar;