import React, { Component } from 'react';
import './style.css';
import {
    HashRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
import Layout from '../../components/Layout/';
import PDFReaderPage from '../../containers/PDFReaderPage.js';
import Vocabulary from '../../containers/Vocabulary';
import Home from '../../containers/Home';
import EditVocabularyPage from '../../containers/EditVocabularyPage';
import PhraseFormPage from '../../containers/PhraseFormPage';

class App extends Component {
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
                                <Layout>
                                    <PDFReaderPage {...newProps} />
                                    <Home {...props} />
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
                                <Layout>
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
                                <Layout>
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
                                <Layout>
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
                                <Layout>
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
