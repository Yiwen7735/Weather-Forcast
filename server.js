
/* Load packages */
const express = require('express');
const http = require('http');
const https = require('https');
const parser = require('body-parser');
const querystring = require('querystring');
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

let cities = ["London", "Berlin", "New York", "Tokyo", "Hong Kong"];
const kelvinFactor = -273.15;

/* home page index.html */
app.get('/index', async function(req, res){
	let current = [];
	for (const city of cities) {
		let w = await getJSON('weather', city);
		current.push({
			"city": city,
			"weather": w.weather[0].description,
			"temp": (w.main.temp + kelvinFactor).toFixed(1),
			"temp_feel": (w.main.feels_like + kelvinFactor).toFixed(1)
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
	res.json(json);

	/**
	 * TODO: Another .ejs page displaying filter results
	 * res.render('.ejs', params);
	 */

});

http.createServer(app).listen(port);

