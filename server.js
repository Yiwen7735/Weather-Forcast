
/* Load packages */
var express = require('express');
var http = require('http');
var parser = require('body-parser');
const port = process.env.PORT || 80;

/* set up express framework */
var app = express();
app.set('view engine', 'ejs');
app.use(parser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/style')) //for css, probably won't need it

/* go to home page index.html */
app.get('/index', function(req, res){
	res.render('index.html');
});

/* post request */
app.post("/filter-results", function(req, res){
	res.json(); //TODO: send data
});


http.createServer(app).listen(port);