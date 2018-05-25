const User = require('../models/User.js');
const passport = require('passport');

module.exports.register = function(req, res, next) {
    console.log(req.body)
    User.register(new User({ username: req.body.username }), req.body.password, function(err) {
        if (err) {
            console.log(err);
            return next(err);
        }

        console.log('Registered User');
        res.redirect('/');
    })
}

module.exports.login = function(req, res, next) {
    passport.authenticate('local')(req, res, function() {
        res.sendStatus(200);
        res.redirect('/');
    });
}

module.exports.logout = function(req, res, next) {
    req.logout();
    res.sendStatus(200);
}