const express = require('express');
const router = express.Router();

const mysql = require('mysql');
const dbconfig = require('../model/db');
const conn = mysql.createConnection(dbconfig);

const sql = 'DELETE FROM board WHERE id = ?';

router.delete('/delete/:id', (req, res) => {
    const _id = req.params.id;

    conn.query(sql, [_id], (err) => {
        if (err) {
            console.log(err);
            return;
        } else {
            const str = `<script type='text/javascript'>
                            alert('정상적으로 글 삭제되었습니다.'); 
                            location.href='/';
                        </script>`;
            res.send(str);
        }
    })
})

module.exports = router;