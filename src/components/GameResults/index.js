import React, { Component } from 'react';
import PhraseListItem from '../PhraseListItem';
import AnimatedNumber from '../AnimatedNumber';
import './style.css';

class GameResults extends Component {
    state = {
        wrongAnswers: false,
    }

    render() {
        const {
            vocabulary,
            correctAnswers,
            phrases,
            answerPhrases,
            additionalScore,
            deletePhrase,
            onEditClick,
            onClose,
        } = this.props;

        const {
            wrongAnswers,
        } = this.state;


        return (
            <div className="game-results">
                <div
                    className="game-results__score"
                >
                    {correctAnswers}/{phrases.length} ({Math.round((correctAnswers * 100) / phrases.length)}%)
                    <br />
                    Score: <AnimatedNumber value={additionalScore} />
                </div>
                <div className="game__buttons">
                    <button
                        className="game__back-button"
                        onClick={()=> {
                            onClose();
                        }}
                    >
                        Back
                    </button>
                    <button
                        className="game__back-button"
                        onClick={()=> {
                            this.setState({
                                wrongAnswers: !this.state.wrongAnswers,
                            });
                        }}
                    >
                        {this.state.wrongAnswers ?  'Show all' : 'Show only wrong Answers'}
                    </button>
                </div>
                <div
                    className="game-results__phrases"
                >
                    {answerPhrases.filter(phrase => wrongAnswers ? !phrase.isCorrect : true).map(phrase => (
                        <PhraseListItem
                            key={phrase.id}
                            vocabulary={vocabulary}
                            onDeleteClick={deletePhrase}
                            onEditClick={(phraseId) => {
                                onEditClick && onEditClick(vocabulary.phrases.find(phrase => phrase.id === phraseId));
                            }}
                            phrase={phrase}
                            lang={vocabulary.langFrom}
                            isCorrect={phrase.isCorrect}
                            isReferenceVisible={true}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

export default GameResults;
