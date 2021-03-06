var guessesLeft;
var actualNum;
var hasWon;
var highScores = new Array();//[9, "HarryJamesPotter"], [3, "ZedCthulhu"], [2, "NearlyDied"]);
var server = "http://pure-mist-2350.herokuapp.com/scores";

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
			if (name) { pushScoreToServer(10-guessesLeft, name); pauseComp(100); }
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
	actualNum = Math.floor(Math.random() * 100) + 1;
	var guess = $("input[name='guess']").val('');
	
	fetch();
}

function pausecomp(ms) {
	ms += new Date().getTime();
	while (new Date() < ms){}
}

function addHighScore(score, name) {
	highScores.push([parseInt(score), name]);
}

function pushScoreToServer(score, name) {
	$.post(server, { "name": name, "points": parseInt(score) } );
}

function fetch(){
	$.ajax({
		url: server,
		dataType: "jsonp",
		type: "GET",
		processData: false,
		contentType: "application/json",
		success: function(data) {
			for (var i = 0; i < data.length; i++) { 
				//$('#1').append('<li>Name: ' + data[i]['name'] + '</li>').append('<li>Points: ' + data[i]['points'] + '</li>');
				addHighScore(data[i].points, data[i].name);
			}
			populateHighScores(highScores);
		}
	});
}

function populateHighScores(scores) {
	$('div#highScores').empty();
	for (var i = 0; i < scores.length; ++i) {
		$('div#highScores').append("<p>" + scores[i][0] + " " + scores[i][1] + "</p>");
	}
}

function updateScore(score) {
	$('h2#score span#guessesLeft').html(score.toString());
}