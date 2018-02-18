function newBlank(word) {
	this.blanks = [];
	this.word = word;
}

newBlank.prototype.blankLine = function() {
		const split_word = this.word.split('')
		split_word.forEach(() => {
			this.blanks.push("_");
		})
		return this.blanks
};

module.exports = newBlank