import React, { Component } from 'react';
import './style.css';
import ButtonWithActions from '../ButtonWithActions';

class SyncButton extends Component {
  renderSyncComparison() {
    const {
      remoteVocabulary,
      vocabulary,
    } = this.props;

    if (!remoteVocabulary) {
      return 'loading';
    }

    if (!remoteVocabulary.id) {
      return (
        <div>
          There is no remote vocabulary. Do you want to upload it?
        </div>
      );
    }

    if (vocabulary.phrases.length === 0 && vocabulary.numberOfPhrases && remoteVocabulary.numberOfPhrases) {
      return (
        <div>
          It looks like that you miss phrases
        </div>
      );
    }

    return (
      <div>
        There is an old version  on the server.
        <br />
        {remoteVocabulary.numberOfPhrases} phrases in total.
        <br />
        Last update was
        <br />
        {new Date(remoteVocabulary.updatedAt).toString()}
        <br />
        From {remoteVocabulary.syncSource}
        <br />
        Which version do you want to sync?
      </div>
    );
  }

  getSyncButtons() {
    const {
      remoteVocabulary,
      updateRemoteVocabulary,
      updateLocalVocabularyByRemote,
      vocabulary,
    } = this.props;

    if (!remoteVocabulary) {
      return [];
    }

    if (!remoteVocabulary.id) {
      return [
        {
          label: 'upload',
          onClick: () => {
            updateRemoteVocabulary(vocabulary);
          },
        },
      ];
    }

    if (vocabulary.phrases.length === 0 && vocabulary.numberOfPhrases && remoteVocabulary.numberOfPhrases) {
      return [
        {
          label: 'Get phrases',
          onClick: () => {
            updateLocalVocabularyByRemote(remoteVocabulary);
          },
        },
      ];
    }

    return [
      {
        label: 'Accept local',
        onClick: () => {
          updateRemoteVocabulary(vocabulary);
        },
      },
      {
        label: 'Accept remote',
        onClick: () => {
          updateLocalVocabularyByRemote(remoteVocabulary);
        },
      },
    ];
  }

  render() {
    const {
      vocabulary,
      getRemoteVocabulary,
      remoteVocabulary,
      setRemoteVocabulary,
    } = this.props;

    if (vocabulary.syncStatus) {
      return 'Is synced';

    }

    return (
      <ButtonWithActions
        label="Sync"
        onClick={() => getRemoteVocabulary(vocabulary.id)}
        text={this.renderSyncComparison()}
        buttons={this.getSyncButtons()}
        showButtons={remoteVocabulary !== null}
        onCancelClick={() => {
          setRemoteVocabulary(null);
        }}
        buttonClassName=""
      />
    );
  }
}

export default SyncButton;
