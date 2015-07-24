var models = require('../models');
var bluebird = require('bluebird');
var urlParse = require('url').parse;
var db = require('../db');


module.exports = {
  messages: {
    get: function (req, res) {}, // a function which handles a get request for all messages
    post: function (req, res) { 
      console.log("routed to messages");
      res.end();
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {
      var path = urlParse(req.url);
      console.log(" users route: ", path.pathname, req.data);
      db.addUser("testUser");
      // res.end()[];
    }
  }
};

