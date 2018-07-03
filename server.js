const express = require('express');
require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');
//const apiRoute = require('./routes/api');
var mongoose = require('mongoose');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // support json encoded bodies

//mongoose.promise = global.Promise;
const DbUser = process.env.DB_USER;
const DbPass =  process.env.DB_PASS;
const DbString = process.env.DB_STRING;
mongoose.connect('mongodb://'+DbUser+':'+DbPass+DbString);
var db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error'));
db.once('open',()=>{
    console.log('Hi Mongoose user');
});

require('./models/Cars');

app.get('/',(req,res)=>{
    res.send('Hello World!');
});

app.use('/api', require('./routes/api'));
app.use('/user', require('./routes/user'));


app.use((err, req, res, next)=>{
    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        error: err,
      },
    });
});


app.listen(process.env.PORT || 3000, ()=>{
    console.log('Lights at', process.env.PORT);
});



