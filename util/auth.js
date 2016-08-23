"use strict";

var FbStrategy = require('passport-facebook').Strategy;
var authConfig = require('../config/auth');
var rp = require('request-promise');
var url = require('../config/url').url;

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
      // save accessToke to user table
      rp({
        method: 'GET',
        uri: url + '/api/v1/users?fbid=' + profile.id,
        json: true
      }).then(function (result) {
        console.log(result);
        // user found, update token
        return rp({
          method: 'PUT',
          uri: url + '/api/v1/users/' + result.value + '/token',
          body: {
            token: accessToken
          },
          json: true
        });
      }).catch(function (err) {
        if (101 === err.error.status) {
          // user not found, create user
          console.log(err.error);
          return rp({
            method: 'POST',
            uri: url + '/api/v1/users',
            form: {
              fbid: profile.id,
              name: profile.name,
              gender: profile.gender,
              email: profile.email,
              token: accessToken
            },
            json: true
          });
        } else {
          console.log(err.error);
          throw new Error('unexpected');
        }
      }).then(function (result) {
        console.log(result);
      }).catch(function (err) {
        console.log(err);
      });

      done(null, accessToken);
    }
  ));
}