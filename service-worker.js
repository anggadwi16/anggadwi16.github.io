importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox){
	console.log(`workbox berhasil dimuat`);
}else{
	console.log(`workbox gagal dimuat`);
}

workbox.precaching.precacheAndRoute([
	{url : '/nav.html', revision: '1'},
	{url : '/index.html', revision: '1'},
	{url : '/css/materialize.min.css', revision: '1'},
	{url : '/css/style.css', revision: '1'},
	{url : '/manifest.json', revision: '1'},
	{url : '/img/icon.png', revision: '1'},
	{url : '/img/apple-touch-icon-180x180.png', revision: '1'},
	{url : '/img/pwa-192x192.png', revision: '1'},
	{url : '/img/pwa-512x512.png', revision: '1'},
	{url : '/img/pwa-192x192.png', revision: '1'},
	{url : '/js/materialize.min.js', revision: '1'},
	{url : '/js/api.js', revision: '1'},
	{url : '/js/db.js', revision: '1'},
	{url : '/js/idb.js', revision: '1'},
	{url : '/js/nav.js', revision: '1'},
	{url : 'https://fonts.googleapis.com/icon?family=Material+Icons', revision: '1'},


	
]);

workbox.routing.registerRoute(
	new RegExp('/pages/'),
	workbox.strategies.staleWhileRevalidate({
		cacheName : 'pages'
	})
);

let base_url = "https://api.football-data.org/";

workbox.routing.registerRoute(
  new RegExp(base_url),
  workbox.strategies.staleWhileRevalidate({
      cacheName: 'api'
  })
);


self.addEventListener('push', function(event){

	let body;

	if(event.data){
		body = event.data.text();
	}else{
		body = "Push message no payload";
	}

	let options = {

		body: body,
		icon: 'icon.png',
		vibrate : [100,50,100],
		data : {
			dateOfArrival : Date.now(),
			primaryKey : 1
		}
	};

	event.waitUntil(

		self.registration.showNotification("Push Notification", options)
	);

});