const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

app.set('views', './views');
app.set('view engine', 'ejs');
app.locals.pretty = true;

const option =require('./model/db');
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: new MySQLStore(option)
}));

app.use(express.static(__dirname + '/public'));

const listRouter = require('./routes/list');
const writetRouter = require('./routes/write');

const signupRouter = require('./routes/signup');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');

app.use('/', listRouter);
app.use('/', writetRouter);

app.use('/', signupRouter);
app.use('/', loginRouter);
app.use('/', logoutRouter);

app.listen(port, ()=>{
    console.log('express server connected!');
})