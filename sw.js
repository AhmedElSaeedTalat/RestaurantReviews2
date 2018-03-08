var cachedLinks ='cache';
var cacheImg ='images';
var allCaches = [
	cachedLinks,
	cacheImg,
];

 var links = [
				'/',
				'css/styles.css',
				'https://fonts.gstatic.com/s/sourcesanspro/v11/6xK3dSBYKcSV-LCoeQqfX1RYOo3qOK7l.woff2',
				'js/dbhelper.js',
				'js/restaurant_info.js',
				'js/serviceWorker.js',
				'https://fonts.googleapis.com/css?family=Source+Sans+Pro',
				'js/main.js',
				'data/restaurants.json',
				'sw.js',
				'/fontawesome-free-5.0.8/fontawesome-free-5.0.8/svg-with-js/js/fontawesome-all.js'

			];
rest = [];
for(let i = 0 ; i <= 10 ; i++) {
	rest.push(`/restaurant.html?id=${i}`);
}
cacheUrls = rest.concat(links);

self.addEventListener('install', function(event){
	event.waitUntil(
		caches.open(cachedLinks).then(function(cache){
			return cache.addAll(cacheUrls);		
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
		caches.match(event.request).then(function(response){
			return response || fetch(event.request);
		})
		);
});



function servePhoto(request) {
	var storageUrl = request.url.replace(/.jpg$/, '');
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


self.addEventListener('message', function(event) {
	if(event.data.action == 'skipWaiting') {
		self.skipWaiting();
	}
})