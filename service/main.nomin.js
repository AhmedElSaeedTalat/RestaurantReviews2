/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/**
 * Common database helper functions.
 */
class DBHelper {

  /**
   * Database URL.
   * Change this to restaurants.json file location on your server.
   */
  static get DATABASE_URL() {
    const port = 1337 // Change this to your server port
    return `http://localhost:${port}/restaurants`;
  }

  /**
   * Fetch all restaurants.
   */
  static fetchRestaurants(callback) {
    var init = {
      method : "GET",
    }
    fetch(DBHelper.DATABASE_URL,init).then(response => {
      return response.json();
    }).then(res => {
      const restaurants = res;
      callback(null, restaurants);
    }).catch(errors => {
        const error = (`Request failed. Returned status of ${errors.status}`);
        callback(error, null);
    });
  }

  /**
   * Fetch a restaurant by its ID.
   */
  static fetchRestaurantById(id, callback) {
    // fetch all restaurants with proper error handling.
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        const restaurant = restaurants.find(r => r.id == id);
        if (restaurant) { // Got the restaurant
          callback(null, restaurant);
        } else { // Restaurant does not exist in the database
          callback('Restaurant does not exist', null);
        }
      }
    });
  }

  /**
   * Fetch restaurants by a cuisine type with proper error handling.
   */
  static fetchRestaurantByCuisine(cuisine, callback) {
    // Fetch all restaurants  with proper error handling
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        // Filter restaurants to have only given cuisine type
        const results = restaurants.filter(r => r.cuisine_type == cuisine);
        callback(null, results);
      }
    });
  }

  /**
   * Fetch restaurants by a neighborhood with proper error handling.
   */
  static fetchRestaurantByNeighborhood(neighborhood, callback) {
    // Fetch all restaurants
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        // Filter restaurants to have only given neighborhood
        const results = restaurants.filter(r => r.neighborhood == neighborhood);
        callback(null, results);
      }
    });
  }

  /**
   * Fetch restaurants by a cuisine and a neighborhood with proper error handling.
   */
  static fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood, callback) {
    // Fetch all restaurants
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        let results = restaurants
        if (cuisine != 'all') { // filter by cuisine
          results = results.filter(r => r.cuisine_type == cuisine);
        }
        if (neighborhood != 'all') { // filter by neighborhood
          results = results.filter(r => r.neighborhood == neighborhood);
        }
        callback(null, results);
      }
    });
  }

  /**
   * Fetch all neighborhoods with proper error handling.
   */
  static fetchNeighborhoods(callback) {
    // Fetch all restaurants
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        // Get all neighborhoods from all restaurants
        const neighborhoods = restaurants.map((v, i) => restaurants[i].neighborhood)
        // Remove duplicates from neighborhoods
        const uniqueNeighborhoods = neighborhoods.filter((v, i) => neighborhoods.indexOf(v) == i)
        callback(null, uniqueNeighborhoods);
      }
    });
  }

  /**
   * Fetch all cuisines with proper error handling.
   */
  static fetchCuisines(callback) {
    // Fetch all restaurants
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        // Get all cuisines from all restaurants
        const cuisines = restaurants.map((v, i) => restaurants[i].cuisine_type)
        // Remove duplicates from cuisines
        const uniqueCuisines = cuisines.filter((v, i) => cuisines.indexOf(v) == i)
        callback(null, uniqueCuisines);
      }
    });
  }

  /**
   * Restaurant page URL.
   */
  static urlForRestaurant(restaurant) {
    return (`./restaurant.html?id=${restaurant.id}`);
  }

  /**
   * Restaurant image URL.
   */
  static imageUrlForRestaurant(restaurant) {
    return (`/img/${restaurant.photograph}`);
  }

/**
   * Restaurant image URL.
   */
  static imageUrlForRestaurantLarge(restaurant) {
    return (`/images/${restaurant.photoLarge}`);
  }

  /**
   * Map marker for a restaurant.
   */
  static mapMarkerForRestaurant(restaurant, map) {
    const marker = new google.maps.Marker({
      position: restaurant.latlng,
      title: restaurant.name,
      url: DBHelper.urlForRestaurant(restaurant),
      map: map,
      animation: google.maps.Animation.DROP}
    );
    return marker;
  }

}
window.DBHelper = DBHelper;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

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
	navigator.serviceWorker.register('/sw.js',{scope: './'})
	.then(function(reg) {
		
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

classInstance.registerWorker();

/**
 * update response click events
 */

document.getElementById("update1").addEventListener("click", classInstance.accept);
document.getElementById("update2").addEventListener("click", classInstance.reject);

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

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
__webpack_require__(0);
let restaurants,
  neighborhoods,
  cuisines
var map
var markers = []
/**
 * Fetch neighborhoods and cuisines as soon as the page is loaded.
 */
document.addEventListener('DOMContentLoaded', (event) => {
  fetchNeighborhoods();
  fetchCuisines();
});


/**
 * Initialize Google map, called from HTML.
 */

window.initMap = () => {
  let loc = {
    lat: 40.722216,
    lng: -73.987501
  };
  self.map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: loc,
    scrollwheel: false
  });
}

/**
 * Update page and map for current restaurants.
 */
