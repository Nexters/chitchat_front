"use strict";

var express = require('express');
var loginCheck = require('../util/login-check');

var router = express.Router();


router.get('/login_success', function (req, res) { // loginCheck, function (req, res) {
  req.session.accessToken = req.user;
  res.render('index', { token: JSON.stringify(req.user) }); // req.user });
});

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { token: JSON.stringify('') });
});

module.exports = router;
