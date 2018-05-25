"use strict"

const express = require('express');
const passport = require('passport');
const UserController = require('./controllers/UserController');
const router = express.Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);

module.exports = router;