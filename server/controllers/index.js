var models = require('../models');
var bluebird = require('bluebird');
var urlParse = require('url').parse;
var db = require('../db');


module.exports = {
  messages: {
    get: function (req, res) {}, // a function which handles a get request for all messages
    post: function (req, res) { 
      console.log("message post req body: ", req.body);
      db.getUserIdFromNameBB(req.body.username)
      .then(function(userId) {
        db.addMessageBB(userId, 'hello', 'lobby');
      })
      .then(function() {
        res.end();
      })
      .catch(function(err) {
        // send error message
        console.log('error posting message', err);
      });
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {
      var path = urlParse(req.url);
      var username = req.body.username;
      db.addUser(username);
      res.end();
    }
  }
};

