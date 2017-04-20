'use strict';

var xhr2 = new XMLHttpRequest();
xhr2.open('GET', '/server-core/services/authenticate/issessionactive');
xhr2.onload = function() {
	console.log(xhr2);
	if (xhr2.responseText && JSON.parse(xhr2.responseText).active === true) {
		document.getElementById('checking-session').className = 'hidden';
		document.getElementById('userform').className = '';
	} else {
		document.getElementById('checking-session').innerHTML = 'Redirecting to login...';
		window.location.href = window.location.origin + '/#/login?destination=' + btoa('/bjond-setup-users');
	}
}
xhr2.send();

function submitForm() {
	var responseElement = document.getElementById('response');
	responseElement.innerHTML = 'Submitting...';
	responseElement.className = 'response-submit';
	
	var xhr = new XMLHttpRequest();
	xhr.open('POST', '/server-core/services/tempuseredit/update');
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.onload = function() {
		console.log(xhr);
		if (xhr.status === 200) {
			responseElement.innerHTML = 'OK';
			responseElement.className = 'response-success';
		} else {
			responseElement.innerHTML = 'Failed: ' + xhr.responseText;
			responseElement.className = 'response-fail';
		}
	};
	
	var postData = {};
	var inputs = document.getElementById('userform').elements;
	for (var i = 0; i < inputs.length; i++) {
		postData[inputs[i].name] = inputs[i].value;
	}
	
	xhr.send(JSON.stringify(postData));
}

