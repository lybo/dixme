import request from 'superagent';
import * as AuthService from '../../services/authService/';

const {
    REACT_APP_API,
} = process.env;
const apiHost = REACT_APP_API;

export function getUserVocabularies() {
    return new Promise(async (resolve, reject) => {
        const accessToken = AuthService.getTokenA();
        request
            .get(`${apiHost}/api/v1/user/vocabularies`)
            .set({'Authorization': 'Bearer ' + accessToken})
            .end(function(err, res) {
                if (err) {
                    console.log(err);
                    reject(res);
                }

                console.log(res);
                if (res.status === 200) {
                    resolve(res.body);
                } else {
                    reject(res);
                }
            });
    });
}

export function getVocabulary(id) {
    return new Promise(async (resolve, reject) => {
        const accessToken = AuthService.getTokenA();
        request
            .get(`${apiHost}/api/v1/vocabulary/${id}`)
            .set({'Authorization': 'Bearer ' + accessToken})
            .end(function(err, res) {
                if (err) {
                    console.log(err);
                    reject(res);
                }

                console.log(res);
                if (res.status === 200) {
                    resolve(res.body);
                } else {
                    reject(res);
                }
            });
    });
}

export function getVocabularyPhrases(id) {
    return new Promise(async (resolve, reject) => {
        const accessToken = AuthService.getTokenA();
        request
            .get(`${apiHost}/api/v1/vocabulary-phrases/${id}`)
            .set({'Authorization': 'Bearer ' + accessToken})
            .end(function(err, res) {
                if (err) {
                    console.log(err);
                    reject(res);
                }

                console.log(res);
                if (res.status === 200) {
                    resolve(res.body);
                } else {
                    reject(res);
                }
            });
    });
}

export function updateVocabulary(vocabulary) {
    return new Promise((resolve, reject) => {
        const accessToken = AuthService.getTokenA();
        request
            .post(`${apiHost}/api/v1/vocabulary`)
            .set({'Authorization': 'Bearer ' + accessToken})
            .send({ vocabulary })
            .end(function(err, res) {
                if (err) {
                    console.log(err);
                    reject(res);
                }

                console.log(res);
                if (res.status === 200) {
                    resolve(res.body);
                } else {
                    reject(res);
                }
            });
    });
}
