$(document).ready(function (){

function openStreetMap(lat, long){
var map = L.map('map').setView([lat, long], 15);
var popup = L.popup();
var apiKey = ''; //your API key

//add your API-key
  L.tileLayer('http://{s}.tile.cloudmade.com/'+apiKey+'/997/256/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>'
  }).addTo(map);

  L.marker([lat, long]).addTo(map)
  .bindPopup("Your approximative Location").openPopup();
}

function forecast(lat, long){
var apiKey = ''; //your API key
var url = 'https://api.forecast.io/forecast/';
var data; 

  $.getJSON(url + apiKey + "/" + lat + "," + long + "?units=si" + "&"+ "callback=?", function(data) {
    //console.log(data);
    var humidity = data.currently.humidity*100;
    var windSpeed = Math.round(data.currently.windSpeed*3.6);
    $('#temperature').html('Temperature: '+data.currently.temperature+' &#8451');
    $('#wind').html('Wind Speed: '+windSpeed+' km/h');
    $('#humidity').html('Humidity: '+humidity+' %');
    $('#summary').html('Summary: '+data.hourly.summary);
  });
}

var ipGeolocation = function (){
  var url = 'http://freegeoip.net/json/';

  $.getJSON(url, function(data) {
    //console.log(data);
    $('#ipGeo').html('Surfing the Web from: '+data.city+', '+data.country_name);
  });
}
  
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position){
  var latitude, longitude;       

  latitude = position.coords.latitude;
  longitude = position.coords.longitude;    
            
  openStreetMap(latitude,longitude);
  forecast(latitude,longitude);
  ipGeolocation();
  });
  }else {
      alert("Geolocation API is not supported in your browser. :(");
  }
});