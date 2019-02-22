const express = require('express');
const bodyParser = require('body-parser');
const config = require('./src/shared/config');
const login = require('./src/api/login');
const add_car = require('./src/api/add_car');
const get_all_user_cars = require('./src/api/get_all_user_cars');
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
app.post('/add_car', add_car);
app.get('/get_all_user_cars',get_all_user_cars);

async function resetTable() {
    const dbm = new DBM();
    await dbm.open();
    const carsList = await dbm.getAllUserCars(['amitmarko']);
    console.log(carsList);
    // await dbm.createCarsTable();
    // await dbm.insertCar(['amitmarko', '333-222', 0]);
    await dbm.close();
}

// resetTable();

app.listen(config.apiPort, () => console.log(`The API is listening on port ${config.apiPort}!`));
