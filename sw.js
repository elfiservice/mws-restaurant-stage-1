let staticCacheName = 'restaurants-static-v1';

self.addEventListener('install', event => {
    console.log('installing  ' + staticCacheName);
  
    // cache a cat SVG
    event.waitUntil(
        caches.open(staticCacheName).then(function(cache) {

            let arrayToCache = [
                '/',
                'js/main.js',
                'js/dbhelper.js',
                'js/restaurant_info.js',
                'css/styles.css',
                'data/restaurants.json'
            ];

            let cacheToReturn;
            fetch(`data/restaurants.json`)
            .then(response => response.json())
            .then(function(arrayData) {

                for(let i = 0; i < arrayData.restaurants.length; i++) {
                    arrayToCache.push(`img/${i + 1}.jpg`);
                    arrayToCache.push(`restaurant.html?id=${i + 1}`);
                }
                return arrayToCache;
            })
            .then(function(r) {
                cacheToReturn =  cache.addAll(r);
            })
            .catch(err => requestError(err));

            return cacheToReturn;
          })
    );
  });

  self.addEventListener('fetch', function(event) {
    // TODO: respond to requests for the root page with
    // the page skeleton from the cache

    // const normalizedUrl = new URL(event.request.url);
    // console.log(normalizedUrl);

  
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
  });
  