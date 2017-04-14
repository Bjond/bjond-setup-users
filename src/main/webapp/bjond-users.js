'use strict';

function submitForm() {
	var responseElement = document.getElementById('response');
	responseElement.innerHTML = 'Submitting...';
	
	var xhr = new XMLHttpRequest();
	xhr.open('POST', '/server-core/services/tempuseredit/update');
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.onload = function() {
		console.log(xhr);
		if (xhr.status === 200) {
			responseElement.innerHTML = 'OK';
		} else {
			responseElement.innerHTML = 'Failed: ' + xhr.responseText;
		}
	};
	
	var postData = {};
	var inputs = document.getElementById('userform').elements;
	for (var i = 0; i < inputs.length; i++) {
		postData[inputs[i].name] = inputs[i].value;
	}
	
	xhr.send(JSON.stringify(postData));
}

