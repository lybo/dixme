import React from 'react';
import { connect } from 'react-redux';
import './style.css';
import {
  translate,
  getTranslationLangKeys,
  hasTranslationAPI,
} from '../../../services/translation/';
import DebounceTextInput from '../../../components/Form/DebounceTextInput';
import Fieldset from '../../../components/Fieldset';
import {
  requestAddPhrase,
  requestAddVocabularyAddPhrase,
  requestUpdatePhrase,
  requestDeletePhrase,
} from '../../../actions/vocabulary';

class PopupContent extends React.Component {
  state = {
    translationFrom: '',
    translationFromType: '',
    translationTo: '',
    translationReference: '',
    definition: '',
    definitionReference: '',
    translations: [],
    isLoading: false,
  }

  componentWillMount() {
    const {
      text,
      translationFrom,
      translationFromType,
      translationTo,
      translationReference,
      definition,
      definitionReference,
    } = this.props.selectedPhrase;
    this.setState({
      text,
      translationFrom,
      translationFromType,
      translationTo,
      translationReference,
      definition,
      definitionReference,
    });
    this.translate(text);
  }

  translate(text) {
    const {
      langFrom,
      langTo,
    } = this.getTranslationLangKeys();

    if (this.hasTranslationAPI()) {
      this.setState({
        isLoading: true,
      });

      translate(text, langFrom, langTo)
        .then(result => {
          this.updateTranslations(result);
        })
        .catch(console.log)
        .then(result => {
          this.setState({
            isLoading: false,
          });
        });
    }
  }

  getTranslationLangKeys() {
    return getTranslationLangKeys(this.props.vocabulary);
  }

  hasTranslationAPI() {
    const {
      langFrom,
      langTo,
    } = this.getTranslationLangKeys();
    return hasTranslationAPI({
      langFrom,
      langTo,
    });
  }

  updateTranslations(result) {
    if (!result.translations || !result.translations.length) {
      return [];
    }
    const translations = result.translations.reduce((acc, tran) => {
      return [].concat(acc, tran.translations);
    }, []);
    this.setState({
      translations,
    });
  }

  render() {
    const {
      selectedPhrase,
      addPhrase,
    } = this.props;
    const {
      translationFrom,
      translationFromType,
      translationTo,
      translationReference,
      definition,
      definitionReference,
      isLoading,
      translations,
    } = this.state;

    return (
      <div className="popup-content">
        <div className="popup-content__info">
          <Fieldset
            title="Info"
          >
            {selectedPhrase.text}
            {selectedPhrase.sourceReference ? (
              <div
                className="popup-content__reference"
                dangerouslySetInnerHTML={{__html: `... ${selectedPhrase.sourceReference} ...`}}
              />
            ) : null}
            <div>{translationFrom}</div>
            <div>{translationFromType}</div>
            <div>{translationTo}</div>
            <div>{translationReference}</div>
            <div>{definition}</div>
            <div>{definitionReference}</div>
            <button
              className="popup-content__translation-button"
              onClick={(e) => {
                e.preventDefault();
                addPhrase({
                  ...selectedPhrase,
                  translationFrom,
                  translationFromType,
                  translationTo: Array.isArray(translationTo) ? translationTo.join(', ') : translationTo,
                  translationReference,
                  definition,
                  definitionReference,
                });
              }}
            >
              {!selectedPhrase.id ? 'Add' : 'Update'}
            </button>
          </Fieldset>
        </div>
        <div className="popup-content__translations-container">
          <Fieldset
            title="Translations"
          >
            <div className="popup-content__translations-content">
              <div className="popup-content__translations-header">
                <DebounceTextInput
                  id="translationFrom"
                  label="Translation from"
                  debounceTimeout={1000}
                  inputRef={input => {
                    this.translationFrom = input;
                  }}
                  value={translationFrom}
                  onChange={event => {
                    this.setState({
                      ...this.state,
                      translationFrom: event.target.value,
                    });
                    this.translate(event.target.value);
                  }}
                />
                <br />
                {'Source: wordreference.com'}
              </div>
              <div className="popup-content__translations">
                {isLoading ? (
                  <span>Loading</span>
                ) : translations.map((translation, i) => {
                  return (
                    <div
                      key={i}
                      className="popup-content__translation"
                    >
                      <div
                        className="popup-content__translation-container"
                      >
                        <div
                          className="popup-content__translation-text"
                        >
                          {translation.from} ({translation.fromType}) - {translation.to}
                        </div>
                        <div
                          className="popup-content__translation-text"
                        >
                          {translation.definition}
                        </div>
                      </div>
                      <div className="popup-content__translation-buttons">
                        <button
                          className="popup-content__translation-button"
                          onClick={(e) => {
                            e.preventDefault();
                            this.setState({
                              translationFrom: translation.from,
                              translationFromType: translation.fromType,
                              translationTo: translation.to.split(',').map(word => word.trim()).filter(word => word),
                              translationReference: 'wordreference.com',
                              definition: translation.definition,
                              definitionReference: 'wordreference.com',
                            });
                          }}
                        >
                          {'Add translation'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Fieldset>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  (dispatch, ownProps) => {
    return {
      addPhrase: (data) => {
        const {
          vocabulary,
          selectedPhrase,
        } = ownProps;
        const currentTime = new Date().getTime();
        if (!vocabulary.id && !selectedPhrase.id) {
          dispatch(requestAddVocabularyAddPhrase({
            phrase: {
              ...data,
              id: currentTime.toString(),
            },
            vocabulary: {
              ...vocabulary,
              id: currentTime.toString(),
            },
          }));
        } else if (vocabulary.id && !selectedPhrase.id) {
          dispatch(requestAddPhrase({
            phrase: {
              ...data,
              id: currentTime.toString(),
            },
            vocabularyId: vocabulary.id,
          }));
        } else if (vocabulary.id && selectedPhrase.id) {
          dispatch(requestUpdatePhrase({
            phrase: data,
            vocabularyId: vocabulary.id,
          }));
        }

        ownProps.onClose();
      },
      deletePhrase: (data) => {
        dispatch(requestDeletePhrase(data));
      },
    };
  },
)(PopupContent);
