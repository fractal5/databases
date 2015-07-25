var models = require('../models');
var bluebird = require('bluebird');
var urlParse = require('url').parse;
var db = require('../db');
var utils = require('../utils');


module.exports = {
  messages: {
    get: function (req, res) {
      db.getMessagesBB()
      .then(function(messages){
        console.log(messages.length);
        console.log(messages[0].getUsers().then(function(users) {console.log(users);}));
        // var sendData = [];
        // for (var i = 0; i < messages.length; i++) {
        //   // TODO

        // }
        utils.sendResponse(res,'' , 200);
      })
      .catch(function(error) {
        console.log('error getting messages', error);
        utils.send404(res);
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) { 
      console.log("message post req body: ", req.body);
      db.getUserIdFromNameBB(req.body.username)
      .then(function(users) {
        if (users.length === 0) {
          utils.send404(res); // XXX : probably not quite the right code
        } else {
          db.addMessageBB(users[0].userid, req.body.message, req.body.roomname)
          .then(function(data){
            utils.sendResponse(res, data, 201);
          })
          .catch(function(error) {
            console.log('getuserid catch', error);
            utils.send404(res);
          });
        }
        console.log('message type',req.body.message, typeof req.body.message);
      })
      .catch(function(err) {
        console.log('error posting message', err);
        utils.send404(res); // XXX : probably not quite the right code
      });
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {
      var path = urlParse(req.url);
      var username = req.body.username;
      console.log('post req for : ', username);
      db.addUserBB(username)
      .then(function(users){
        console.log('addUserBB: ', users);
        utils.sendResponse(res, users, 201);
      })
      .error (function (err) {
        console.log('addUserBB err', err);
        utils.send404(res);
      });  
    }
  }
};

