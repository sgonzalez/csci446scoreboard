var guessesLeft;
var actualNum;
var hasWon;
var highScores = new Array([9, "HarryJamesPotter"], [3, "ZedCthulhu"], [2, "NearlyDied"]);

$(function() {
	resetGame();

	$('#guessTheNumber').submit(function() {
		var guess = $("input[name='guess']").val();
		
		if (guess < actualNum.toString()) {
			alert("To Low");
		} else if (guess > actualNum.toString()) {
			alert("To High");
		} else {
		  hasWon = true;
		}
		
		
		if (!hasWon && guessesLeft > 0) {
			guessesLeft--;
			updateScore(guessesLeft);
		} else {
			alert("YOU WIN!");
			
			var name = prompt('What is your name?', 'Anonymous');
			if (name) addHighScore(10-guessesLeft, name)
			else alert("No score added to scoreboard!");
			resetGame();
		}
		
		if (guessesLeft == 0) {
			alert("YOU LOSE!");
			resetGame();
		}
		
		return false;
	});

});

function resetGame() {
	guessesLeft = 10;
	hasWon = false;
	updateScore(guessesLeft);
	populateHighScores(highScores);
	actualNum = Math.floor(Math.random() * 100) + 1
	var guess = $("input[name='guess']").val('');
}

function addHighScore(score, name) {
	highScores.push([score, name]);
}

function populateHighScores(scores) {
	$('div#highScores').html('');
	for (var i = 0; i < scores.length; ++i) {
		$('div#highScores').append("<p>" + scores[i][0] + " " + scores[i][1] + "</p>");
	}
}

function updateScore(score) {
	$('h2#score span#guessesLeft').html(score.toString());
}