"use strict";

var express = require('express');
var loginCheck = require('../util/login-check');

var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login_success', loginCheck, function (req, res) {
  res.render('main', { token: req.user });
});

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
