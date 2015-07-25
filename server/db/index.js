var mysql = require('mysql');
var Promise = require('bluebird'); 
var Sequelize = require("sequelize");
var sequelize = new Sequelize("chat", "root", "", {
  host: 'localhost'
});
/* TODO this constructor takes the database name, username, then password.
 * Modify the arguments if you need to */

/* first define the data structure by giving property names and datatypes
 * See http://sequelizejs.com for other datatypes you can use besides STRING. */
 // https://github.com/sequelize/sequelize/issues/741:
 // Forcing primary key to value besides 'id' breaks join.
var User = sequelize.define(
  'users', 
  { userid: { 
      type: Sequelize.INTEGER, 
      primaryKey: true 
    },
  username: Sequelize.STRING,
  },
  {timestamps: false}
);

var Message = sequelize.define('messages', {
  userid: Sequelize.INTEGER,
  messageid: { type: Sequelize.INTEGER, primaryKey: true},
  message: Sequelize.STRING,
  roomname: Sequelize.STRING,
  date: Sequelize.DATE},
  {timestamps: false}
);



module.exports.addUserBB = function(username){
  // return new Promise(function( resolve, reject ){
    var newUser = User.build({username: username})
    return newUser.save();
    
  // });
};

module.exports.getUserIdFromNameBB = function(username) {
    return User.findAll({where: {username: username}});
};

module.exports.addMessageBB = function(userid, message, roomname) {
  var newMessage = Message.build({userid: userid, message: message, roomname: roomname});
  return newMessage.save();
};

module.exports.getMessagesBB = function(options){
  return Message.findAll();
};


    // connection.query(
    //   "INSERT into users (username) values ('" + username +"');",
    //   function(err, rows, fields) {
    //     if (err) {
    //       reject(err);
    //     } else {
    //       resolve(rows, fields);
    //     }
    //   }
    // );

module.exports.getUsers = function(options){};


// XXX: where to connection.end() ??
