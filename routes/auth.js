"use strict";

var express = require('express');
var loginCheck = require('../util/login-check');

function setupAuthRoutes(passport) {

  var router = express.Router();

  router.get('/facebook', passport.authenticate('facebook'));

  /* GET users listing. */
  router.get('/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/login_success',
    failureRedirect: '/login_fail'
  }));

  return router;
}

module.exports = setupAuthRoutes;
