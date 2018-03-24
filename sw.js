/**
 * @description naming cache
 * variables
 */

let cachedLinks ='caches';
let cacheImg ='images';
let allCaches = [
	cachedLinks,
	cacheImg,
];

/**
 * @description resources to be
 * cached
 */

 let links = [
				'/',
				'restaurant.html',
				'service/main.js',
				'service/index.css',
				'service/restaurant.css',
				'service/rest.js',
				'manifest.json',
			];

/**
 * @description cache resources
 * Event
 */

self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(cachedLinks).then(function(cache) {
			return cache.addAll(links);		
		})
		);
});

/**
 * @description delete unneeded cache
 * when sw is activated.
 */

self.addEventListener('activate', function(event) {
	event.waitUntil(
		caches.keys().then(function(key) {
			return Promise.all(
				key.filter(function(item) {
							return !allCaches.includes(item);				
						}).map(function(deletes){
							return caches.delete(deletes)
						})
				);
		})		 
		);
});

/**
 * @description delete unneeded cache
 * when sw is activated.
 */

self.addEventListener('fetch', function(event) {
	let url = new URL(event.request.url);
	if(url.pathname.endsWith('.jpg')) {
		event.respondWith(servePhoto(event.request));
		return;
	}
	event.respondWith(
		caches.match(event.request, {'ignoreSearch': true} ).then(function(response) {
	        return response ? response : fetch(event.request);
		})
		);
});

/**
 * @description cache photos and serve 
 * 'em from network.
 */

function servePhoto(request) {
	let storageUrl = request.url.replace(/-(.+)/, '');
	return caches.open(cacheImg).then(function(cache){
		return cache.match(storageUrl).then(function(response) {
			if(response) return response;
			return fetch(request).then(function(network) {
				cache.put(storageUrl , network.clone());
				return network;
			});
		});
	});
}

/**
 * @description Skip waiting.
 */

self.addEventListener('message', function(event) {
	if(event.data.action == 'skipWaiting') {
		self.skipWaiting();
	}
});