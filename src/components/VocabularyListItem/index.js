import React, { Component } from 'react';
import './style.css';
import 'font-awesome/css/font-awesome.css';

class VocabularyListItem extends Component {
    constructor(props) {
        super(props);

        this.handlerClick = this.handlerClick.bind(this);
    }

    handlerClick() {
        const { vocabulary, onClick } = this.props;

        return (e) => {
            e.stopPropagation();
            e.preventDefault();
            onClick && onClick(vocabulary);
        }
    }

    render() {
        function bytesToSize(bytes) {
             const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
             if (bytes === 0) return '0 Byte';
             const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
             return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
        };
        const { vocabulary } = this.props;
        const pecentageOfPhraseWithReference = (100 * vocabulary.numberOfPhrasesWithReference) / vocabulary.numberOfPhrases;
        const details = `, ${vocabulary.numberOfPhrasesWithReference} phrases with reference (~${parseInt(pecentageOfPhraseWithReference, 10)}%), Size: ${bytesToSize(vocabulary.phrasesFileSystemSize)}`;
        const syncClassName = vocabulary.syncStatus ? '' : 'vocabulary-list-item--no-sync';

        return (
            <div className="vocabulary-list-item">
                <button
                    onClick={this.handlerClick()}
                    className="vocabulary-list-item__link"
                >
                    <div className="vocabulary-list-item__left">
                        <div className="vocabulary-list-item__title">
                            {vocabulary.title}
                        </div>
                        <div className="vocabulary-list-item__details">
                            <div className={`vocabulary-list-item__sync-status ${syncClassName}`}>
                                <span className="fa fa-refresh"/>
                            </div>
                            <div className="vocabulary-list-item__number-of-phrases">
                                {vocabulary.numberOfPhrases} phrases
                                {vocabulary.numberOfPhrases ? details : null}
                            </div>
                        </div>
                    </div>
                    <div className="vocabulary-list-item__right">
                        <span className="fa fa-angle-right"/>
                    </div>
                </button>
            </div>
        );
    }
}

export default VocabularyListItem;
