var cachedLinks ='caches';
var cacheImg ='images';
var allCaches = [
	cachedLinks,
	cacheImg,
];

 var links = [
				'/',
				'restaurant.html',
				'service/main.js',
				'service/main.css',
				'service/restaurant.css',
				'service/rest.js',
				'manifest.json',
			];

/**
 * cache resources
 */

self.addEventListener('install', function(event){
	event.waitUntil(
		caches.open(cachedLinks).then(function(cache){
			return cache.addAll(links);		
		})
		
		);
	
});

/**
 * delete unneeded cache when sw is activated.
 */

self.addEventListener('activate', function(event){
	event.waitUntil(
		caches.keys().then(function(key){
			return Promise.all(
				key.filter(function(item){
							return !allCaches.includes(item);				
						}).map(function(deletes){
							return caches.delete(deletes)
						})
				);
		})		 
		);
});

/**
 * delete unneeded cache when sw is activated.
 */

self.addEventListener('fetch', function(event) {
	var url = new URL(event.request.url);
	if(url.pathname.endsWith('.jpg')) {
		event.respondWith(servePhoto(event.request));
		return;
	}
	event.respondWith(
		caches.match(event.request, {'ignoreSearch': true} ).then(function(response){
			  if (response) {
		          return response;
		        }
		        return fetch(event.request);
		      
		})
		);
});

/**
 * cache photos and serve 'em from network.
 */

function servePhoto(request) {
	var storageUrl = request.url.replace(/-(.+)/, '');
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
 * Skip waiting.
 */

self.addEventListener('message', function(event) {
	if(event.data.action == 'skipWaiting') {
		self.skipWaiting();
	}
})