import React, { Component } from 'react';
import './style.css';
import VoicePlayer from '../VoicePlayer';

const langs ={
    en: 'en-US',
    es: 'es-ES',
    fr: 'fr-FR',
    it: 'it-IT',
    de: 'de-DE',
    ja: 'ja-JP',
    pt: 'pt-BR',
    zh: 'zh-CN',
};

class TextToSpeechButton extends Component {
    state = {
        play: false,
    }

    handlePlay = () => {
        this.setState({
            play: true,
        });
    }

    handleStop = () => {
        this.setState({
            play: false,
        });
    }

    render() {
        if (!('speechSynthesis' in window)) {
          return null;
        }

        const {
            text,
            lang,
            classNames = '',
        } = this.props;
        const { play } = this.state;

        return (
            <button
                className={`text_to_speech_button ${classNames}`}
                onClick={this.handlePlay}
            >
                {play ? (
                    <i className="fa fa-volume-up" />
                ) : (
                    <i className="fa fa-play" />
                )}
                <VoicePlayer
                    play={play}
                    onEnd={this.handleStop}
                    text={text}
                    lang={langs[lang]}
                />
            </button>
        );
    }
}


export default TextToSpeechButton;
