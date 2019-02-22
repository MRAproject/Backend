const express = require('express');
const bodyParser = require('body-parser');
const config = require('./src/shared/config');
const login = require('./src/api/login');

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", config.allowOriginUri);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Access-Control-Allow-Credentials", 'true');
    next();
});

app.post('/login', login);

app.listen(config.apiPort, () => console.log(`The API is listening on port ${config.apiPort}!`));
