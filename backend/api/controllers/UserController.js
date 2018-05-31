const User = require('../models/User');
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
    res.sendStatus(200);
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

    var taskObj = {
        taskId: req.body.taskId,
        name: req.body.name,
        date: req.body.date,
        category: req.body.category
    }

    User.findOneAndUpdate(
        { username: req.user.username },
        { $push: { tasks: taskObj } }, function (err, succ) {
            if (err) {
                console.log(err);
            }
        });
}

module.exports.deleteTask = function (req, res, next) {
    // TODO:
}

module.exports.completeTask = function (req, res, next) {
    // TODO:
}

module.exports.uncompleteTask = function (req, res, next) {
    // TODO:
}

module.exports.getTaskArray = function(req, res, next) {
    // TODO:
}

module.exports.getCategoryArray = function(req, res, next) {
    // TODO:
}