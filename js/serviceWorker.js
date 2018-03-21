class updates{

	constructor() {
		let instance;
	}

/**
 * register service worker 
 */


 registerWorker() {
 	
 	if (!navigator.serviceWorker) return;

 	let index = this;
	navigator.serviceWorker.register('/sw.js')
	.then(function(reg) {
		console.log(reg.scope);
		if(!navigator.serviceWorker.controller) return;

		if(reg.waiting) {
			index.notifyUser(reg.waiting);
			return;
		} 
		if(reg.installing) {
			index.checkState(reg.installing);
			return;
		} 
		reg.addEventListener('updatefound', function() {
      	index.checkState(reg.installing);
    	});
    });
}

/**
 * notify the user that there is an update
 */

 notifyUser(worker) {
	this.showUpdateButtons();
	this.instance = worker;
}



/**
 * check update state
 */

 checkState(worker) {
 	var thiss = this;
	worker.addEventListener('statechange', function() {
		if(worker.state == 'installed') {
			thiss.showUpdateButtons();
			thiss.instance = worker;
		}
	})
}

/**
 * show buttons to query client response to update
 */

 showUpdateButtons() {
	let buttons = document.getElementById('updateWrapper');
	buttons.classList.add('changDisplay');
	let button1 = document.getElementById('update1');
	button1.focus();
	let body =  document.getElementById('body');
	body.setAttribute('aria-hidden',true);
}

/**
 * close update box 
 */

 closeBox() {
	let buttons = document.getElementById('updateWrapper');
	buttons.classList.remove('changDisplay');
}

/**
 * receive client response regarding the update
 */

accept() {
	classInstance.instance.postMessage({action: 'skipWaiting'});
	let body =  document.getElementById('body');
	body.removeAttribute('aria-hidden');
	location.reload();
	classInstance.closeBox();
}
reject() {
	classInstance.closeBox();
	let body =  document.getElementById('body');
	body.removeAttribute('aria-hidden');

}

}

var classInstance = new updates();
window.classInstance = classInstance;
classInstance.registerWorker();


/**
 * update response click events
 */

document.getElementById("update1").addEventListener("click", classInstance.accept);
document.getElementById("update2").addEventListener("click", classInstance.reject);

function closeBox() {
	let buttons = document.getElementById('updateWrapper');
	buttons.classList.remove('changDisplay');
}
/**
 * modal trap box logic for update buttons
 */

let button2 = document.getElementById('update2');
	button2.onkeydown = function(key) {
		if(key.keyCode == '9') {
			key.preventDefault();
			document.getElementById('update1').focus();
		}
		if(key.keyCode == '27') {
			let buttons = document.getElementById('updateWrapper');
			buttons.classList.remove('changDisplay');
		} 
	} 
	
	let button1 = document.getElementById('update1');
	button1.onkeydown = function(key) {
		if(key.keyCode == '9') {
			key.preventDefault();
			document.getElementById('update2').focus();
		}
		if(key.keyCode == '27') {
			let buttons = document.getElementById('updateWrapper');
			buttons.classList.remove('changDisplay');
		} 
	} 