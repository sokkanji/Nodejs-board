const express = require('express');
const router = express.Router();

const format = require('date-format');
const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');
const date = moment().format('YYYY-MM-DD HH:mm:ss');

const mysql = require('mysql');
const dbconfig = require('../model/db');
const conn = mysql.createConnection(dbconfig);

const sql = {
    insert: 'INSERT INTO border(writer, title, content, regdate) VALUES(?, ?, ?, ?);'
};

router.get('/write', (req, res) => {
    res.render('write', {title: 'Write'});
});

router.post('/write', (req, res) => {
    const _writer = req.body.writer;
    const _title = req.body.title;
    const _content = req.body.content;

    conn.query(sql.insert, [_writer, _title, _content, date], err => {
        if (err) {
            console.log(err);
            return;
        } else {
            console.log('Inserted');
            res.redirect('/');
        }
    });
});

module.exports = router;