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

const sql = 'INSERT INTO board(writer, title, content, regdate) VALUES(?, ?, ?, ?);';

router.get('/write', (req, res) => {
    if(req.session.displayName){
        res.render('write', {title: 'Write', displayName: req.session.displayName});
    } else{
        const str = `<script type='text/javascript'>
                        alert('로그인이 필요한 페이지입니다.'); 
                        location.href='/login';
                    </script>`;
        res.send(str);
    }
})

router.post('/write', (req, res) => {
    const _writer = req.session.displayName;
    const _title = req.body.title;
    const _content = req.body.content;

    conn.query(sql, [_writer, _title, _content, date], err => {
        if (err) {
            console.log(err);
            return;
        } else {
            res.redirect('/');
        }
    });
})

module.exports = router;