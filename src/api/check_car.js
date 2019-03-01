const DBM = require('../db/DBM');

const check_car = async (req, res) => {
    const { carNumber } = req.query;
    if (!carNumber) {
        return res.status(403).json({
            status: 'unauthorized'
        });
    }
    const dbm = new DBM();
    await dbm.open();
    const car = await dbm.checkCar([carNumber]);
    const status = car.length > 0 ? 1 : 0;
    await dbm.close();
    console.log('car', car);
    res.json({
        status
    });

}

module.exports = check_car;