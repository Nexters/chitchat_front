"use strict";

var FbStrategy = require('passport-facebook').Strategy;
var authConfig = require('../config/auth');
var rp = require('request-promise');

module.exports = function (passport) {

  passport.serializeUser(function (user, done) {
    // todo
    console.log(user);
    done(null, user);
  })

  passport.deserializeUser(function (user, done) {
    // todo
    console.log(user);
    done(null, user);
  })

  passport.use(new FbStrategy(authConfig,
    function (accessToken, refreshToken, profile, done) {
      // todo
      // save accessToke to user table
      console.log('accessToken: ' + accessToken);
      console.log('refreshToken: ' + refreshToken);
      console.log('profile: ' + profile);

      rp({
        method: 'GET',
        uri: 'api/v1/users?fbid=' + profile.id,
        json: true
      }).then(function (result) {
        let promise = null;

        if (0 === result.status) {
          // user found, update token
          promise = rp({
            method: 'PUT',
            uri: 'api/v1/users/' + result.value + '/token',
            body: {
              token: accessToken
            },
            json: true
          });
        } else if (101 === result.status) {
          // user not found, create user
          promise = rp({
            method: 'POST',
            uri: 'api/v1/users',
            form: {
              fbid: profile.id,
              name: profile.name,
              gender: profile.gender,
              email: profile.email,
              token: accessToken
            },
            json: true
          });
        }
        console.log(result);
        return promise;
      }).then(function (result) {
        console.log(result);
      }).catch(function (err) {
        console.log(err);
      })

      done(null, accessToken);
    }
  ));
}