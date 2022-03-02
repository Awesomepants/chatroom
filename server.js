//require in our dependencies
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
const http = require('http');
const mysql = require('mysql');
const {getRequestIpAddress} = require('./request_ip_address');
const {generateRandomUsername} = require('./generateRandomUsername.js')
//the app
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const users = [{
    name: 'sampleUser',
    ip: 5
}];
const PORT = 5000;
const path = __dirname;
//this is to help us with our edge cases hehehe
const ranges = [
    '\ud83c[\udf00-\udfff]', // U+1F300 to U+1F3FF
    '\ud83d[\udc00-\ude4f]', // U+1F400 to U+1F64F
    '\ud83d[\ude80-\udeff]' // U+1F680 to U+1F6FF
  ];
//const db = new sqlite3.Database('./database.sqlite');
//use our middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded());
app.use(express.static('public'));
app.use(errorHandler());

//initialize our database api

const con = mysql.createConnection({
    host: "localhost",
    user: "chatroom",
    password: "chetroomchetpassword6",
    database: 'msgdatabase'
  });

  function removeInvalidChars(str) {
    str = str.replace(new RegExp(ranges.join('|'), 'g'), '');
    return str;
  }

function getOrGenerateUsername(ip){
    ipAddress = JSON.stringify(ip);
    console.log('the function was called getorGenerateusername');
    let userObject = {};
    let userExists = false;
    const user = users.find((user)=>{
        return user.ip === ipAddress;
    })
    if(!user){
        console.log('userExists evaluated to falsy');
        const username = generateRandomUsername();
        userObject = {
            ip: ipAddress,
            name: username
        }
        users.push(userObject);
    } else {
        userObject = user;
    }
    return userObject.name;
}

function submitMessage(messageText, username){
         
        const processedMessage = `<p class="messageHeader">${username} says: </p> <p class = "messageBody">${removeInvalidChars(messageText).replace(/[']/g,"''")}</p>`;
        const sql = `INSERT INTO messages (message) VALUES('${processedMessage}');`;
        con.query(sql, function(error, result){
            if (error){
                throw error;
            }
            console.log(`Inserted ${processedMessage} into the table`);
        })
}
function emitInfo(){
        
            
            con.query('SELECT * FROM messages ORDER BY id DESC LIMIT 36;', function(err, results, fields){
                if(err){
                    throw err;
                }
                
                
                const msgs = JSON.parse(JSON.stringify(results));
                
                io.emit('chat message', msgs);
            })
}
       

//define all of our routers 
    io.on('connection', (socket) => {
        console.log('a user connected');
        emitInfo();
        //socket.on('chat message', )
        socket.on('disconnect', () => {
            console.log('user disconnected');
        })
    })
    app.post('/',(req, res, next) => {
        const ip = getRequestIpAddress(req);
        console.log(ip);
        const username = getOrGenerateUsername(ip);
        //console.log(req.body);
        console.log(req.body.msg);
        if(req.body.msg){
            submitMessage(req.body.msg,username);
            emitInfo();
            res.status(200).json(req.body.msg);//File(path + '/public/index.html');
        } else {
            res.sendStatus(400);
        }
        
    })
    
    //app.get('/messages', (req, res, next) => {

        
    //})
   
//ready to go!
con.connect(function(error){
    if(error){
        throw error;
    } else {
        server.listen(PORT, () => {
    console.log(`listening on PORT ${PORT}`)
})
    }
})


/*app.listen(PORT, (err) => {
    if(err){
        console.log(err);
    } else {
        console.log(`App is listening on PORT ${PORT}`);
    }
});*/