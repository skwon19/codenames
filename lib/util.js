const fs = require("fs");
const os = require("os");
const _ = require("underscore");

const WORDS_LIST_FNAME = "./wordlist.txt";
const NUM_WORDS = 25;

const fetchWords = (fname, num_words) => {
    const data = fs.readFileSync(fname, "utf8");
    
    const words = _.chain(data.split(os.EOL))
        .filter((el) => { return el !== "" })
        .shuffle()
        .first(num_words)
        .value();

    return words;
};

console.log(fetchWords(WORDS_LIST_FNAME, NUM_WORDS));
