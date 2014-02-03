$( document ).ready(function() {
	var   counter = 0
		, arrayLength = 0;
	function loadQuestions (count) {
	$.getJSON( "questions.json", function( data ) {
		// console.log(data);
	})
	.done(function(data){
		var   question = ''
			, answer = '';
		$.each( data, function( key, val ) {
			if (key === counter) {	
			question += '<h3 class="cardTitle">Question</h3>' + '<p>' + val.Q + '</p>';
			answer += '<h3 class="cardTitle">Answer</h3>' +  '<p>' + val.A + '</p>';
			//console.log(key, val);
			};
		});
		$('#questions').html(question);
		$('#answers').html(answer);
		arrayLength = data.length;
	});
	}
	loadQuestions(counter);
	$('#next').click(function(){
		loadQuestions(counter);
		$('#flashCard').removeClass('flipped');
		if (counter < arrayLength-1)
			counter ++;
		else
			counter=0;
		//console.log(counter + ' ' + arrayLength);
	});
	$('#flip').click(function () {
		$('#flashCard').toggleClass('flipped');
		// console.log("clicked");
	});
});

//Reading material http://stackoverflow.com/questions/2067472/what-is-jsonp-all-about