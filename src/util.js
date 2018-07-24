"use strict";

const fs = require("fs");
const os = require("os");
const _ = require("underscore");

const fetchWords = (fname, num_words) => {
  const data = fs.readFileSync(fname, "utf8");
  const words = _.chain(data.split(os.EOL))
    .filter((el) => { return el !== "" })
    .shuffle()
    .first(num_words)
    .value();

  return words;
};

module.exports = { fetchWords };
