import React, { Component } from 'react';
import {
    HashRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
import Layout from '../../containers/Layout';
import PDFReaderPage from '../../containers/PDFReaderPage.js';
import Vocabulary from '../../containers/Vocabulary';
import Home from '../../containers/Home';
import EditVocabularyPage from '../../containers/EditVocabularyPage';
import PhraseFormPage from '../../containers/PhraseFormPage';
import Game from '../../containers/Game';
import * as AuthService from '../../services/authService/';

class App extends Component {
    componentWillMount() {
        const {
            loginError,
            loginSuccess,
            syncVocabularies,
        } = this.props;

        if (!AuthService.isTokenExpired()) {
          setTimeout(() => syncVocabularies(), 10);
        }

        AuthService.lock.on('authenticated', authResult => {
            AuthService.lock.getUserInfo(authResult.accessToken, (error, profile) => {
                if (error) {
                    return loginError(error);
                }
                AuthService.setTokenA(authResult.accessToken);
                AuthService.setToken(authResult.idToken);
                AuthService.setProfile(profile);
                loginSuccess(profile);
                AuthService.lock.hide();
                window.location = '/#/';

                syncVocabularies();
            });
        });

        AuthService.lock.on('authorization_error', error => {
            loginError(error);
        });
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={(props) => {
                            const newProps = {
                                ...props,
                                isVisible: false,
                            };

                            return (
                                <Layout {...props}>
                                    <PDFReaderPage {...newProps} />
                                    <Home {...props} />
                                </Layout>
                            );
                        }}
                    />

                    <Route
                        exact
                        path="/vocabulary/game/:vocabularyId"
                        render={(props) => {
                            const newProps = {
                                ...props,
                                isVisible: false,
                            };
                            return (
                                <Layout {...props}>
                                    <PDFReaderPage {...newProps} />
                                    <Game {...props} />
                                </Layout>
                            );
                        }}
                    />

                    <Route
                        exact
                        path="/vocabulary/edit/:vocabularyId"
                        render={(props) => {
                            const newProps = {
                                ...props,
                                isVisible: false,
                            };
                            return (
                                <Layout {...props}>
                                    <PDFReaderPage {...newProps} />
                                    <EditVocabularyPage {...props} />
                                </Layout>
                            );
                        }}
                    />

                    <Route
                        exact
                        path="/vocabulary/:vocabularyId"
                        render={(props) => {
                            const newProps = {
                                ...props,
                                isVisible: false,
                            };
                            return (
                                <Layout {...props}>
                                    <PDFReaderPage {...newProps} />
                                    <Vocabulary {...props} />
                                </Layout>
                            );
                        }}
                    />

                    <Route
                        exact
                        path="/vocabulary/:vocabularyId/phrase/:phraseId/:returnPage"
                        render={(props) => {
                            const newProps = {
                                ...props,
                                isVisible: false,
                            };
                            return (
                                <Layout {...props}>
                                    <PDFReaderPage {...newProps} />
                                    <PhraseFormPage {...props} />
                                </Layout>
                            );
                        }}
                    />

                    <Route
                        exact
                        path="/vocabulary/pdf/:vocabularyId"
                        isVisible={true}
                        render={(props) => {
                            const newProps = {
                                ...props,
                                isVisible: true,
                            };
                            return (
                                <Layout {...props}>
                                    <PDFReaderPage {...newProps} />
                                </Layout>
                            );
                        }}
                    />
                </Switch>
            </Router>
        );
    }
}

export default App;
