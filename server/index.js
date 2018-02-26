require('dotenv').load();
const express = require('express');
const app = express();
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');
const cors = require('cors');
const bodyParser = require('body-parser');
const useragent = require('useragent');
const path = require('path');

const utils = require('./utils.js');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({limit: '3mb'}));
app.use(bodyParser.urlencoded({limit: '3mb', extended: true}));

const port = process.env.PORT || 8080;

const vocabulariesDB = require('./db/vocabulary/');
const router = express.Router();

const mapUser = (req, res, next) => {
    if (req.user) {
        req.user.id = req.user.sub;
    }
    next();
};
const checkJwtDev = (req, res, next) => {
    req.user = {
        sub: '1',
    };
    next();
};
const checkJwt = process.env.ENV !== 'development' ? jwt({
  // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
    resultProperty: 'locals.user',
  }),

  // Validate the audience and the issuer.
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256']
}) : checkJwtDev;

app.get('/api/v1/vocabulary/:vocabularyId',
    checkJwt,
    mapUser,
    async function(req, res) {
        const {
            user,
            params: { vocabularyId },
        } = req;
        try {
            const vocabulary = await vocabulariesDB.get(vocabularyId, user.id);
            res.json(vocabulary);
        } catch (e) {
            res.json({
                id: 0,
            });
        }
    },
);

app.get('/api/v1/vocabulary-phrases/:vocabularyId',
    checkJwt,
    mapUser,
    async function(req, res) {
        const {
            user,
            params: { vocabularyId },
        } = req;
        const phrases = await utils.readJSONFile(`./db/phrase/${user.id}.${vocabularyId}.json`);

        res.json(phrases);
    },
);

app.post('/api/v1/vocabulary',
    checkJwt,
    mapUser,
    async function(req, res) {
        const {
            user,
            body,
        } = req;
        const {
            phrases,
        } = body.vocabulary;
        const agent = useragent.parse(req.headers['user-agent']);
        delete body.vocabulary.phrases;
        body.vocabulary.syncSource = agent.toString();
        const vocabulary = await vocabulariesDB.put(body.vocabulary, req.user.id);
        await utils.writeJSONFile(`./db/phrase/${user.id}.${vocabulary.id}.json`, phrases);

        res.json(vocabulary);
    },
);

app.get('/api/v1/user/vocabularies',
    checkJwt,
    mapUser,
    async function(req, res) {
        const {
            user,
        } = req;
        const vocabularies = await vocabulariesDB.getAllByUser(user.id);
        res.json(vocabularies);
    },
);

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + 'build/index.html'));
});

app.listen(port);
console.log(process.env.ENV);
console.log(`https://${process.env.AUTH0_DOMAIN}/`);
console.log(process.env.AUTH0_AUDIENCE);
console.log('dixme api v1 ' + port);
