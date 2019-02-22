const express = require('express');
const bodyParser = require('body-parser');
const config = require('./src/shared/config');
const login = require('./src/api/login');
const DBM = require('./src/db/DBM');

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

async function resetTable() {
    const dbm = new DBM();
    await dbm.open();
    // await dbm.createTable();
    // await dbm.insertUser(['amitmarko','12345', 'amit', 'markovich']);
    const user = await dbm.getUser(['amitmarko','12345']);
    await dbm.close();
}

// resetTable();

app.listen(config.apiPort, () => console.log(`The API is listening on port ${config.apiPort}!`));
