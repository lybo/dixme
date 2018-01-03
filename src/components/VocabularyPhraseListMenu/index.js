import React, { Component } from 'react';
import './style.css';
import PhraseListItem from '../PhraseListItem';

class VocabularyPhraseListMenu extends Component {

    render() {
        const {
            primaryButtons,
        } = this.props;

        return (
            <div className="vocabulary-phrase-list-menu">
                {primaryButtons.reduce((acc, button) => {

                    const buttonUI = (
                        <button
                            key={`button-${button.label}`}
                            className="vocabulary-phrase-list-menu__button"
                            onClick={button.onClick}
                        >
                            {button.label}
                        </button>
                    );

                    const splitter = (
                        <div
                            className="vocabulary-phrase-list-menu__splitter"
                            key={`splitter-${button.label}`}
                        >
                        </div>
                    );

                    if (!acc) {
                        return [buttonUI];
                    }

                    return [...acc, splitter, buttonUI];
                }, null)}
            </div>
        );
    }

}

export default VocabularyPhraseListMenu;
