import { connect } from 'react-redux';
import Game from '../components/Game/';
// import { getPhraseModel } from '../reducers/phrase';
import {
    requestDeletePhrase,
} from '../actions/vocabulary';
import {
    updateGame,
} from '../actions/game';
import {
    setSelectedPhrase,
} from '../actions/app';


let oldGameScore = 0;
const MINIMUM_ATTEMPTS = 20; // 20
const MINIMUM_SCORE_PHRASE = 80; // 80
const DEFAULT_NUMBER_OF_LEVEL_PHRASES = 30; // 30
const phrasesPerRound = 30; // 25

export default connect(
    (state, ownProps) => {
        const vocabulary = state.vocabularies.find(v => v.id === ownProps.match.params.vocabularyId);
        const game = vocabulary && vocabulary.id && state.game[vocabulary.id] ? state.game[vocabulary.id] : {};

        const validPhrases = (vocabulary ? vocabulary.phrases : [])
            .filter(phrase => {
                return phrase.translationTo && phrase.translationFrom;
            })
            .map(phrase => {
                const {
                    numberOfAnswers = 0,
                    wrongAnswers = 0,
                } = game[phrase.id] || {};
                const correctAnswers = numberOfAnswers - wrongAnswers;
                const numberOfMinimumAnswers = numberOfAnswers < MINIMUM_ATTEMPTS ? MINIMUM_ATTEMPTS : numberOfAnswers;
                const score = Math.round((correctAnswers * 100) / numberOfMinimumAnswers);
                return {
                    ...phrase,
                    score,
                }
            })
            .reverse();

        const gameData = Object.keys(game).reduce((acc, phraseId) => {
            const {
                numberOfAnswers,
                wrongAnswers,
            } = game[phraseId];
            const correctAnswers = numberOfAnswers - wrongAnswers;
            const numberOfMinimumAnswers = numberOfAnswers < MINIMUM_ATTEMPTS ? MINIMUM_ATTEMPTS : numberOfAnswers;
            const score = Math.round((correctAnswers * 100) / numberOfMinimumAnswers);

            if (score < MINIMUM_SCORE_PHRASE) {
                acc.notQualified = [].concat(acc.notQualified, phraseId);
                acc.score = acc.score + score;
                return acc;
            }

            acc.qualified = [].concat(acc.qualified, phraseId);
            acc.score = acc.score + MINIMUM_SCORE_PHRASE;
            return acc;
        }, { qualified: [], notQualified: [], score: 0 });
        const allAnsweredPhraseIds = [].concat(gameData.qualified, gameData.notQualified);

        const getLevelNumberOfPhrases = () => {
            if (validPhrases.length - DEFAULT_NUMBER_OF_LEVEL_PHRASES <= 0) {
                return validPhrases.length;
            }

            return DEFAULT_NUMBER_OF_LEVEL_PHRASES;
        };
        const numberOfLevelPhrases = getLevelNumberOfPhrases();
        const getPlayStatus = () => {
            if (!allAnsweredPhraseIds.length) {
                return 'FIRST_TIME';
            }

            if (gameData.qualified.length === allAnsweredPhraseIds.length) {
                return 'NEXT_LEVEL';
            }

            return 'CURRENT_LEVEL';
        };
        const gameStatus = getPlayStatus();
        const getPlayablePhrases = () => {
            if (gameStatus === 'FIRST_TIME') {
                return validPhrases.slice(0, numberOfLevelPhrases);
            }

            if (gameStatus === 'NEXT_LEVEL') {
                return validPhrases
                    .filter(phrase => {
                        return !allAnsweredPhraseIds.includes(phrase.id);
                    })
                    .slice(0, numberOfLevelPhrases)
                    .concat(validPhrases.filter(phrase => {
                        return allAnsweredPhraseIds.includes(phrase.id);
                    }))
                    .sort((a, b) => a.score - b.score);
            }

            return validPhrases
                .filter(phrase => {
                    return allAnsweredPhraseIds.includes(phrase.id);
                })
                .sort((a, b) => a.score - b.score);
        };

        const gamePhrases = getPlayablePhrases();
        const totalNumberOfLevels = Math.round(validPhrases.length / numberOfLevelPhrases) || 0;

        const additionalScore = oldGameScore ? gameData.score - oldGameScore : 0;
        oldGameScore = gameData.score;

        return {
            vocabulary,
            validPhrases,
            gamePhrases,
            gameStatus,
            totalNumberOfLevels,
            additionalScore,
            phrasesPerRound,
            gameScore: gameData.score,
            currentLevel: Math.round(gamePhrases.length / numberOfLevelPhrases),
            levels: [...Array(totalNumberOfLevels).keys()].map((i) => {
                if (totalNumberOfLevels === 1) {
                    return {
                        number: i + 1,
                        score: numberOfLevelPhrases * 80,
                    };
                }

                if (totalNumberOfLevels === i + 1) {
                    return {
                        number: i + 1,
                        score: ((i + 1) * DEFAULT_NUMBER_OF_LEVEL_PHRASES * 80) + (gamePhrases.length * 80),
                    };
                }

                return {
                    number: i + 1,
                    score: (i + 1) * DEFAULT_NUMBER_OF_LEVEL_PHRASES * 80,
                };
            }),
        };
    },
    (dispatch, ownProps) => {
        const navigate = ownProps.history.push;
        return {
            navigate,
            deletePhrase: (data) => {
                dispatch(requestDeletePhrase(data));
            },
            onEditClick: (selectedPhrase) => {
                dispatch(setSelectedPhrase(selectedPhrase));
                navigate(`/vocabulary/${ownProps.match.params.vocabularyId}/phrase/${selectedPhrase.id}/null`);
            },
            updateGame: (vocabularyId, words) => {
                dispatch(updateGame({ vocabularyId, words}));
            },
        };
    },
)(Game);

