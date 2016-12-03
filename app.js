var express = require('express');
var app = express();
var request = require('superagent');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var sendmail = require('sendmail')();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// index page
app.get('/', function(req, res, next) {
  res.render('index');

});

app.get('/sent', function(req, res, next) {
    res.render('sent');
    sendmail({
        from: req.body.name,
        to: 'stephanie.gonzales@usu.edu',
        subject: req.body.email,
        html: req.body.message,
    }, function(err, reply) {
        if(err){
            res.render('error');
        }
        console.log(err && err.stack);
        console.dir(reply);
    });
});


app.listen(3000);
console.log('3000 is the magic port');
