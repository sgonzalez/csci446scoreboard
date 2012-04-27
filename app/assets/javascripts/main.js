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
	
	fetch(1);
	fetch(2);
}

function addHighScore(score, name) {
	highScores.push([score, name]);
}

function fetch(id){
	$.ajax({
		url: "http://localhost:3000/scores/" + id + ".js",
		dataType: "jsonp",
		type: "GET",
		processData: false,
		contentType: "application/json",
		success: function(data) {
			$('#' + id).
			append('<li>Name: ' + data['name'] + '</li>');
			append('<li>Points: ' + data['points'] + '</li>');
		}
	});
};

function populateHighScores(scores) {
	$('div#highScores').html('');
	for (var i = 0; i < scores.length; ++i) {
		$('div#highScores').append("<p>" + scores[i][0] + " " + scores[i][1] + "</p>");
	}
}

function updateScore(score) {
	$('h2#score span#guessesLeft').html(score.toString());
}