const express = require('express');
const router = express.Router();

const mysql = require('mysql');
const dbconfig = require('../model/db');
const conn = mysql.createConnection(dbconfig);

const sql = {
    list: 'SELECT * FROM board',
    select: 'SELECT * FROM board WHERE id = ?'
};

router.get('/', (req, res) => {
    const page = 1;
    
    conn.query(sql.list, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        } else {
            res.render('list', {
                docs: rows, 
                session: req.session.displayName, 
                page: page, 
                length: rows.length-1, 
                page_num: 5, 
                pass: true
            } );
        }
    })
})

router.get('/:id(\\d+)', (req, res) => {
    let _id = req.params.id;

    conn.query(sql.select, [_id], (err, rows) => {
        if (err) {
            console.log(err);
            return;
        } else {
            res.render('read', {docs: rows[0], session: req.session.displayName, writer: rows[0].writer});
        }
    })
})

router.get('/page/:page', (req, res) => {
    let page = req.params.page;

    conn.query(sql.list, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        } else {
            res.render('list', {
                docs: rows, 
                session: req.session.displayName, 
                page: page, 
                length: rows.length-1, 
                page_num: 5, 
                pass: true
            });
        }
    })
})

module.exports = router;