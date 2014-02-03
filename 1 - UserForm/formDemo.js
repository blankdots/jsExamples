//Create and initialize the "User" Object with the following properties 
//name, email, birthday, password, telephone, city, country
function User (theName,theEmail,theAge) {
	this.name = theName;
	this.email = theEmail;
	this.age = theAge;
	this.city = "";
	this.country = "";
	this.password = [];
	this.telephone = 0;
}

//User and associated functions
User.prototype = {
	constructor: User,
	updateName: function (newName){
		this.name = newName;
	},
	updateAge: function (birthdayInput){
		/* 
		Note: because we are controlling the input we know how to "split", and also from where 
		to get the year. The user most of the time does not provide the right information 
		thus in practice it is necessary to verify all cases of date input.
		*/   
		var birthdayArray = birthdayInput.split ('/');
		var birthyear = birthdayArray[2];
		var today = new Date();

		var currentyear = today.getFullYear();
		this.age = currentyear - birthyear;
	},
	updateCity: function (newCity){
		this.city = newCity;
	},
	updateCountry: function (newCountry){
		this.country = newCountry;
	},
	updatePassword: function (newPassword) {
		//it is not nice to store password without any form of "encryption"
		//we will store each character of the password in an array backwards 
		var passwordLength = newPassword.length;
		var temp =[];
		for (var i =0; i < passwordLength; i++) {
			temp.push(newPassword[i]);
		}
		this.password = temp.reverse(); // find more about reverse
	},
	updateEmail: function (newEmail) {
		this.email = newEmail;
	},
	updateTel: function (newTel) {
		this.telephone = newTel;
	},
	showInfo: function () {
		return "We know this about the user:" + this.name + " " + this.age + " " + this.email;
	}
};
// changes in constructor syntax because we defined the constructor in User.prototype
var firstUser = new User();

//let us handle the form inputs
var   firstName = document.getElementById('firstName')
	, lastName = document.getElementById('lastName')
	, email = document.getElementById('email')
	, birthday = document.getElementById('birthday')
	, country = document.getElementById('country')
	, city = document.getElementById('city')
	, password = document.getElementById('password')
	, telephone = document.getElementById('telephone')
	, progress = document.getElementById('progress')
	, toStep2 = document.getElementById('toStep2')
	, toStep3 = document.getElementById('toStep3')
	, submit = document.getElementById('submit')
	, finalSubmit	= document.getElementById('finalSubmit')
	, valuesGroup = document.getElementsByTagName('fieldset')
	, checkit	= document.getElementById('checkit');

//verify e-mail via regexp
var emailRegexp = new RegExp ("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$");

toStep2.setAttribute('disabled', true);
toStep3.setAttribute('disabled', true);
finalSubmit.setAttribute('disabled', true);

//Note: most surely there is a better way to this for now this is the right one

function updateProgress (){
	progress.value += 30;
}

function updateWizardStep1() {

	if (lastName.value !== "" && emailRegexp.test(email.value) === true ){
		toStep2.removeAttribute('disabled');
		toStep2.addEventListener('click', function (){
			valuesGroup[0].setAttribute('hidden', false);
			valuesGroup[1].removeAttribute('hidden');
			toStep2.setAttribute('hidden', true);
			toStep3.removeAttribute('hidden');
			updateProgress();
		});
	}
}
function updateWizardStep2() {
	if (birthday.value !== "" && country.value !== "" && city.value !== ""){
		toStep3.removeAttribute('disabled');
		toStep3.addEventListener('click', function (){
			valuesGroup[1].setAttribute('hidden', false);
			valuesGroup[2].removeAttribute('hidden');
			toStep3.setAttribute('hidden', true);
			updateProgress();
		});
	}
}
function updateWizardStep3() {
	if (password.value !== "") {
	checkit.addEventListener('click', function(){
		getData ("text.txt","result");
		submit.removeAttribute('hidden');
	});
	updateProgress();
	}
}

function print (){
	var printPlace = document.getElementById('yourData');
	printPlace.removeAttribute('hidden');
	printPlace.innerHTML = '<ul><li>' + firstUser.name + '</li><li>' + firstUser.age + '</li><li>'+ firstUser.email + '</li></ul>';
	console.log(firstUser.showInfo);
	for (var i = 0; i < valuesGroup.length; i++) {
		valuesGroup[i].setAttribute('hidden', false);
	}
	finalSubmit.removeAttribute('disabled');
}
// we need the full name of the user: firstName + lastName
lastName.addEventListener('change', function () {getFullName();});

function getFullName () {
	var firstNameOnly;
	
	if (firstName.value){
		firstName.addEventListener('change', function (){ 
			firstNameOnly = firstName.value;
		});
		firstUser.updateName(firstName.value + " " + lastName.value);
	}
}

//adding "onChange" event listeners to elements in order to get User information
email.addEventListener('change', function () { 
	firstUser.updateEmail(email.value);
	updateWizardStep1();
});
birthday.addEventListener('change', function () { 
	firstUser.updateAge(birthday.value);
	updateWizardStep2();
});
country.addEventListener('change', function () { 
	firstUser.updateCountry(country.value);
	updateWizardStep2();
});
city.addEventListener('change', function () { 
	firstUser.updateCity(city.value);
	updateWizardStep2();
});
password.addEventListener('change', function () { 
	firstUser.updatePassword(password.value);
	updateWizardStep3();
});
telephone.addEventListener('change', function () { 
	firstUser.updateTel(telephone.value);
});

submit.addEventListener('click', print);


//Small XMLHTTPRequest Example
var request;

if (window.XMLHttpRequest) {
	request = new XMLHttpRequest();
} else if (window.ActiveXObject) {
	request = new ActiveXObject("Microsoft.XMLHTTP"); // if you want to support your app on IE
}

function getData (url,result){
	if (request) {
		var obj = document.getElementById(result);
		request.open("GET", url, true);
		//tells you what is going on with the data when you are making the request
		// readyState property values
		// 0 - uninitialized
		// 1 - loading
		// 2 - loaded
		// 3 - interactive data is being download but you can interact with it
		// 4 - complete
		// status property is the HTTP status 200 = 0K ; 404 = NOT FOUND;
		request.onreadystatechange = function () {
			if (request.readyState == 4 && request.status == 200) {
				obj.innerHTML = request.responseText;
			}
		};

		request.send(null);
	}
	else {alert ('No Ajax Support :(');
}
}