//require in our dependencies
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
const http = require('http');
const mysql = require('mysql');
//the app
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const PORT = 5000;
const path = __dirname;
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

function submitMessage(messageText){
   
        const processedMessage = messageText.replace(/[']/g,"''");
        const sql = `INSERT INTO messages (message) VALUES('${processedMessage}');`;
        con.query(sql, function(error, result){
            if (error){
                throw error;
            }
            console.log(`Inserted ${processedMessage} into the table`);
        })

    
    /*db.run('INSERT INTO TABLE messages (content) VALUES($messageText)', {$messageText:messageText}, (error) =>{
        if(error){
            next(error)
        }
    });*/
}
function emitInfo(){
    //db.all('SELECT * FROM messages ORDER BY id DESC LIMIT 36',(error,rows)=>{
        
            
            con.query('SELECT * FROM messages ORDER BY id DESC LIMIT 36;', function(err, results, fields){
                if(err){
                    throw err;
                }
                //console.log(results);
                //console.log("fields" + JSON.stringify(fields));
                const msgs = JSON.parse(JSON.stringify(results));
                //console.log("msgs: " + msgs);
                io.emit('chat message', msgs);
            })
}
       
    //})

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
        //console.log(req.body);
        console.log(req.body.msg);
        if(req.body.msg){
            submitMessage(req.body.msg);
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