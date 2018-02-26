import React, { Component } from 'react';
// import logo from './logo.svg';
import logo from './dixme-logo.svg';
import './style.css';
import 'font-awesome/css/font-awesome.css';
import Notification from '../../containers/Notification';

class Layout extends Component {
    state = {
      displayImage: true,
    }

    handleLoginClick = () => {
        const {
            requestLogin,
        } = this.props;
        requestLogin();
    }

    handleLogoutClick = () => {
        const {
            logoutSuccess,
        } = this.props;
        logoutSuccess();
    }

    handleImageError = () => {
        this.setState({
            displayImage: false,
        });
    }

    render() {
        const {
            auth,
        } = this.props;
        const {
            displayImage,
        } = this.state;

        return (
            <div className="App">
                <header className="App__header">
                    <div className="App__header-left">
                        <div className="App__logo-container">
                            <img src={logo} className="App__logo" alt="logo" />
                        </div>
                    </div>
                    <div className="App__header-right">
                    {auth.isAuthenticated ? (
                        <div className="App__header-profile">
                            {displayImage ? (
                                <img
                                    src={auth.profile.picture}
                                    alt={auth.profile.nickname}
                                    className="App__header-profile-image"
                                    onError={this.handleImageError}
                                    ref={(image) => (this.image = image)}
                                />
                            ) : (
                                <span>{auth.profile.nickname}</span>
                            )}
                            <button onClick={this.handleLogoutClick}>
                                <span className="fa fa-power-off" />
                            </button>
                        </div>
                    ) : (
                        <button onClick={this.handleLoginClick}>
                            <span className="fa fa-sign-in" />
                        </button>
                    )}
                    </div>
                </header>
                <div>
                    {this.props.children}
                </div>
                <Notification />
            </div>
        );
    }
}

export default Layout;
