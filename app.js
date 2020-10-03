const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const methodOverride = require('method-override');
const option = require('./model/db');

app.set('views', './views');
app.set('view engine', 'ejs');
app.locals.pretty = true;

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: new MySQLStore(option)
}));

app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));

const listRouter = require('./routes/list');
const writeRouter = require('./routes/write');
const editRouter = require('./routes/edit');

const signupRouter = require('./routes/signup');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');

app.use('/', listRouter);
app.use('/', writeRouter);
app.use('/', editRouter);

app.use('/', signupRouter);
app.use('/', loginRouter);
app.use('/', logoutRouter);

app.listen(port, ()=>{
    console.log('express server connected!');
})