//const sqlite3 = require('sqlite3');
const mysql = require('mysql');
//const db = new sqlite3.Database('./database.sqlite');
//db.run('CREATE TABLE IF NOT EXISTS messages (id INTEGER NOT NULL PRIMARY KEY, content TEXT NOT NULL)');
//mysqlusername:chatroom
//mysqlpassword:chetroomchetpassword6
const con = mysql.createConnection({
    host: "localhost",
    user: "chatroom",
    password: "chetroomchetpassword6",
    database: 'msgdatabase'
  });
  //for this to work, there needs to be a database called msgdatabase. (It can be blank so long as you run this script)
  //there needs to be a user called "chatroom" with the password "chetroomchetpassword6" that has all permissions on msgdatabase
  con.connect(function(err){
      if(err) throw err;
      console.log('Connected!');
      const sql = "CREATE TABLE IF NOT EXISTS messages (id INT AUTO_INCREMENT PRIMARY KEY, message VARCHAR (1000));"
      con.query(sql, function(err, result){
          if(err){
              throw err;
          }
          console.log('table created!');
      })
  })

