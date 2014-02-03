jQuery(document).ready(function (){

function openStreetMap(lat, longi){
var map = L.map('map').setView([lat, longi], 15)
  , popup = L.popup()
  , apiKey = ''; //your API key

//add your API-key
  L.tileLayer('http://{s}.tile.cloudmade.com/'+apiKey+'/997/256/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>'
  }).addTo(map);

  L.marker([lat, longi]).addTo(map)
  .bindPopup("Your approximative Location").openPopup();
}

function forecast(lat, longi){
var apiKey = '' //your API key
  , url = 'https://api.forecast.io/forecast/'
  , data; 

  jQuery.getJSON(url + apiKey + "/" + lat + "," + longi + "?units=si" + "&"+ "callback=?", function(data) {
    //console.log(data);
    var humidity = data.currently.humidity*100
      , windSpeed = Math.round(data.currently.windSpeed*3.6);
    jQuery('#temperature').html('Temperature: '+data.currently.temperature+' &#8451');
    jQuery('#wind').html('Wind Speed: '+windSpeed+' km/h');
    jQuery('#humidity').html('Humidity: '+humidity+' %');
    jQuery('#summary').html('Summary: '+data.hourly.summary);
  });
}

var ipGeolocation = function (){
  var url = 'http://freegeoip.net/json/';

  jQuery.getJSON(url, function(data) {
    //console.log(data);
    jQuery('#ipGeo').html('Surfing the Web from: '+data.city+', '+data.country_name);
  });
}
  
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position){
  var   latitude
      , longitude;       

  latitude = position.coords.latitude;
  longitude = position.coords.longitude;    
            
  openStreetMap(latitude,longitude);
  forecast(latitude,longitude);
  ipGeolocation();
  }, function(error) {
                console.log('Error occurred. Error code: ' + error.code);         
            },{timeout:50000});
        }else {
      alert("Geolocation API is not supported in your browser. :(");
  }
});