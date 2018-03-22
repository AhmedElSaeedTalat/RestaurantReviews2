let restaurants,
  neighborhoods,
  cuisines
let map
let markers = []

/**
 * @description Fetch neighborhoods and 
 * cuisines as soon as the page is loaded.
 */

document.addEventListener('DOMContentLoaded', (event) => {
  fetchNeighborhoods();
  fetchCuisines();
});

/**
 * @description Initialize Google map, 
 * called from HTML.
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
 * @description Update page and map for
 * current restaurants.
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

/**
 * @description Fetch all neighborhoods 
 * and set their HTML.
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
 * @description Set neighborhoods HTML.
 * @param {Object} neighborhoods
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
 * @description Fetch all cuisines 
 * and set their HTML.
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
 * @description Set cuisines HTML. 
 * and set their HTML.
 * @param {Object} cuisines
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
 * @description Create all restaurants 
 * HTML and add them to the webpage
 * @param {Object} restaurants
 */

  fillRestaurantsHTML = (restaurants = self.restaurants) => {
  const ul = document.getElementById('restaurants-list');
  restaurants.forEach(restaurant => {
    ul.append(createRestaurantHTML(restaurant));
  });
  addMarkersToMap();
}
let counter = 0; 

/**
 * @description create restaurant HTML.
 * @param {Object} restaurant
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
 * @description Add markers for current
 * restaurants to the map.
 * @param {Object} restaurants
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
 * @description check if there 
 * is no results for items 
 * @Events mutation used to detect changes 
 * On nodes and add Element to convey the message
 */

 let Items = document.getElementById('restaurants-list');

 let mutations = new MutationObserver(function(mutations){
  mutations.forEach(function(mutation){
    if(mutation.removedNodes.length > 0 && mutation.target.children.length == 0) {
          let alert = document.createElement('span');
          alert.setAttribute('aria-live','assertive');
          alert.innerHTML = 'no Items';
          Items.append(alert);
    }
  });
 });

/**
 * @description observe dom for
 * changes
 */

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
 * @description Clear current restaurants,
 * their HTML and remove their map markers.
 * @param {Object} restaurants
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
