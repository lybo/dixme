import React, { Component } from 'react';
import './style.css';
import { getPhraseModel } from '../../reducers/phrase';
import VocabularyPhraseList from '../VocabularyPhraseList';
import VocabularyPhraseListMenu from '../VocabularyPhraseListMenu';
import ButtonWithConfirmation from '../ButtonWithConfirmation';
import SyncButton from '../SyncButton';
import ISO6391 from 'iso-639-1';

// TODO: move it to utils
function downloadObjectAsJson(exportObj, exportName){
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportObj));
  const container = document.getElementById('root');
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute('href', dataStr);
  downloadAnchorNode.setAttribute('download', exportName + '.json');
  container.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

class Vocabulary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pdfPath: null,
      selectedPhrase: getPhraseModel(),
      isReferenceVisible: false,
    };

    this.handleReferenceVisibilityToggle = this.handleReferenceVisibilityToggle.bind(this);
    this.handleExportClick = this.handleExportClick.bind(this);
    // TODO: delete it
    this.handlePageNumberChange = this.handlePageNumberChange.bind(this);
  }

  // TODO: delete it
  handlePageNumberChange(pageNumber) {
    const { onPageNumberChange } = this.props;
    onPageNumberChange && onPageNumberChange(pageNumber);
  }

  handleReferenceVisibilityToggle() {
    this.setState({
      isReferenceVisible: !this.state.isReferenceVisible,
    });
  }

  renderSyncButton() {
    const {
      vocabulary,
      getRemoteVocabulary,
      remoteVocabulary,
      setRemoteVocabulary,
      updateRemoteVocabulary,
      updateLocalVocabularyByRemote,
    } = this.props;

    if (vocabulary.syncStatus) {
      return 'Is synced';
    }

    return (
      <SyncButton
        label="Sync"
        vocabulary={vocabulary}
        getRemoteVocabulary={getRemoteVocabulary}
        setRemoteVocabulary={setRemoteVocabulary}
        remoteVocabulary={remoteVocabulary}
        updateRemoteVocabulary={updateRemoteVocabulary}
        updateLocalVocabularyByRemote={updateLocalVocabularyByRemote}
      />
    );
  }

  renderPhrasesButtons() {
    return (
      <div className="phrases-list__phrases-buttons">
        <button
          onClick={this.handleReferenceVisibilityToggle}
          className="phrases-list__show-hide-reference"
        >
          Show/Hide Reference
        </button>
      </div>
    );
  }

  handleExportClick() {
    const { vocabulary } = this.props;
    downloadObjectAsJson(vocabulary, vocabulary.title);
  }

  render() {
    const { isReferenceVisible } = this.state;
    const {
      vocabulary,
      deleteVocabulary,
      onEditClick,
      onAddClick,
      deletePhrase,
      navigate,
      navigateToPhraseForm,
    } = this.props;

    if (!vocabulary) {
      return null;
    }

    return (
      <div className="vocabulary">

        <div className="vocabulary__header">
          <h1 className="vocabulary__header-info">{vocabulary.title}</h1>
        </div>

        <div className="vocabulary__header-details">
          <div className="vocabulary__info">

            <div className="vocabulary__info-row">
              <div className="vocabulary__info-label">
                Translation:
              </div>
              <div className="vocabulary__info-value">
                {ISO6391.getName(vocabulary.langFrom)}
                <i className="fa fa-long-arrow-right vocabulary__info-arrow" />
                {ISO6391.getName(vocabulary.langTo)}
              </div>
            </div>

            <div className="vocabulary__info-row">
              <div className="vocabulary__info-label">
                Number of Phrases:
              </div>
              <div className="vocabulary__info-value">
                {vocabulary.numberOfPhrases}
              </div>
            </div>

            <div className="vocabulary__info-sub-header">
              Deviation from last sync:
            </div>
            <div className="vocabulary__info-sub">
              <div className="vocabulary__info-row">
                <div className="vocabulary__info-label">
                  Number of new phrases:
                </div>
                <div className="vocabulary__info-value">
                  {vocabulary.phrases.filter(p => p.isNew).length}
                </div>
              </div>

              <div className="vocabulary__info-row">
                <div className="vocabulary__info-label">
                  Number of deleted phrases:
                </div>
                <div className="vocabulary__info-value">
                  {vocabulary.syncDeletedPhrases}
                </div>
              </div>
            </div>

          </div>

          <div className="vocabulary__actions">
            <div style={{padding: '0 10px'}}>
              {this.renderSyncButton()}
            </div>

            <div style={{display: 'flex', padding: '0 10px', margin: '20px 0 10px'}}>
              <button
                className="vocabulary__edit-button"
                onClick={() => navigate(`/vocabulary/edit/${vocabulary.id}`)}
              >
                edit
              </button>
            </div>

            <div style={{display: 'flex', padding: '0 10px', margin: '10px 0'}}>
              <button
                className="vocabulary__edit-button"
                onClick={() => navigate(`/vocabulary/game/${vocabulary.id}`)}
              >
                play
              </button>
            </div>

            <div className="vocabulary__delete-button">
              <ButtonWithConfirmation
                label="delete"
                confirmationMessage="Do you want to delete this vocabulary?"
                onConfirm={() => deleteVocabulary(vocabulary.id)}
                buttonClassName=""
              />
            </div>

            {this.renderPhrasesButtons()}
          </div>
        </div>
        <div className="vocabulary__phrases-list">
          <VocabularyPhraseList
            vocabulary={vocabulary}
            navigateToPhraseForm={navigateToPhraseForm}
            onDeleteClick={deletePhrase}
            onEditClick={(phraseId) => {
              onEditClick && onEditClick(vocabulary.phrases.find(phrase => phrase.id === phraseId));
            }}
            isReferenceVisible={isReferenceVisible}
            navigate={navigate}
          />
        </div>
        <VocabularyPhraseListMenu
          primaryButtons={[
            {
              label: 'home',
              onClick: () => navigate(`/`),
            },
            {
              label: 'pdf',
              onClick: () => navigate(`/vocabulary/pdf/${vocabulary.id}`),
            },
            {
              label: 'add phrase',
              onClick: () => onAddClick(),
            },
            {
              label: 'export',
              onClick: this.handleExportClick,
            },
          ]}
        />
      </div>
    );
  }
}

export default Vocabulary;
