const express = require('express');
const router = express.Router();

const mysql = require('mysql');
const dbconfig = require('../model/db');
const conn = mysql.createConnection(dbconfig);

const sql = 'INSERT INTO signup(userid, userpw, displayName, email) VALUES(?, ?, ?, ?);';

router.get('/signup', (req, res) => {
    res.render('signup', {title: 'Sign up'});
})

router.post('/signup', (req, res) => {
    const _userid = req.body.userid;
    const _userpw = req.body.userpw;
    const _displayName = req.body.displayName;
    const _email = req.body.email;

    const str = `<script type='text/javascript'>
                    alert('회원가입되었습니다.'); 
                    location.href='/login';
                </script>`;

    conn.query(sql, [_userid, _userpw, _displayName, _email], err => {
        if (err) {
            console.log(err);
            return;
        } else {
            res.send(str);
        }
    });
})

module.exports = router;