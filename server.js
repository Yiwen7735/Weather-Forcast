
/* Load packages */
const express = require('express');
const http = require('http');
const https = require('https');
const parser = require('body-parser');
const fetch = require('node-fetch');

const port = process.env.PORT || 80;

/* set up express framework */
var app = express();
app.set('view engine', 'ejs');
app.use(parser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/style')) //for css, probably won't need it

const host = 'api.openweathermap.org';
const api_key = 'b9caedf5b912dc798bac5ec9dc93e438';

async function getJSON(endpoint, city) {
    let res = await fetch(`http://${host}/data/2.5/${endpoint}?q=${city}&appid=${api_key}`);
    let json = await res.json();
    return json;
}

let cities = ["London", "Paris", "Berlin", "Copenhagen", "Madrid", 
			  "New York", "Vancouver", "Tokyo", "Hong Kong", "Sydney"];
const kelvinFactor = -273.15;

/* home page index.html */
app.get('/index', async function(req, res){
    let current = [];
    for (const city of cities) {
		let chunk = await getJSON('weather', city);
		current.push({
			'city': city,
			'weather': `${chunk.weather[0].main} (${chunk.weather[0].description})`,
			'temp': (chunk.main.temp + kelvinFactor).toFixed(1),
			'temp_feel': (chunk.main.feels_like + kelvinFactor).toFixed(1)
		});
	}
	res.render('index.ejs', {current: current});
	
});

/* post request */
app.post("/filter-results", async function(req, res) {
	var filter = {
		city: req.body.city, 
		hours: req.body.hours
	};
	let json = await getJSON('forecast', filter.city);
	let chunk = json.list[filter.hours - 1]; //based on user-selected time
  	results = {
  		'city': filter.city,
  		'hours': req.body.hours * 3, 
  		'weather': `${chunk.weather[0].main} (${chunk.weather[0].description})`,
  		'temp': `${(chunk.main.temp + kelvinFactor).toFixed(1)} 
  				(max ${(chunk.main.temp_max + kelvinFactor).toFixed(1)}, 
  				min ${(chunk.main.temp_min + kelvinFactor).toFixed(1)})`,
	    'temp_feel': (chunk.main.feels_like + kelvinFactor).toFixed(1),
	    'humidity': chunk.main.humidity,
	    'wind': `Speed ${chunk.wind.speed}, Degree ${chunk.wind.deg}`,
	    'visibility': chunk.visibility
  	}
	res.render('filter-results.ejs', {results: results});
});

http.createServer(app).listen(port);

