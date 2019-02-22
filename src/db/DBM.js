const sqlite3 = require('sqlite3');
const Promise = require('bluebird');

class DBM {
    constructor() {
        this.db;
    }

    async open() {
        try {
            this.db = await new sqlite3.Database('./src/db/db.db');
            console.log('Connected to database');
        } catch (e) {
            console.log('Could not connect to database', err)
        }
    }

    async close() {
        try {
            await this.db.close();
            console.log('Database closed');
        } catch (e) {
            console.log('Could not close the database', err)
        }
    }

    async createTable() {
        const sql = 'CREATE TABLE Users (username TEXT PRIMARY KEY, password TEXT, firstName TEXT, lastName TEXT)';
        return await this._run(sql);
    }

    async deleteTable(tableName) {
        const sql = `DROP TABLE  ${tableName}`;
        return await this._run(sql);
    }

    async insertUser(params) {
        const sql = 'INSERT INTO Users (username,password,firstName,lastName) VALUES (?,?,?,?)';
        return await this._run(sql, params);
    }

    async updateEmailReminder(params) {
        const sql = `UPDATE policyStatus SET date = ?, status = ? WHERE id = ?;`;
        return await this._run(sql, params);
    }

    async getUser(params) {
        const sql = `SELECT * FROM Users WHERE username = ? AND password = ?`;
        return await this._get(sql, params);
    }

    async getAllStatus() {
        const sql = `SELECT * FROM policyStatus`;
        return await this._all(sql);
    }

    _run(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.run(sql, params, function (err) {
                if (err) {
                    console.log('Error running sql ' + sql)
                    console.log(err)
                    reject(err)
                } else {
                    resolve({ id: this.lastID })
                }
            })
        })
    }

    _get(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.get(sql, params, (err, result) => {
                if (err) {
                    console.log('Error running sql: ' + sql)
                    console.log(err)
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }

    _all(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.all(sql, params, (err, rows) => {
                if (err) {
                    console.log('Error running sql: ' + sql)
                    console.log(err)
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        })
    }

    async close() {
        await this.db.close();
    }

}

module.exports = DBM;