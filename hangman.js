// GLobal variables

var wins = 0;
var losses = 0;
var progress = [];
var wrongGuess = [];
var randomWords = require('random-words');
var wordGen = require('./word');
var inquirer = require('inquirer');

// Function to start a new game creates 

function startGame() {
	var randomWord = randomWords();
	var newWord = new wordGen(randomWord)
	var newBlank = newWord.blankLine()
	var newsplitWord = newWord.word.split('')
	console.log(newsplitWord)

}

function round(word, blanks) {
	this.word = word;
	this.blanks = blanks
};

round.prototype.startRound = function() {
	if (this.isEqual()) {
		console.log("YOU WIN!!!")
		//startGame()
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
	console.log(this.blanks)
	if (this.blanks.toString() === this.word.toString()) {
		return true
	}
};

// Main
//startGame()
var nextRound = new round(newsplitWord, newBlank)
nextRound.startRound()