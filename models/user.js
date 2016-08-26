"use strict";

var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  ;

var UserSchema = new Schema({
  name: { type: String, required: true },
  fbid: { type: String, required: true },
  token: { type: String, required: true },
  nickname: { type: String, required: true },
  gender: { type: String },
  admin: { type: Boolean, required: true, default: false },

  likedDrama: { type: [Schema.Types.ObjectId] },
  joinedChatroom: { type: [Schema.Types.ObjectId] },

  email: { type: String },
  birthday: { type: Date },
  reported: { type: [Schema.Types.ObjectId] }
});

UserSchema.index({ fbid: 1 }, { unique: true });

mongoose.model('users', UserSchema);

var userModel = mongoose.model('users');
module.exports = userModel;