var   formContainer = document.getElementById('formData')
	, sendData = document.getElementById('sendData');

sendData.addEventListener('click', function () {
	postData();
});

var postData = function postDataFunct() {
    var xhr;
    formData = new FormData(formContainer);
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) {
        xhr = new ActiveXObject("Msxml2.XMLHTTP");
    }
    else {
        throw new Error("Ajax is not supported by this browser");
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status == 200 && xhr.status < 300) {
                document.getElementById('response').innerHTML = xhr.responseText;
                formContainer.style.display = "none";
            }
        }
    }
    var firstname = document.getElementById("firstname").value;

    xhr.open('POST', 'submitform.php');
    /*xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");*/
    xhr.send(formData);
}