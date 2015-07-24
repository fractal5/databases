var mysql = require('mysql');

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


module.exports.addMessage = function(username, message, roomname){};
module.exports.getMessages = function(options){};
module.exports.addUser = function(username){
  connection.query(
    "INSERT into users (username) values ('" + username +"');",
    function(err, rows, fields) {
      if (err) {
        throw err;
      } else {
        console.log('db line 32', rows, fields);
      }
    }
  );
};
module.exports.getUsers = function(options){};


// XXX: where to connection.end() ??
