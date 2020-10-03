const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

app.set('views', './views');
app.set('view engine', 'ejs');
app.locals.pretty = true;

app.use(express.static(__dirname + '/public'));

const listRouter = require('./routes/list');
app.use('/', listRouter);


app.listen(port, (req, res)=>{
    console.log('express server connected!');
})