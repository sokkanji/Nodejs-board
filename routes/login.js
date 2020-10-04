const express=require('express');
const router=express.Router();

const mysql=require('mysql');
const dbconfig=require('../model/db');
const conn=mysql.createConnection(dbconfig);

const session = require('express-session');

const sql = 'SELECT * FROM signup WHERE userid = ?';

router.get('/login', (req, res)=>{   
    res.render('login');
})

router.post('/login', (req, res)=>{
    const _userid = req.body.userid;
    const _userpw = req.body.userpw;

    conn.query(sql, [_userid], (err, rows)=>{
        if(err) {
            console.log(err); 
            return;
        } else {
            if(rows[0].userpw === _userpw && rows[0].userid === _userid){
                req.session.displayName = rows[0].displayName;
                req.session.save( ()=>{
                    res.redirect('/');
                });
            } else {
                const str = `<script type='text/javascript'>
                                alert('아이디 또는 비밀번호가 맞지 않습니다.'); 
                                location.href='/login';
                            </script>`;
                res.send(str);
            }
        };
    })
})

module.exports=router;
