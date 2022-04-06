const express = require("express");
const mysql = require("mysql");
const Router = express.Router();

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'db1'
})

Router.get("/getTags/:id?", (req, res) => {
    let id = req.params.id;
    let sql = '';
    if (id) {
        sql = `select tags from details where details.id =${id} `;
    } else {
        sql = `select tags from details `;
    }
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query(sql, (error, results, fileds) => {
            if (error) throw error;
            res.send(results);
            connection.release();
        })
    })

})
module.exports = Router;