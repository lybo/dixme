import React, { Component } from 'react';
import logo from './logo.svg';
import './style.css';

class Layout extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">diXme</h1>
                </header>
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Layout;
