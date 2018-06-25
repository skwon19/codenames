// const http = require('http');

// const server = http.createServer(function(req, res) {
// 	res.end('Hello, world!');
// });

// const port = 3000;
// server.listen(port, function() {
// 	console.log('Server running on port: ' + port);
// });

const http = require('http');
const express = require('express');

const app = express();

app.get('/', function(req, res) {
	res.send('Hello, world!');
});

const port = 3000;

const server = http.Server(app);
server.listen(port, function() {
	console.log('Server running on port: ' + port);
});