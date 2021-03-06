const DBM = require('../db/DBM');

const get_all_user_cars = async (req, res) => {
    const { username } = req.query;
    if (!username) {
        return res.status(403).json({
            status: 'unauthorized'
        });
    }
    const dbm = new DBM();
    await dbm.open();
    const carsList = await dbm.getAllUserCars([username]);
    res.json({
        data: carsList,
        status: 'successful'
    });

}

module.exports = get_all_user_cars;