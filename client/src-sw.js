const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst, StaleWhileRevalidate } = require('workbox-strategies');
const { registerRoute, setDefaultHandler, setCatchHandler } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute, matchPrecache } = require('workbox-precaching');

precacheAndRoute(self.__WB_MANIFEST); //cachefirst that checks precache to update
//first then ries network if there is a caching route error

//caches pages
const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({ //creates data for user to use 
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

//route for cached pages
registerRoute(({ request }) => request.mode === 'navigate', pageCache);


//route if other pages are not able to load
const offlineStrategy = new CacheFirst();

warmStrategyCache({ //creates data for user to use 
  urls: ['/offline.html'],
  strategy: offlineStrategy,
});

setDefaultHandler( new StaleWhileRevalidate());

setCatchHandler( async ({ request }) => {
switch( request.destination) {
  case 'document':
    return matchPrecache(offline.html);
  
  default:
    return Response.error();

}
});



// TODO: Implement asset caching
//implemet asset caching in PWA  
//route to cache resources and assets
// Set up asset cache
registerRoute(
  //indicates whih assets to cache
  ({ request }) => ['style', 'script', 'worker', 'manifest','serviceworker'].includes(request.destination), //destination returna string describing content being requested
  new CacheFirst({
    
    cacheName: 'asset-cache',
    plugins: [
      // This plugin will cache responses with these headers to a maximum-age of 30 days
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxAgeSeconds: 30 * 24 * 60 * 60,
      }),
    ],
  })
);




//keyword search of caching within docs -> video results



registerRoute();

