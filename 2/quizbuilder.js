var jsonFile = '[{"Q": "What is Javascript?", "A": "Javascript is a dynamic, function based scripting language."},{"Q": "What is HTML?", "A": "HTML is Hypertext Markup language for creating and sharing/displaying information on the Web/inside a Web browser."},{"Q": "What is jQuery?", "A": "jQuery is a popular Javascript library."}] ';

var info = JSON.parse(jsonFile);
var updateQuestions = document.getElementById('questions');
var updateAnswers = document.getElementById('answers');
var nextButton = document.getElementById('next');
var counter = 0;

function dataHandler (info, count) {
var question = '';
var answer = '';

if (count <= info.length) {
	for (key in info[count]) {
		if (info[count].hasOwnProperty(key)){
			if (key === "Q") {
				question += '<p>' + '<span> Question is: </span>' + info[count][key] + '</p>';
				updateQuestions.innerHTML = question;
			} else if (key === "A") {
				answer += '<p>' + info[count][key] + '</p>';
				updateAnswers.innerHTML = answer;
			}
		}
		//  hasOwnProperty() method returns a boolean indicating whether the object has the specified property.
	}
}
}
dataHandler(info, counter);

nextButton.addEventListener('click', function () {
	counter < info.length-1 ? counter ++ : counter=0; //otherwise the counter will just keep on going
	dataHandler(info,counter);
})

