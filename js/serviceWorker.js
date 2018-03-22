class updates{

	constructor() {
		let instance;
	}


/**
 * @description register service 
 * worker 
 * @call other function based on 
 * workerState
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
 * @description notify the user that there is an update
 * @param {Object} serviceWorker object
 * @call the function that show update 
 * buttons
 */

 notifyUser(worker) {
	this.showUpdateButtons();
	this.instance = worker;
}


/**
 * @description check update state
 * @param {Object} serviceWorker object
 * @call the function that show update 
 * buttons
 */

 checkState(worker) {
 	let thiss = this;
	worker.addEventListener('statechange', function() {
		if(worker.state == 'installed') {
			thiss.showUpdateButtons();
			thiss.instance = worker;
		}
	})
}

/**
 * @description show buttons to query client 
 * response to update
 * @Use Js Select Statement to show the 
 * relative Elements
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
 * @description close update box  
 * @Use Js Select Statement to close the 
 * relative Elements by removing class
 */

 closeBox() {
	let buttons = document.getElementById('updateWrapper');
	buttons.classList.remove('changDisplay');
}

/**
 * @description skip waiting and take control
 * @Events send Message Event
 * @call the function that close the update 
 */

accept() {
	classInstance.instance.postMessage({action: 'skipWaiting'});
	let body =  document.getElementById('body');
	body.removeAttribute('aria-hidden');
	location.reload();
	classInstance.closeBox();
}

/**
 * @description ignore update Request
 * @call the function that close the update
 * @Use selectStatment to remove attribute 
 * hiding the body while modal is open 
 */


reject() {
	classInstance.closeBox();
	let body =  document.getElementById('body');
	body.removeAttribute('aria-hidden');
}
}

/**
 * @description instantiate class
 * @call function to register ServiceWorker
 */

let classInstance = new updates();
window.classInstance = classInstance;
classInstance.registerWorker();

/**
 * @description update response click events
 * @Events listen to click events
 * @call function to update or reject 
 * serviceWorker update
 */

document.getElementById("update1").addEventListener("click", classInstance.accept);
document.getElementById("update2").addEventListener("click", classInstance.reject);

/**
 * @description modal trap box logic 
 * to update buttons
 * @Events onKeyDown event used to control
 * focus in the page
 */

let button2 = document.getElementById('update2');
	button2.onkeydown = function(key) {
		if(key.keyCode == '9') {
			key.preventDefault();
			document.getElementById('update1').focus();
		}
		if(key.keyCode == '27') {
			let buttons = document.getElementById('update-Wrapper');
			buttons.classList.remove('changDisplay');
		} 
	} 
	
/**
 * @description modal trap box logic 
 * to the update buttons
 * @Events onKeyDown event used to control
 * focus in the page
 */

	let button1 = document.getElementById('update1');
	button1.onkeydown = function(key) {
		if(key.keyCode == '9') {
			key.preventDefault();
			document.getElementById('update2').focus();
		}
		if(key.keyCode == '27') {
			let buttons = document.getElementById('update-Wrapper');
			buttons.classList.remove('changDisplay');
		} 
	} 