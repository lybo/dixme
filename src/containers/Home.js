import React from 'react';
import { connect } from 'react-redux';
import VocabularyForm from '../components/VocabularyForm';
import Vocabularies from '../components/Vocabularies';
import ImportVocabularyForm from '../components/ImportVocabularyForm';
import {
    requestAddVocabulary,
} from '../actions/vocabulary';

function Home ({
    navigate,
    vocabularies,
    addVocabulary,
}) {
    return (
        <div>
            <VocabularyForm
                vocabulary={{}}
                onSubmit={addVocabulary}
            />
            <ImportVocabularyForm
                onChange={addVocabulary}
            />
            <Vocabularies
                vocabularies={vocabularies}
                setVocabularySelected={(vocabularyId) => {
                    navigate(`/vocabulary/${vocabularyId}`)
                }}
            />
        </div>
    );
}

export default connect(
    (state, ownProps) => {
        return {
            vocabularies: state.vocabularies,
        };
    },
    (dispatch, ownProps) => {
        const navigate = ownProps.history.push;
        return {
            navigate,
            addVocabulary: (data) => {
                dispatch(requestAddVocabulary(data));
            },
        };
    },
)(Home);
