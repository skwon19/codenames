"use strict";

const _ = require("underscore");
const util = require("./util.js");

const CardStatus = {
  "UNFLIPPED": "unflipped",
  "FLIPPED": "flipped"
};

const CardColor = {
  "RED": "red",
  "BLUE": "blue",
  "NEUTRAL": "neutral",
  "BLACK": "black"
};

const TeamTurn = {
  "RED": "red",
  "BLUE": "blue"
};

class Board {
  constructor(fname, num_words) {
    const words = util.fetchWords(fname, num_words);
    const status = Array(num_words).fill(CardStatus.UNFLIPPED);

    const num_black = 1;
    const num_neutrals = (num_words - num_black) / 3 - 1;
    const num_red = (num_words - num_black) / 3;
    // for now, blue team always goes first and has one extra turn
    const num_blue = (num_words - num_black) / 3 + 1;

    const colors = _(
      Array(num_words)
        .fill(CardColor.BLACK, 0, 1)
        .fill(CardColor.NEUTRAL, 1, num_neutrals+1)
        .fill(CardColor.RED, num_neutrals+1, num_neutrals+num_red+1)
        .fill(CardColor.BLUE, num_neutrals+num_red+1)
      ).shuffle();

    this.board = _(
      Array(num_words).fill({})
    ).map((el, idx) => {
       return {
         word: words[idx],
         status: status[idx],
         color: colors[idx]
       }
    });
    // for now, blue team always goes first and has one extra turn
    this.turn = TeamTurn.BLUE;
  }


  switchTurn() {
    switch(this.turn) {
      case TeamTurn.BLUE:
        this.turn = TeamTurn.RED;
        break;
      case TeamTurn.RED:
        this.turn = TeamTurn.BLUE;
        break;
      default:
        throw "Invalid Team Turn";
    }
  }


  flipCard(idx) {
    switch(this.board[idx].status) {
      case CardStatus.UNFLIPPED:
        this.board[idx].status = CardStatus.FLIPPED;
        switch(this.board[idx].color) {
          case CardColor.BLUE:
            switch(this.turn) {
              case TeamTurn.BLUE:
                break;
              case TeamTurn.RED:
                this.switchTurn();
                break;
              default:
                throw "Invalid Team Turn";
            }
            break;
          case CardColor.RED:
            switch(this.turn) {
              case TeamTurn.BLUE:
                this.switchTurn();
                break;
              case TeamTurn.RED:
                break;
              default:
                throw "Invalid Team Turn";
            }
            break;
          case CardColor.BLACK:
            throw "GAME OVER";
          case CardColor.NEUTRAL:
            this.switchTurn();
            break;
          default:
            throw "Invalid Card Color";
        }
        break;
      case CardStatus.FLIPPED:
        break;
      default:
        throw "Invalid Card Status";
    }
  }
}

module.exports = Board;
