"use strict";

var express = require('express');
var loginCheck = require('../util/login-check');

var router = express.Router();


router.get('/login_success', function (req, res) {
  req.session.accessToken = req.user;
  res.redirect('/');
});

router.get('/logout', function (req, res) {
  delete req.session.accessToken;
  req.logout();
  res.redirect('/');
});

router.get('/chat-room', function (req, res) {
  let token = null;
  if (req.session.accessToken) token = req.session.accessToken;
  res.render('chat-room', { token: JSON.stringify(token) });
});

router.get('/setting', function (req, res, next) {
  let token = null;
  if (req.session.accessToken) token = req.session.accessToken;
  res.render('setting', { token: JSON.stringify(token) });
});

/* GET home page. */
router.get('/', function (req, res, next) {
  let token = null;
  if (req.session.accessToken) token = req.session.accessToken;
  res.render('index', { token: JSON.stringify(token) });
});


module.exports = router;
