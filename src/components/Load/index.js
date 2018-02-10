import React, { Component } from 'react';
import './style.css';

class Load extends Component {
    // isEmerging = false
    state = {
       isVisible: false,
    }


    componentWillReceiveProps(nextProps) {
        const {
            timeout,
            isVisible,
        } = this.props;

        if (nextProps.isVisible === isVisible) {
            return;
        }

        if (nextProps.isVisible) {
            this.timer = setTimeout(() => {
                this.setState({
                    isVisible: true,
                });
            }, timeout);
        } else {
            this.timer && clearTimeout(this.timer);
            this.setState({
                isVisible: false,
            });
        }
    }

    render() {
        const {
            label,
        } = this.props;

        const {
            isVisible,
        } = this.state;

        if (!isVisible) {
            return null;
        }

        return (
            <div className="load">
                <div className="spinner" />
                <div className="load__label">{label}</div>
            </div>
        );
    }
}

export default Load;
