'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('express-handlebars'); /*VISTAS*/
const expressValidator = require('express-validator');
const app = express();
const config = require('./config');

const index_routes = require('./routes/index');

const cookieParser = require('cookie-parser');
const morgan      = require('morgan');
const path = require('path'),
      fs = require('fs');
var session = require('express-session');

const MongoDBStore = require('connect-mongodb-session')(session);

var passport = require('passport');
var flash 		= require('connect-flash');

app.use(cookieParser());
app.use(flash());
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(expressValidator());

app.use(session({
	secret : "secq%&(w-e@rwqe-rAs@&dfasdfr%^&*)et",
	store: new MongoDBStore({
		uri: config.db,
		collection: 'session'
	}),
	cookie: {
        expires: new Date(Date.now() + 60 * 10000 * 15), 
  		maxAge: 60 * 10000 * 15
    },
	saveUninitialized: true,
	resave: true
}))

//app.use(morgan('dev'));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

app.engine('.hbs',hbs({ /*decirle a express que use hbs*/
	defaultLayout: 'default',
	extname: '.hbs',
	helpers: require('./services/helpers').helpers
}))

/*set view*/
app.set('view engine', '.hbs')



app.use('/',index_routes)


app.use(function(req, res, next) {
  res.status(404).sendFile(process.cwd() + '/views/error/404.htm');
});

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

module.exports = app