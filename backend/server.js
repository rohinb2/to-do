"use strict"

// Dependencies
const express = require('express');
const http = require('http');
const url = require('url');
const path = require('path');
const logger = require('morgan');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
const routes = require('./api/routes');

app.use(express.static(path.join(__dirname, '../client/build')));

// Body Parser and Cookie Parser for handling requests
app.use(logger('dev'))
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser());

// Setting up a session for cookies (can be switched to JwT later)
app.use(session({
    secret: '\'' + process.env.SESSION_SECRET + '\'',
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

// Cross Origin Resource Sharing
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
    next();
});

// Start server
const server = http.createServer(app);
server.listen(process.env.PORT || 8080, () => {
    console.log('Express server listening on %d', server.address().port);
});

module.exports = {
    server: server
}