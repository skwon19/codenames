"use strict";

const http = require('http');
const express = require('express');
const Board = require('./board.js');

const WORDS_LIST_FNAME = "./lib/wordlist.txt";
const NUM_WORDS = 25;

const app = express();
const board = new Board(WORDS_LIST_FNAME, NUM_WORDS);

app.get('/', function(req, res) {
  res.send(board.board);
});

app.get('/flip', function(req, res) {
  const idx = parseInt(req.query.idx);
  board.flipCard(idx);
  res.send(board.board);
});

const port = 3000;

const server = http.Server(app);
server.listen(port, function() {
  console.log('Server running on port: ' + port);
});
