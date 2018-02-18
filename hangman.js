// GLobal variables

var wins = 0;
var losses = 0;
var progress = [];
var wrongGuess = [];
var randomWords = require('random-words');
var randomWord = randomWords();
var wordGen = require('./word')
var word = new wordGen(randomWord)
console.log(word.blankLine())
console.log(word.word)