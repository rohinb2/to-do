"use strict"

// Dependencies
const express = require('express');
const http = require('http');
const url = require('url');
const logger = require('morgan');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const MongoStore = require('connect-mongo')({session: session});
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
const routes = require('./api/routes');

// Body Parser and Cookie Parser for handling requests
app.use(logger('dev'))
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser());

// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//     res.header("Access-Control-Allow-Credentials", true);
//     next();
// });

// Setting up a session for cookies (can be switched to JwT later)
app.use(session({
    secret: 'adf2f34',
    resave: true,
    saveUninitialized: false
}));

// Add passport for User Authentication
app.use(passport.initialize());
app.use(passport.session());

var User = require('./api/models/User')
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(cors());

// Add our routes
app.use('/api', routes);

const mongoDB = require('./api/config/database')

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
});

// Start server
const server = http.createServer(app);
server.listen(8080, () => {
    console.log('Express server listening on %d', server.address().port);
});

module.exports = {
    server: server
}