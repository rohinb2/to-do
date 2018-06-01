const User = require('../models/User');

module.exports.addToUserTasks = function(user, taskObj) {
    User.findOneAndUpdate(
        { username: user.username },
        { $push: { tasks: taskObj } }, function (err, succ) {
            if (err) {
                console.log(err);
            }
        }
    );
}

module.exports.addToUserCompletedTasks = function(user, taskObj) {
    User.findOneAndUpdate(
        { username: user.username },
        { $push: { completedTasks: taskObj } }, function (err, succ) {
            if (err) {
                console.log(err);
            }
        }
    );
}

module.exports.removeFromUserTasks = function(user, taskObj) {
    User.findOneAndUpdate(
        { username: user.username },
        { $pull: { tasks: { _id: taskObj._id } } }, function (err, succ) {
            if (err) {
                console.log(err);
            }
        }
    );
}

module.exports.removeFromUserCompletedTasks = function(user, taskObj) {
    User.findOneAndUpdate(
        { username: user.username },
        { $pull: { completedTasks: { _id: taskObj._id } } }, function (err, succ) {
            if (err) {
                console.log(err);
            }
        }
    );
}