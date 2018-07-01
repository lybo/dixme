import React, { Component } from 'react';
import './style.css';

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

class AnimatedNumber extends Component {
    constructor(props) {
        super(props);
        const values = parseInt(props.value, 10).toString();

        this.state = {
            values: [...Array(values.length).keys()].map((i) => {
                return [].concat(
                    shuffle([...Array(9).keys()]),
                    shuffle([...Array(9).keys()]),
                    values[i],
                );
            }),
            index: 0,
        };
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            if (this.state.index === 18) {
                clearInterval(this.interval);
                return;
            }
            this.setState({
                index: this.state.index + 1,
            });
        }, 70);
    }

    componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    render() {
        const {
            values,
            index,
        } = this.state;

        return (
            <span className="counter">
                {values.map((value, i) => (
                    <span className="counter__digit" key={i}>{value[index]}</span>
                ))}
            </span>
        );
    }
}

export default AnimatedNumber;
