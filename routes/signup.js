const express = require('express');
const router = express.Router();

const mysql = require('mysql');
const dbconfig = require('../model/db');
const conn = mysql.createConnection(dbconfig);

const sql = {
    insert: 'INSERT INTO signup(userid, userpw, displayName, email) VALUES(?, ?, ?, ?);'
};

router.get('/signup', (req, res) => {
    res.render('signup', {title: 'Sign up'});
})

router.post('/signup', (req, res) => {
    const _userid = req.body.userid;
    const _userpw = req.body.userpw;
    const _displayName = req.body.displayName;
    const _email = req.body.email;

    conn.query(sql.insert, [_userid, _userpw, _displayName, _email], err => {
        if (err) {
            console.log(err);
            return;
        } else {
            console.log('User Inserted');
            res.redirect('/login');
        }
    });
})

module.exports = router;