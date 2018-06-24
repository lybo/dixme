import React, { Component } from 'react';
import './style.css';

const START_SEC = 90;
const removeItemByIndex = (array, index) => {
    return [].concat(array.slice(0, index), array.slice(index + 1, array.length));
};
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

const START = 'START';
const PLAYING = 'PLAYING';
const RESULTS = 'RESULTS';

class Game extends Component {
    state = {
        countdown: START_SEC,
        phrases: [],
        index: 0,
        status: START,
    }

    renderGame() {
        const {
            countdown,
            phrases,
            index,
            status,
        } = this.state;

        if (status === START) {
            return null;
        }

        const renderOption = phrase => (
            <button
                className="game__option"
                key={phrase.id}
                onClick={() => {
                    const isCorrect = phrases[index].translationTo === phrase.translationTo;
                    phrases[index].isCorrect = isCorrect;
                    const isPlaying = index + 1 !== phrases.length;
                    if (!isPlaying) {
                        clearInterval(this.interval);
                    }

                    this.setState({
                        index: isPlaying ? index + 1 : 0,
                        status: isPlaying ? PLAYING : RESULTS,
                        phrases,
                    });
                }}
            >
                {phrase.translationTo}
            </button>
        );

        if (status === RESULTS) {
            const correctAnswers = phrases.reduce((acc, phrase) => {
                return phrase.isCorrect ? acc + 1 : acc;
            }, 0);
            return (
                <div>
                        <div
                            className="game__results-score"
                        >
                            {correctAnswers}/{phrases.length} ({Math.round((correctAnswers * 100) / phrases.length)}%)
                        </div>
                    {phrases.map(phrase => (
                        <div
                            key={phrase.id}
                            className="game__results-phrase"
                        >
                            {phrase.translationFrom}
                            -
                            {phrase.translationTo}
                            :
                            {phrase.isCorrect ? (
                                <i className="fa fa-thumbs-up" />
                            ) : (
                                <i className="fa fa-thumbs-down" />
                            )}
                        </div>
                    ))}
                </div>
            );
        }

        return (
            <div
                className="game__game"
            >
                <div className="game__countdown">
                    <div className="game__countdown-number">
                        {countdown}
                    </div>
                    <svg>
                        <circle r="18" cx="20" cy="20"></circle>
                    </svg>
                </div>
                <div
                    className="game__word"
                >
                    {phrases[index].translationFrom}
                </div>
                <div
                    className="game__options"
                >
                    {phrases[index].options.map(renderOption)}
                </div>
            </div>
        );
    }

    render() {
        const {
            vocabulary,
        } = this.props;

        if (!vocabulary) {
            return null;
        }

        const {
            phrases,
            status,
        } = this.state;

        return (
            <div className="game">
                {[START, RESULTS].indexOf(status) !== -1 && (
                    <button
                        className="game__play"
                        onClick={() => {
                            const phrases = shuffle(vocabulary.phrases.filter(phrase => {
                                return phrase.translationTo && phrase.translationFrom;
                            }));
                            this.setState({
                                phrases: phrases.map((phrase, index) => {
                                    const getOptions = () => {
                                        const wrongPhrases = shuffle(removeItemByIndex(phrases, index)).slice(0, 3);
                                        return shuffle([].concat(wrongPhrases, phrases[index]));
                                    };

                                    const options = getOptions();
                                    return {
                                        ...phrase,
                                        options,
                                        isCorrect: false,
                                    }
                                }),
                                status: PLAYING,
                            });

                            this.interval = setInterval(() => {
                                const isPlaying = this.state.countdown !== 1;
                                if (!isPlaying) {
                                    clearInterval(this.interval);
                                }

                                this.setState({
                                    countdown: isPlaying ? this.state.countdown - 1 : START_SEC,
                                    index: isPlaying ? this.state.index : 0,
                                    status: isPlaying ? PLAYING : RESULTS,
                                });
                            }, 1000);

                        }}
                    >
                        {phrases.length > 0 ? 'Play Again' : 'Play'}
                    </button>
                )}
                {this.renderGame()}
            </div>
        );
    }
}

export default Game;
