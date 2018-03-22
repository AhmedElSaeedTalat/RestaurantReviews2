import idb from 'idb';

/**
 * @description Common database 
 * helper functions.
 */

class DBHelper {
  
  constructor(){
    let db;
    let check;
  }

  /**
   * @description Database URL.
   * Change this to restaurants.json 
   * file location on your server.
   */

  static get DATABASE_URL() {
    const port = 1337 // Change this to your server port
    return `http://localhost:${port}/restaurants`;
  }

  /**
   * @description open DB to 
   * save Network response
   */

   static openDB() {
    let db = idb.open('Restaurants',1,(upgrade) => {
      let objectStore = upgrade.createObjectStore('restaurantObject',{keyPath:'photograph'});
    });
    this.db = db;
   }

  /**
   * @description Fetch all 
   * restaurants.
   */

static fetchResults() {
   let init = {
      method : "GET",
    }    
   fetch(DBHelper.DATABASE_URL,init).then(response => {
            return response.json();
          }).then(res => {
            this.db.then(db => {
              let tx = db.transaction('restaurantObject','readwrite');
              let store = tx.objectStore('restaurantObject');
              res.map(obj => {
                return store.put(obj);
              })     
            });
          }).catch(errors => {
              const error = (`Request failed. Returned status of ${errors.status}`);
              callback(error, null);
          });
}

  /**
   * @description Fetch all restaurants.
   * @param {Object} call back
   */

  static fetchRestaurants(callback) {
   DBHelper.fetchResults();
    this.db.then(db => {
        let transaction = db.transaction('restaurantObject');
        let storeObj = transaction.objectStore('restaurantObject');
        return storeObj.getAll();
    }).then(response => {
      if(response) {
        let restaurants = response;
        callback(null, restaurants);
    };       
  });
}
 
  /**
   * @description Fetch a restaurant by
   * its ID.
   * @param {Object} id,
   * @param {Object} callback
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
   * @description  Fetch restaurants by a cuisine
   * type with proper error handling.
   * @param {Object} cuisine,
   * @param {Object} callback
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
   * @description Fetch restaurants by a neighborhood
   * with proper error handling.
   * @param {Object} neighborhood,
   * @param {Object} callback
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
   * @description Fetch restaurants by a cuisine
   * and a neighborhood with proper error handling.
   * @param {Object} cuisine,
   * @param {Object} neighborhood,
   * @param {Object} callback
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
   * @description Fetch all neighborhoods with 
   * proper error handling.
   * @param {Object} callback
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
   * @description Fetch all cuisines with
   * proper error handling.
   * @param {Object} callback
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
   * @description FRestaurant page URL.
   * @param {Object} restaurant
   */

  static urlForRestaurant(restaurant) {
    return (`./restaurant.html?id=${restaurant.id}`);
  }

  /**
   * @description Restaurant image URL.
   * @param {Object} restaurant
   */

  static imageUrlForRestaurant(restaurant) {
    return (`/images/${restaurant.photograph}`);
  }

  /**
   * @description Restaurant image URL.
   * @param {Object} restaurant
   */
  
  static imageUrlForRestaurantLarge(restaurant) {
    return (`/images/${restaurant.photograph}`);
  }
  
  /**
   * @description Map marker for a restaurant.
   * @param {Object} restaurant
   * @param {Object} map
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
DBHelper.openDB();