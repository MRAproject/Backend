const DBM = require('../db/DBM');

const post_login = async (req, res) => {
    if (!req.body || !req.body.username || !req.body.password) {
        return res.status(403).json({
            status: 'unauthorized'
        });
    }
    const { username, password } = req.body;
    const dbm = new DBM();
    await dbm.open();
    const user = await dbm.getUser([username, password]);
    await dbm.close();
    if (!user){
        return res.status(403).json({
            status: 'unauthorized'
        });
    }
    res.json({
        status: 'authorized'
    });

}

module.exports = post_login;