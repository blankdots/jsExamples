var   allWorkers = new Array()
	, resultArea
	, counter = 0;

var startWorker = function startWorkerFunct() {

	if (typeof(Worker) === "undefined") {
		resultAreaElem.value += "Your browser doesn't support HTML5 Web Workers.";

	} else {
		var aWorker = new Worker("echoWorker.js");
		aWorker.addEventListener("message", onMessage, true);
		aWorker.addEventListener("error",   onError, true);

		allWorkers.push(aWorker);
		
		var data = ++counter;
		resultArea.value += "Post: worker " + data + " started at: " + new Date().toTimeString() + "\n";
		aWorker.postMessage({
			"workerCount" : data,
			"time" : "(5 seconds passed)"
		});
	}
}

var cancelWorker = function cancelWorkerFunct () {

	var aWorker = allWorkers.pop();
	if (aWorker != null) {
		aWorker.terminate();
		resultArea.value += "User cancelled most recent worker.\n";
	}
}

function onMessage(e) {
	resultArea.value +=  "Echo: worker " + e.data.count + " finished "+ e.data.timer + " at: " + new Date().toTimeString() + "\n";
}

function onError(e) {
	resultArea.value += "Error [" + e.filename + ", line " + e.lineno + "] " + e.message + "\n";
}

var clearTextarea = function clearTextareaFunct (){
	resultArea.value = "";
}

var onLoad = function onLoadFunct () {
   document.getElementById("startWorkerButton").addEventListener("click", startWorker, true);
   document.getElementById("cancelWorkerButton").addEventListener("click", cancelWorker, true);
   document.getElementById("clearTextarea").addEventListener("click", clearTextarea, true);

   resultArea  = document.getElementById("resultArea");
}


window.addEventListener("load", onLoad, true);