let restaurant;
let map;

  /**
   * @description Initialize Google map,
   * called from HTML.
   * @param {Object} error
   * @param {Object} restaurant
   */

window.initMap = () => {
  fetchRestaurantFromURL1((error, restaurant) => {
    if (error) { // Got an error!
      console.error(error);
    } else {
      self.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: restaurant.latlng,
        scrollwheel: false
      });
      DBHelper.mapMarkerForRestaurant(self.restaurant, self.map);
    }
  });
}

  /**
   * @description Get current restaurant 
   * from page URL.
   * @param {Object} callback
   */

 window.onload = fetchRestaurantFromURL = (callback) => {
    
    const id = getParameterByName('id');
    DBHelper.fetchRestaurantById(id, (error, restaurant) => {
      self.restaurant = restaurant;
      

      if (!restaurant) {
        console.error(error);
        return;
      }
      fillRestaurantHTML();

      fillBreadcrumb();
    });
  }

 /**
   * @description Get current restaurant 
   * from page URL.
   * @param {Object} callback
   */

fetchRestaurantFromURL1 = (callback) => {

  if (self.restaurant) { // restaurant already fetched!
    callback(null, self.restaurant)
    return;
  }
  const id = getParameterByName('id');
  if (!id) { // no id found in URL
    error = 'No restaurant id in URL'
    callback(error, null);
  } else {
    DBHelper.fetchRestaurantById(id, (error, restaurant) => {
      self.restaurant = restaurant;
      if (!restaurant) {
        console.error(error);
        return;
      }
      callback(null, restaurant);
    });
  }
}

 /**
   * @description Create restaurant HTML
   * and add it to the webpage
   * @param {Object} restaurant
   */

fillRestaurantHTML = (restaurant = self.restaurant) => {
  const name = document.getElementById('restaurant-name');
  name.innerHTML = restaurant.name;

  const address = document.getElementById('restaurant-address');
  address.innerHTML = restaurant.address;

const img = document.getElementById('restaurant-img');
  img.srcset = `/images/${restaurant.photograph}-small.jpg 650w, /images/${restaurant.photograph}-large.jpg 800w`;
  img.src = `/images/${restaurant.photograph}-small.jpg`;
  img.alt = restaurant.alt;

  const cuisine = document.getElementById('restaurant-cuisine');
  cuisine.innerHTML = restaurant.cuisine_type;

  // fill operating hours
  if (restaurant.operating_hours) {
    fillRestaurantHoursHTML();
  }
  // fill reviews
  fillReviewsHTML();
}

 /**
   * @description Create restaurant operating hours
   * HTML table and add it to the webpage.
   * @param {Object} operatingHours
   */

fillRestaurantHoursHTML = (operatingHours = self.restaurant.operating_hours) => {
  
  const hours = document.getElementById('restaurant-hours');

  for (let key in operatingHours) {

    const row = document.createElement('tr');

    const day = document.createElement('td');
    
    day.innerHTML = key;
    row.appendChild(day);

    const time = document.createElement('td');
    time.innerHTML = operatingHours[key];
    row.appendChild(time);

    hours.appendChild(row);
  }
}

 /**
   * @description Create all reviews HTML
   * and add them to the webpage.
   * @param {Object} reviews
   */

fillReviewsHTML = (reviews = self.restaurant.reviews) => {
  const container = document.getElementById('reviews-container');
  const title = document.createElement('h2');
  title.innerHTML = 'Reviews';
  container.appendChild(title);

  if (!reviews) {
    const noReviews = document.createElement('p');
    noReviews.innerHTML = 'No reviews yet!';
    container.appendChild(noReviews);
    return;
  }
  const ul = document.getElementById('reviews-list');
  reviews.forEach(review => {
    ul.appendChild(createReviewHTML(review));
  });
  container.appendChild(ul);
}

 /**
   * @description Create review HTML
   * and add it to the webpage.
   * @param {Object} review
   */

createReviewHTML = (review) => {
  const li = document.createElement('li');
  const name = document.createElement('p');
  name.innerHTML = review.name;
  li.appendChild(name);

  const date = document.createElement('p');
  date.innerHTML = review.date;
  li.appendChild(date);

  const rating = document.createElement('p');
  rating.innerHTML = `Rating: ${review.rating}`;
  li.appendChild(rating);

  const comments = document.createElement('p');
  comments.innerHTML = review.comments;
  li.appendChild(comments);

  return li;
}

 /**
   * @description Add restaurant name to the
   * breadcrumb navigation menu
   * @param {Object} restaurant
   */

 fillBreadcrumb = (restaurant=self.restaurant) => {
  const breadcrumb = document.getElementsByClassName('breadcrumb');
  const li = document.createElement('li');
  li.innerHTML = restaurant.name;
  li.setAttribute("aria-current","page");

  function changeValue(x){
    if(x.matches){
      breadcrumb[0].appendChild(li);
  } else {
      breadcrumb[1].appendChild(li);
  }
  }
  let x = window.matchMedia("(min-width: 767px)");
  changeValue(x);
  x.addListener(changeValue)
  
}

 /**
   * @description Get a parameter by name 
   * from page URL.
   * @param {Object} name
   * @param {Object} url
   */

getParameterByName = (name, url) => {
  if (!url)
    url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`),
    results = regex.exec(url);
  if (!results)
    return null;
  if (!results[2])
    return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

