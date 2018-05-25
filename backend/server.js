"use strict"

// Dependencies
const express = require('express');
const http = require('http');
const url = require('url');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Session = require('express-session');
const bodyParser = require('body-parser');

const app = express();
const routes = require('./api/routes');

// Endpoints
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use('/api', routes);

// Setting up a session
app.use(Session({
    secret: 'asdlfkaj320',
    resave: true,
    saveUninitialized: false
}))

// Add passport for User Authentication
app.use(passport.initialize());
app.use(passport.session());

var User = require('./api/models/User')
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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