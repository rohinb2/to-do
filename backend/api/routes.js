"use strict"

const express = require('express');
const passport = require('passport');
const UserController = require('./controllers/UserController');
const Auth = require('./middleware/auth');
const Logging = require('./middleware/logging');
const router = express.Router();

// Additional Logging Middleware
router.use(Logging.logRequest);

router.get('/hello', function(req, res) {
    res.send({
        express: 'Your To-Do App'
    })
})

// User related endpoints
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);

// Task related endpoints
router.post('/createtask', Auth.loggedIn, UserController.createTask);
router.post('/deletetask', Auth.loggedIn, UserController.deleteTask);
router.post('/completetask', Auth.loggedIn, UserController.completeTask);
router.post('/uncompletetask', Auth.loggedIn, UserController.uncompleteTask);
router.get('/gettasks', Auth.loggedIn, UserController.getTaskArray);

// Category related endpoints
router.post('/addcategory', Auth.loggedIn, UserController.addCategory);
router.get('/getcategories', Auth.loggedIn, UserController.getCategoryArray);

module.exports = router;