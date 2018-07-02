import React, { Component } from 'react';
import GameResults from '../GameResults';
import AnimatedNumber from '../AnimatedNumber';
import { shuffle } from '../../utils/generic';
import './style.css';

const START_SEC = 100;
const START = 'START';
const PLAYING = 'PLAYING';
const RESULTS = 'RESULTS';
const LEVELS = 'LEVELS';

class Game extends Component {
    state = {
        countdown: START_SEC,
        phrases: [],
        index: 0,
        status: START,
    }

    updateGame(vocabularyId, answerPhrases) {
        const {
            updateGame,
        } = this.props;
        const words = answerPhrases.reduce((acc, phrase) => {
            acc[phrase.id] = phrase.isCorrect;
            return acc;
        }, {});
        updateGame(vocabularyId, words);
    }

    renderGame() {
        const {
            countdown,
            phrases,
            index,
            status,
        } = this.state;
        const {
            vocabulary,
            additionalScore,
            deletePhrase,
            onEditClick,
        } = this.props;

        if ([START, LEVELS].indexOf(status) !== -1) {
            return null;
        }

        const answerPhrases = phrases.filter(phrase => phrase.isCorrect !== undefined);

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
                        this.updateGame(vocabulary.id, phrases);
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
            const correctAnswers = answerPhrases.reduce((acc, phrase) => {
                return phrase.isCorrect ? acc + 1 : acc;
            }, 0);
            return (
                <GameResults
                    vocabulary={vocabulary}
                    correctAnswers={correctAnswers}
                    phrases={phrases}
                    answerPhrases={answerPhrases}
                    additionalScore={additionalScore}
                    deletePhrase={deletePhrase}
                    onEditClick={onEditClick}
                    onClose={() => {
                        this.setState({
                            status: START,
                        });
                    }}
                />
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
                        <circle r="18" cx="20" cy="20" />
                    </svg>
                </div>
                <div
                    className=""
                >
                  {answerPhrases.length}/{phrases.length}
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

    renderGameInfo() {
        const {
            vocabulary,
            navigate,
            gamePhrases,
            validPhrases,
            totalNumberOfLevels,
            currentLevel,
            gameScore,
        } = this.props;
        const {
            status,
            phrases,
        } = this.state;

        if ([PLAYING, LEVELS, RESULTS].indexOf(status) !== -1) {
            return null;
        }

        return (
            <div className="game__start-header">
                <div className="game__start-header-left">
                    <button
                        className="game__back-button"
                        onClick={()=> {
                            navigate(`/vocabulary/${vocabulary.id}`);
                        }}
                    >
                        Back to vocabulary
                    </button>
                </div>
                <div className="game__start-header-right">
                    <div>Current Level: {currentLevel} / {totalNumberOfLevels}</div>
                    <div>Current phrases: {gamePhrases.length}</div>
                    <div>Locked phrases: {validPhrases.length - gamePhrases.length}</div>
                    {phrases.length ? (

                        <div>Score: <AnimatedNumber value={gameScore} /></div>
                    ) : (
                        <div>Score: {gameScore}</div>
                    )}
                </div>
            </div>
        );
    }

    renderPlayButton() {
        const {
            vocabulary,
            gamePhrases,
            phrasesPerRound,
        } = this.props;

        const {
            phrases,
        } = this.state;

        return (
            <button
                className="game__play"
                onClick={() => {
                    const numberOfGamePhrases = gamePhrases.length > phrasesPerRound ? phrasesPerRound : gamePhrases.length;
                    const weakPhrases = Math.round((numberOfGamePhrases * 25) / 100);
                    const shuffledGamePhrases = shuffle([].concat(
                        gamePhrases.slice(0, weakPhrases),
                        gamePhrases.slice(weakPhrases, gamePhrases.length).slice(0, numberOfGamePhrases - weakPhrases),
                    ));

                    this.setState({
                        phrases: shuffledGamePhrases.map((phrase, index) => {
                            const getOptions = () => {
                                const wrongPhrases = shuffle(gamePhrases
                                    .filter(p => p.id !== phrase.id))
                                    .sort((a, b) => b.translationFromType === 'vtr' ? 1 : -1)
                                    .slice(0, 3);
                                return shuffle([].concat(wrongPhrases, shuffledGamePhrases[index]));
                            };

                            const options = getOptions();
                            return {
                                ...phrase,
                                options,
                                isCorrect: undefined,
                            }
                        }),
                        status: PLAYING,
                    });

                    this.interval = setInterval(() => {
                        const isPlaying = this.state.countdown !== 1;
                        if (!isPlaying) {
                            clearInterval(this.interval);
                            this.updateGame(vocabulary.id, phrases);
                        }

                        this.setState({
                            countdown: isPlaying ? this.state.countdown - 1 : START_SEC,
                            index: isPlaying ? this.state.index : 0,
                            status: isPlaying ? PLAYING : RESULTS,
                        });
                    }, 1000);

                }}
            >
                Play
            </button>
        );
    }

    renderCurrentLevel() {
        const {
            currentLevel,
        } = this.props;
        const {
            status,
        } = this.state;

        if ([PLAYING, LEVELS, RESULTS].indexOf(status) !== -1) {
            return null;
        }

        return (
            <div className="game__current-level">
                <div
                    className="game__current-level-label"
                    onClick={()=> {
                        this.setState({
                            status: LEVELS,
                        });
                    }}
                >
                    Level
                </div>
                <div
                    className="game__current-level-number"
                    onClick={()=> {
                        this.setState({
                            status: LEVELS,
                        });
                    }}
                >
                    {currentLevel}
                </div>
                {this.renderPlayButton()}
            </div>
        );
    }

    renderGameStatus() {
        const {
            gameStatus,
        } = this.props;

        if (gameStatus === 'CURRENT_LEVEL') {
            return null;
        }

        const messages = {
            'FIRST_TIME': 'First Time!',
            'NEXT_LEVEL': 'LEVEL UP!',
        };

        return (
            <div className="game__new-status">
                {messages[gameStatus]}
            </div>
        );
    }

    render() {
        const {
            vocabulary,
            levels,
        } = this.props;

        if (!vocabulary) {
            return null;
        }

        const {
            status,
        } = this.state;

        return (
            <div className="game">
                {this.renderGameInfo()}
                {this.renderGameStatus()}
                {this.renderCurrentLevel()}
                {[LEVELS].indexOf(status) !== -1 && (
                    <div
                        className="game__levels"
                    >
                        <div
                            className="game__levels-list"
                        >
                            {levels.map(level => (
                                <div
                                    key={level.number}
                                    className="game__level"
                                >
                                    <div
                                        className="game__level-title"
                                    >
                                        Level: {level.number}
                                    </div>
                                    <div
                                        className="game__level-score"
                                    >
                                        Score: {level.score}+
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div
                            className="game__levels-footer"
                        >
                            <button
                                className="game__back-button"
                                onClick={()=> {
                                    this.setState({
                                        status: START,
                                    });
                                }}
                            >
                                CLOSE
                            </button>
                        </div>
                    </div>
                )}
                {this.renderGame()}
            </div>
        );
    }
}

export default Game;
