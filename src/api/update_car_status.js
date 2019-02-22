const DBM = require('../db/DBM');

const update_car_status = async (req, res) => {
    let { carNumber, isInside } = req.query;
    if (!isInside) {
        return res.status(403).json({
            status: 'unauthorized'
        });
    }
    isInside = JSON.parse(isInside);
    if (!carNumber || (isInside !== 0 && isInside !== 1)) {
        return res.status(403).json({
            status: 'unauthorized'
        });
    }
    const dbm = new DBM();
    await dbm.open();
    await dbm.updateCarInside([isInside, carNumber]);
    res.json({
        status: 'successful'
    });

}

module.exports = update_car_status;