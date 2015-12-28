'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const timer = (req, res, next) => {
	console.log(req.body);
	console.log(req.query);
	var d = new Date();
	d = d.toString();
	req.personalTimer = d;

	next();
};

const middleWare = [
	bodyParser.urlencoded({extended: false}),
	bodyParser.json(),
	timer
];

app
.use(middleWare)

app.get('/algo', (req, res, next) => {
	res.send('hiiii :)' + req.personalTimer);
});

app.get('/ola', (req, res, next) => {
	res.send('hey you :)'+ req.personalTimer);
});

app.get('*', (req, res, next) => {
	res.send(req.personalTimer);
});

module.exports = function(){
	app.listen(8081, function(){
		console.log('Listen Ready');
	});
};
