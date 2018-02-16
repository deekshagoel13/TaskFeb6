var express=require('express');
var bodyParser=require('body-parser');
var mongoose=require('mongoose');
var dbconfig=require('./app/config/dbconfig');
var cors=require('cors');
var validator=require('express-validator');
mongoose.connect(dbconfig.url);
var db=mongoose.connection;
db.on('error',()=>{
    console.log('There is an error in connecting with database..');
})

db.once('open',()=>{
    console.log('Successfully connected to database.');
})

var app=express();
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(validator());

require('./app/routes/person.route')(app);



app.listen(3000,()=>{
    console.log('server is started');
})