window.onload =  updateRestaurants = () => {
  const cSelect = document.getElementById('cuisines-select');
  const nSelect = document.getElementById('neighborhoods-select');

  const cIndex = cSelect.selectedIndex;
  const nIndex = nSelect.selectedIndex;

  const cuisine = cSelect[cIndex].value;
  const neighborhood = nSelect[nIndex].value;
  
  DBHelper.fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood, (error, restaurants) => {
    if (error) { // Got an error!
      console.error(error);
    } else {
      resetRestaurants(restaurants);
      fillRestaurantsHTML();
    }
  });
}

// updateRestaurants();

/**
 * Fetch all neighborhoods and set their HTML.
 */
  fetchNeighborhoods = () => {
  DBHelper.fetchNeighborhoods((error, neighborhoods) => {
    if (error) { // Got an error
      console.error(error);
    } else {
      self.neighborhoods = neighborhoods;
      fillNeighborhoodsHTML();
    }
  });
}

/**
 * Set neighborhoods HTML.
 */
  fillNeighborhoodsHTML = (neighborhoods = self.neighborhoods) => {
  const select = document.getElementById('neighborhoods-select');
  neighborhoods.forEach(neighborhood => {
    const option = document.createElement('option');
    option.innerHTML = neighborhood;
    option.value = neighborhood;
    select.append(option);
  });
}

/**
 * Fetch all cuisines and set their HTML.
 */
  fetchCuisines = () => {
  DBHelper.fetchCuisines((error, cuisines) => {
    if (error) { // Got an error!
      console.error(error);
    } else {
      self.cuisines = cuisines;
      fillCuisinesHTML();
    }
  });
}

/**
 * Set cuisines HTML.
 */
  fillCuisinesHTML = (cuisines = self.cuisines) => {
  const select = document.getElementById('cuisines-select');

  cuisines.forEach(cuisine => {
    const option = document.createElement('option');
    option.innerHTML = cuisine;
    option.value = cuisine;
    select.append(option);
  });
}



/**
 * Create all restaurants HTML and add them to the webpage.
 */
  fillRestaurantsHTML = (restaurants = self.restaurants) => {
  const ul = document.getElementById('restaurants-list');
  restaurants.forEach(restaurant => {
    ul.append(createRestaurantHTML(restaurant));
  });
  addMarkersToMap();
}
var counter = 0; 
/**
 * Create restaurant HTML.
 */
 createRestaurantHTML = (restaurant) => {
  counter++;

  const li = document.createElement('li');

  const picture = document.createElement('picture');
  
  const source = document.createElement('source');
  
  source.media = '(min-width:767px)';
  source.srcset = `/images/${restaurant.photograph}-large.jpg 2x, 
  /images/${restaurant.photograph}-large.jpg 1x`;

  const source1 = document.createElement('source');

  source1.media = '(max-width:766px)';
  source1.srcset = `/images/${restaurant.photograph}-small.jpg 2x, 
  /images/${restaurant.photograph}-small.jpg 1x`;

  const image = document.createElement('img');

  image.className = 'restaurant-img';
  image.src = `/images/${restaurant.photograph}-small.jpg `;
  image.alt = restaurant.alt;

  picture.append(source);
  picture.append(source1);
  picture.append(image);

  li.append(picture);

  const name = document.createElement('h2');
  name.innerHTML = restaurant.name;
  li.append(name);

  const neighborhood = document.createElement('p');
  neighborhood.innerHTML = restaurant.neighborhood;
  li.append(neighborhood);

  const address = document.createElement('p');
  address.innerHTML = restaurant.address;
  li.append(address);

  const more = document.createElement('a');
  more.innerHTML = 'View Details';
  more.setAttribute('aria-labelledby',`desc${counter}`);
  more.href = DBHelper.urlForRestaurant(restaurant);

  

  li.append(more);

  const desc = document.createElement('span');
  desc.setAttribute('id',`desc${counter}`);
  desc.innerHTML = `details of ${restaurant.name} restaurant`;
  desc.setAttribute('hidden','true');

  li.append(desc);

  return li
}

/**
 * Add markers for current restaurants to the map.
 */
 
  addMarkersToMap = (restaurants = self.restaurants) => {
  restaurants.forEach(restaurant => {
    // Add marker to the map
    const marker = DBHelper.mapMarkerForRestaurant(restaurant, self.map);
    google.maps.event.addListener(marker, 'click', () => {
      window.location.href = marker.url
    });
    markers.push(marker);
  });
}

/**
 * check if there is no results for items
 */

 var Items = document.getElementById('restaurants-list');

 var mutations = new MutationObserver(function(mutations){
  mutations.forEach(function(mutation){
    if(mutation.removedNodes.length > 0){
      if(mutation.target.children.length == 0) {
          const alert = document.createElement('span');
          alert.setAttribute('aria-live','assertive');
          alert.innerHTML = 'no Items';
          Items.append(alert);
      }
    }
    
  });
 });

 mutations.observe(Items,{
   attributes: true,
    characterData: true,
    childList: true,
    subtree: true,
    attributeOldValue: true,
    characterDataOldValue: true,
    attributeNewValue: true,
  });


/**
 * Clear current restaurants, their HTML and remove their map markers.
 */
  resetRestaurants = (restaurants) => {
  // Remove all restaurants
  self.restaurants = [];
  const ul = document.getElementById('restaurants-list');
  ul.innerHTML = '';

  // Remove all map markers
  markers.forEach(m => m.setMap(null));
  markers = [];
  self.restaurants = restaurants;
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);


/***/ })
/******/ ]);