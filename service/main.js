!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=3)}([function(e,t,n){"use strict";!function(){function t(e){return new Promise(function(t,n){e.onsuccess=function(){t(e.result)},e.onerror=function(){n(e.error)}})}function n(e,n,r){var o,a=new Promise(function(a,s){t(o=e[n].apply(e,r)).then(a,s)});return a.request=o,a}function r(e,t,n){n.forEach(function(n){Object.defineProperty(e.prototype,n,{get:function(){return this[t][n]},set:function(e){this[t][n]=e}})})}function o(e,t,r,o){o.forEach(function(o){o in r.prototype&&(e.prototype[o]=function(){return n(this[t],o,arguments)})})}function a(e,t,n,r){r.forEach(function(r){r in n.prototype&&(e.prototype[r]=function(){return this[t][r].apply(this[t],arguments)})})}function s(e,t,r,o){o.forEach(function(o){o in r.prototype&&(e.prototype[o]=function(){return e=this[t],(r=n(e,o,arguments)).then(function(e){if(e)return new u(e,r.request)});var e,r})})}function i(e){this._index=e}function u(e,t){this._cursor=e,this._request=t}function c(e){this._store=e}function l(e){this._tx=e,this.complete=new Promise(function(t,n){e.oncomplete=function(){t()},e.onerror=function(){n(e.error)},e.onabort=function(){n(e.error)}})}function d(e,t,n){this._db=e,this.oldVersion=t,this.transaction=new l(n)}function p(e){this._db=e}r(i,"_index",["name","keyPath","multiEntry","unique"]),o(i,"_index",IDBIndex,["get","getKey","getAll","getAllKeys","count"]),s(i,"_index",IDBIndex,["openCursor","openKeyCursor"]),r(u,"_cursor",["direction","key","primaryKey","value"]),o(u,"_cursor",IDBCursor,["update","delete"]),["advance","continue","continuePrimaryKey"].forEach(function(e){e in IDBCursor.prototype&&(u.prototype[e]=function(){var n=this,r=arguments;return Promise.resolve().then(function(){return n._cursor[e].apply(n._cursor,r),t(n._request).then(function(e){if(e)return new u(e,n._request)})})})}),c.prototype.createIndex=function(){return new i(this._store.createIndex.apply(this._store,arguments))},c.prototype.index=function(){return new i(this._store.index.apply(this._store,arguments))},r(c,"_store",["name","keyPath","indexNames","autoIncrement"]),o(c,"_store",IDBObjectStore,["put","add","delete","clear","get","getAll","getKey","getAllKeys","count"]),s(c,"_store",IDBObjectStore,["openCursor","openKeyCursor"]),a(c,"_store",IDBObjectStore,["deleteIndex"]),l.prototype.objectStore=function(){return new c(this._tx.objectStore.apply(this._tx,arguments))},r(l,"_tx",["objectStoreNames","mode"]),a(l,"_tx",IDBTransaction,["abort"]),d.prototype.createObjectStore=function(){return new c(this._db.createObjectStore.apply(this._db,arguments))},r(d,"_db",["name","version","objectStoreNames"]),a(d,"_db",IDBDatabase,["deleteObjectStore","close"]),p.prototype.transaction=function(){return new l(this._db.transaction.apply(this._db,arguments))},r(p,"_db",["name","version","objectStoreNames"]),a(p,"_db",IDBDatabase,["close"]),["openCursor","openKeyCursor"].forEach(function(e){[c,i].forEach(function(t){t.prototype[e.replace("open","iterate")]=function(){var t,n=(t=arguments,Array.prototype.slice.call(t)),r=n[n.length-1],o=this._store||this._index,a=o[e].apply(o,n.slice(0,-1));a.onsuccess=function(){r(a.result)}}})}),[i,c].forEach(function(e){e.prototype.getAll||(e.prototype.getAll=function(e,t){var n=this,r=[];return new Promise(function(o){n.iterateCursor(e,function(e){e?(r.push(e.value),void 0===t||r.length!=t?e.continue():o(r)):o(r)})})})});var h={open:function(e,t,r){var o=n(indexedDB,"open",[e,t]),a=o.request;return a.onupgradeneeded=function(e){r&&r(new d(a.result,e.oldVersion,a.transaction))},o.then(function(e){return new p(e)})},delete:function(e){return n(indexedDB,"deleteDatabase",[e])}};e.exports=h,e.exports.default=e.exports}()},function(e,t){let n=[];document.addEventListener("DOMContentLoaded",e=>{fetchNeighborhoods(),fetchCuisines()}),window.initMap=(()=>{self.map=new google.maps.Map(document.getElementById("map"),{zoom:12,center:{lat:40.722216,lng:-73.987501},scrollwheel:!1})}),window.onload=updateRestaurants=(()=>{const e=document.getElementById("cuisines-select"),t=document.getElementById("neighborhoods-select"),n=e.selectedIndex,r=t.selectedIndex,o=e[n].value,a=t[r].value;DBHelper.fetchRestaurantByCuisineAndNeighborhood(o,a,(e,t)=>{e?console.error(e):(resetRestaurants(t),fillRestaurantsHTML())})}),fetchNeighborhoods=(()=>{DBHelper.fetchNeighborhoods((e,t)=>{e?console.error(e):(self.neighborhoods=t,fillNeighborhoodsHTML())})}),fillNeighborhoodsHTML=((e=self.neighborhoods)=>{const t=document.getElementById("neighborhoods-select");e.forEach(e=>{const n=document.createElement("option");n.innerHTML=e,n.value=e,t.append(n)})}),fetchCuisines=(()=>{DBHelper.fetchCuisines((e,t)=>{e?console.error(e):(self.cuisines=t,fillCuisinesHTML())})}),fillCuisinesHTML=((e=self.cuisines)=>{const t=document.getElementById("cuisines-select");e.forEach(e=>{const n=document.createElement("option");n.innerHTML=e,n.value=e,t.append(n)})}),fillRestaurantsHTML=((e=self.restaurants)=>{const t=document.getElementById("restaurants-list");let n=alterText();e.forEach(e=>{let t=n.filter(t=>t.id==e.id);e.alter=t[0].alt}),e.forEach(e=>{t.append(createRestaurantHTML(e))}),addMarkersToMap()});let r=0;createRestaurantHTML=(e=>{r++;const t=document.createElement("li"),n=document.createElement("picture"),o=document.createElement("source");o.media="(min-width:767px)",o.srcset=`/images/${e.photograph}-large.jpg 2x, \n  /images/${e.photograph}-large.jpg 1x`;const a=document.createElement("source");a.media="(max-width:766px)",a.srcset=`/images/${e.photograph}-small.jpg 2x, \n  /images/${e.photograph}-small.jpg 1x`;const s=document.createElement("img");s.className="restaurant-img",s.src=`/images/${e.photograph}-small.jpg `,s.alt=e.alter,n.append(o),n.append(a),n.append(s),t.append(n);const i=document.createElement("h2");i.innerHTML=e.name,t.append(i);const u=document.createElement("p");u.innerHTML=e.neighborhood,t.append(u);const c=document.createElement("p");c.innerHTML=e.address,t.append(c);const l=document.createElement("a");l.innerHTML="View Details",l.setAttribute("aria-labelledby",`desc${r}`),l.href=DBHelper.urlForRestaurant(e),t.append(l);const d=document.createElement("span");return d.setAttribute("id",`desc${r}`),d.innerHTML=`details of ${e.name} restaurant`,d.setAttribute("hidden","true"),t.append(d),t}),addMarkersToMap=((e=self.restaurants)=>{e.forEach(e=>{const t=DBHelper.mapMarkerForRestaurant(e,self.map);google.maps.event.addListener(t,"click",()=>{window.location.href=t.url}),n.push(t)})});let o=document.getElementById("restaurants-list");new MutationObserver(function(e){e.forEach(function(e){if(e.removedNodes.length>0&&0==e.target.children.length){let e=document.createElement("span");e.setAttribute("aria-live","assertive"),e.innerHTML="no Items",o.append(e)}})}).observe(o,{attributes:!0,characterData:!0,childList:!0,subtree:!0,attributeOldValue:!0,characterDataOldValue:!0,attributeNewValue:!0}),resetRestaurants=(e=>{self.restaurants=[],document.getElementById("restaurants-list").innerHTML="",n.forEach(e=>e.setMap(null)),n=[],self.restaurants=e}),alterText=(()=>{return[{id:1,alt:"Name Restaurant: Mission Chinese Food Restaurant"},{id:2,alt:"Name Restaurant: Emily Restaurant"},{id:3,alt:"Name Restaurant: Kang Ho Dong Baekjeong Restaurant"},{id:4,alt:"Name Restaurant: Katz's Delicatessen Restaurant"},{id:5,alt:"Name Restaurant: Roberta's Pizza Restaurant"},{id:6,alt:"Name Restaurant: Hometown BBQ Restaurant"},{id:7,alt:"Name Restaurant: Superiority Burger Restaurant"},{id:8,alt:"Name Restaurant: The Dutch Restaurant"},{id:9,alt:"Name Restaurant: Mu Ramen restaurant"},{id:10,alt:"Name Restaurant: Casa Enrique Restaurant"}]})},function(e,t,n){"use strict";n.r(t);var r=n(0),o=n.n(r);class a{constructor(){}static get DATABASE_URL(){return"http://localhost:1337/restaurants"}static openDB(){let e=o.a.open("Restaurants",1,e=>{e.createObjectStore("restaurantObject",{keyPath:"photograph"})});this.db=e}static fetchResults(){fetch(a.DATABASE_URL,{method:"GET"}).then(e=>e.json()).then(e=>{this.db.then(t=>{let n=t.transaction("restaurantObject","readwrite").objectStore("restaurantObject");e.map(e=>{if(null!=e.photograph)return n.put(e)})})}).catch(e=>{const t=`Request failed. Returned status of ${e.status}`;callback(t,null)})}static fetchRestaurants(e){this.db.then(e=>{return e.transaction("restaurantObject").objectStore("restaurantObject").getAll()}).then(t=>{if(t.length>0){e(null,t)}else a.fetchResults()})}static fetchRestaurantById(e,t){a.fetchRestaurants((n,r)=>{if(n)t(n,null);else{const n=r.find(t=>t.id==e);n?t(null,n):t("Restaurant does not exist",null)}})}static fetchRestaurantByCuisine(e,t){a.fetchRestaurants((n,r)=>{if(n)t(n,null);else{const n=r.filter(t=>t.cuisine_type==e);t(null,n)}})}static fetchRestaurantByNeighborhood(e,t){a.fetchRestaurants((n,r)=>{if(n)t(n,null);else{const n=r.filter(t=>t.neighborhood==e);t(null,n)}})}static fetchRestaurantByCuisineAndNeighborhood(e,t,n){a.fetchRestaurants((r,o)=>{if(r)n(r,null);else{let r=o;"all"!=e&&(r=r.filter(t=>t.cuisine_type==e)),"all"!=t&&(r=r.filter(e=>e.neighborhood==t)),n(null,r)}})}static fetchNeighborhoods(e){a.fetchRestaurants((t,n)=>{if(t)e(t,null);else{const t=n.map((e,t)=>n[t].neighborhood),r=t.filter((e,n)=>t.indexOf(e)==n);e(null,r)}})}static fetchCuisines(e){a.fetchRestaurants((t,n)=>{if(t)e(t,null);else{const t=n.map((e,t)=>n[t].cuisine_type),r=t.filter((e,n)=>t.indexOf(e)==n);e(null,r)}})}static urlForRestaurant(e){return`./restaurant.html?id=${e.id}`}static imageUrlForRestaurant(e){return`/images/${e.photograph}`}static imageUrlForRestaurantLarge(e){return`/images/${e.photograph}`}static mapMarkerForRestaurant(e,t){return new google.maps.Marker({position:e.latlng,title:e.name,url:a.urlForRestaurant(e),map:t,animation:google.maps.Animation.DROP})}}window.DBHelper=a,a.openDB()},function(e,t,n){n(2),e.exports=n(1)}]);