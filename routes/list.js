const express = require('express');
const router = express.Router();

const mysql = require('mysql');
const dbconfig = require('../model/db');
const conn = mysql.createConnection(dbconfig);

const sql = {
    list: 'SELECT * FROM border',
    select: 'SELECT * FROM border WHERE id = ?'
};

router.get('/', (req, res) => {
    conn.query(sql.list, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        } else {
            res.render('list', { docs: rows, title: 'Border List'});
        }
    })
})

router.get('/:id', (req, res) => {
    const _id = req.params.id;

    conn.query(sql.select, [_id], (err, rows) => {
        if (err) {
            console.log(err);
            return;
        } else {
            res.render('read', {docs: rows[0]});
        }
    })
})

module.exports = router;