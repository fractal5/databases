var mysql = require('mysql');
var Promise = require('bluebird'); 
// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

var connection = mysql.createConnection({
  // expects port 3306
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'chat',
});

connection.connect(function(err) {
  // connected! (unless `err` is set)
  if (err) {
    console.log('error');
  } else {
    console.log("db connected");
  }
});

// TODO: return statement isn't being returned b/c inside connection.query.

module.exports.getUserIdFromNameBB = function(username) {
  return new Promise(function (resolve, reject) {
    connection.query(
      "SELECT userid from users WHERE username ='" + username + "';",
      function(err, rows, fields) {
        if (err) {
          reject(err);
        } else {
          // TODO? handle case where userid not found?
          if (rows.length === 0) {
            console.log('db index line 32: userid not found');
          } else {
            console.log('getUserId: ', rows);
            resolve(rows[0].userid);
          }
        }
      }
    );
  });
};

module.exports.addMessageBB = function(userid, message, roomname) {
  return new Promise(function(resolve, reject){
    connection.query(
      'INSERT into messages (userid, message, roomname) values (' + userid + ',"' + message + '","' + roomname + '");',
      function(err, rows, fields) {
        if (err) {
          console.log('addMessage err ', err);
          reject(err);   
        } else {
          console.log('addMessage succeeded', rows);
          resolve(rows, fields);
        }
      }
    );
  });
};

module.exports.getMessagesBB = function(options){
  return new Promise(function(resolve, reject) {
    connection.query(
      'SELECT * from messages',
      function(err, rows, fields) {
        if (err) {
          reject(err)
        } else
          resolve(rows, fields);
      }
    );
  });
};


module.exports.addUserBB = function(username){
  return new Promise(function( resolve, reject ){
    connection.query(
      "INSERT into users (username) values ('" + username +"');",
      function(err, rows, fields) {
        if (err) {
          reject(err);
        } else {
          resolve(rows, fields);
        }
      }
    );
  });
};

module.exports.getUsers = function(options){};


// XXX: where to connection.end() ??
