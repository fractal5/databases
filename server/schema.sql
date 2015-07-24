CREATE DATABASE chat;

USE chat;

CREATE TABLE users (
  userid mediumint(8) AUTO_INCREMENT,
  username varchar(255),
  PRIMARY KEY (userid)
);

CREATE TABLE messages (
  messageid mediumint(8) AUTO_INCREMENT,
    userid mediumint(8),
    message varchar(255),
    roomname varchar(255),
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (messageid),
    FOREIGN KEY (userid) REFERENCES users(userid)
);

/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

