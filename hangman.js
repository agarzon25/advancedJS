// GLobal variables

var randomWords = require('random-words');
var wordGen = require('./word');
var inquirer = require('inquirer');

function startGame() {
	console.log("~~~~~~~~ Welcome to Node Hangman ~~~~~~~~")
	console.log("-----------------------------------------")
	console.log("-------------- Start !!!  ---------------")
	console.log("-----------------------------------------")
	var randomWord = randomWords();
	var newWord = new wordGen(randomWord)
	var newBlank = newWord.blankLine()
	var newsplitWord = newWord.word.split('')
	//console.log(newsplitWord)
	var nextRound = new round(newsplitWord, newBlank)
	nextRound.startRound()
}

function round(word, blanks) {
	this.word = word;
	this.blanks = blanks;
};

round.prototype.startRound = function() {
	if (this.isEqual()) {
		console.log("YOU WIN!!!")
		startGame()
		return
	}
	inquirer.prompt([
	{
		name:'letter',
		message: 'Guess a letter!'
	}
	]).then(guess => {
		this.checkGuess(guess)
	})
};

round.prototype.checkGuess = function(guess) {
	var letterCheck = false
	for (let i=0; i < this.word.length; i++) {
		if (this.word[i] === guess.letter) {
			letterCheck = true;
		}
	}
	if (letterCheck) {
		for (let j=0;j < this.word.length;j++) {
			if (this.word[j] === guess.letter) {
				this.blanks.splice(j,1,guess.letter);
			}
		}
		this.startRound()
	} else {
		console.log("Wrong letter! Guess again!")
		this.startRound()
	}
};

round.prototype.isEqual = function() {
	console.log("##########################################")
	console.log("                 " + this.blanks.toString())
	console.log("##########################################")
	if (this.blanks.toString() === this.word.toString()) {
		return true
	}
};

// Main
startGame()