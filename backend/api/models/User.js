var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var validate = require('mongoose-validator')

var User = new Schema({
    username: String,
    password: String,
    email: { type:String, lowercase:true, validate:[
        validate({
            validator: 'isEmail',
            message: 'Not a valid email',
        })]},
    first: String,
    last: String,
    tasks: [{
        taskId: { type: Number, min: 0 },
        name: String,
        date: Date,
        category: String
    }],
    completedTasks: [{
        taskId: { type: Number, min: 0 },
        name: String,
        date: Date,
        category: String
    }],
    categories: [Schema.Types.Mixed]
});

// Passport local mongoose is a library that simplifies passport's password hashing
User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);