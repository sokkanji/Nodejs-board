const express = require('express');
const router = express.Router();

const mysql = require('mysql');
const dbconfig = require('../model/db');
const conn = mysql.createConnection(dbconfig);

router.post('/', (req,res) => {
    const page = 1;
    let select = req.body.select;

    if(select === 'title') {
        let title = req.body.txt;
        const sqlTitle = 'SELECT * FROM board WHERE title LIKE "%' + title + '%"';
        conn.query(sqlTitle, (err, rows) =>{
            if (err){
                console.log(err);
                return;
            }
            res.render('list', {
                docs: rows, 
                session: req.session.displayName,
                page: page,
                length: rows.length-1,
                page_num: 5,
                pass: true
            });
        })
    } else if (select === 'writer') {
        let writer = req.body.txt;
        const sqlWriter = 'SELECT * FROM board WHERE writer = ?';
        conn.query(sqlWriter, [writer], (err, rows) => {
            if (err){
                console.log(err);
                return;
            }
            res.render('list', {
                docs: rows,
                session: req.session.displayName,
                page:page,
                length:rows.length-1,
                page_num:5,
                pass:true
            });
        })
    }
})

module.exports=router;