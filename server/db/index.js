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
var getUserIdFromName = function(username, callback) {
  connection.query(
    "SELECT userid from users WHERE username ='" + username + "';",
    function(err, rows, fields) {
      if (err) {
        throw err;
      } else {
        if (rows.length === 0) {
          console.log('db index line 32');
        } 
        // console.log('getUserID;')
        rows[0].userid;
      }
    }
  );
};

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
          } 
          resolve(rows[0].userid);
        }
      }
    );
  });
}



module.exports.addMessage = function(username, message, roomname){
  // console.log('line 41', getUserIdFromName(username));
  // console.log('userid', userId);

  connection.query(
    "INSERT into messages (userid, message, roomname) values (" + getUserIdFromName(username) + ",'" + message + "','" + roomname + "');",
    function(err, rows, fields) {
      if (err) {
        throw err;
      } else {
        console.log('inserted user into db');
      }
    }
  );
};

module.exports.addMessageBB = function(userid, message, roomname) {
  return new Promise(function(resolve, reject){
    connection.query(
      "INSERT into messages (userid, message, roomname) values (" + userid + ",'" + message + "','" + roomname + "');",
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

module.exports.getMessages = function(options){};
module.exports.addUser = function(username){
  connection.query(
    "INSERT into users (username) values ('" + username +"');",
    function(err, rows, fields) {
      if (err) {
        throw err;
      } else {
        console.log('inserted user into db');
      }
    }
  );
};
module.exports.getUsers = function(options){};


// XXX: where to connection.end() ??
