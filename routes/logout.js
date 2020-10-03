const express = require('express');
const router = express.Router();

router.get('/logout', (req, res)=>{
    const str = `<script type='text/javascript'>
                    alert('로그아웃 되었습니다.');
                    location.href='/';
                </script>`;
    delete req.session.displayName;
    res.send(str);
    console.log('Logout');
})

module.exports=router;