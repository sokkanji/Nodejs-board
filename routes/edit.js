const express = require('express');
const router = express.Router();

const mysql = require('mysql');
const dbconfig = require('../model/db');
const conn = mysql.createConnection(dbconfig);

const sql = {
    select: 'SELECT * FROM border WHERE id = ?',
    update: 'UPDATE border SET writer = ?, title = ?, content = ? WHERE id = ?',
};

router.get('/edit/:id', (req, res) => {
    const paramsId = req.params.id;
    conn.query(sql.select, [paramsId], (err, rows) => {
        if (err) {
            console.log(err);
            return;
        } else {
            res.render('edit', {docs: rows[0], title: '수정페이지'});
        }
    });
})

router.put('/edit/:id', (req, res) => {
    const _id = req.params.id;
    const _writer = req.body.writer;
    const _title = req.body.title;
    const _content = req.body.content;

    conn.query(sql.update, [_writer, _title, _content, _id], (err, rows) => {
        if (err) {
            console.log(err);
            return;
        } else {
            res.redirect('/');
        }
    })
})

module.exports = router;