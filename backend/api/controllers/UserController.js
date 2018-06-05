const User = require('../models/User');
const UserControllerHelpers = require('./UserControllerHelpers');
const passport = require('passport');

module.exports.register = function(req, res, next) {
    User.register(new User({ 
        username: req.body.username,
        email: req.body.email,
        first: req.body.first,
        last: req.body.last,
        }), req.body.password, function(err) {

        if (err) {
            console.log(err);
            return next(err);
        }   

        console.log('Registered User');
        res.redirect('/');
    })
}

module.exports.login = function(req, res, next) {
    passport.authenticate('local', {session: true })(req, res, function() {
        res.sendStatus(200);
        console.log(req.user.username + ' was successfuly logged in.');
        res.redirect('/');
    });
    
}

module.exports.logout = function(req, res, next) {
    req.logout();
    req.session.destroy();
    res.sendStatus(200);
    res.redirect('/');
}

module.exports.addCategory = function(req, res, next) {
    // TODO: Figure out why I can't push Strings?
    var categoryObj = { category: req.body.category };
    User.findOneAndUpdate(
        { username: req.user.username }, 
        { $push: { categories: categoryObj }}, function(err, succ) {
            if (err) {
                console.log(err);
            }
        });
}

module.exports.createTask = function (req, res, next) {
    UserControllerHelpers.addToUserTasks(req.user, req.body);
    res.sendStatus(200);
}

module.exports.deleteTask = function (req, res, next) {
    UserControllerHelpers.removeFromUserTasks(req.user, req.body);
    UserControllerHelpers.removeFromUserCompletedTasks(req.user, req.body);
    res.sendStatus(200);
}

module.exports.completeTask = function (req, res, next) {
    UserControllerHelpers.removeFromUserTasks(req.user, req.body);
    UserControllerHelpers.addToUserCompletedTasks(req.user, req.body);
    res.sendStatus(200);
}

module.exports.uncompleteTask = function (req, res, next) {
    UserControllerHelpers.removeFromUserCompletedTasks(req.user, req.body);
    UserControllerHelpers.addToUserCompletedTasks(req.user, req.body);
    res.sendStatus(200);
}

module.exports.getTaskArray = function(req, res, next) {
    res.send(req.user.tasks);
}

module.exports.getCompletedTaskArray = function(req, res, next) {
    res.send(req.user.completedTasks);
}

module.exports.getCategoryArray = function(req, res, next) {
    res.send(req.user.categories);
}

module.exports.checkStatus = function(req, res, next) {
    res.send(200);
}