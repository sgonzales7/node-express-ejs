var express = require('express');
var app = express();
var request = require('superagent');
var bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// index page
app.get('/', function(req, res) {
  res.render('index');
});

app.post('/results', function(req, res) {
  var username = req.body.username;
  request
    .get('https://api.github.com/users/'+username)
      .set('Accept', 'application/json')
      .end(function(err, result){
        // Calling the end function will send the request
        res.render('results', { username: result.body.login || '', image: result.body });
      });
});

app.listen(3000);
console.log('3000 is the magic port');
