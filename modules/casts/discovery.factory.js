// DISCOVERY FACTORY
// -----------------

// Runs in the background while the entire application 
// is working.  It will poll the cast-central-service 
// to see the current state and if any new casting 
// devices have entered the network.

(function(){
    'use-strict';

    angular
        .module('cast-central-web.casts')
        .factory('DiscoveryFactory', [
            '$log', '$interval', '$cacheFactory', 'CONSTANTS', 
            'CastCentralServiceFactory', DiscoveryFactory
        ]);

    function DiscoveryFactory($log, $interval, $cacheFactory, CONSTANTS, CastCentralServiceFactory){
        var self = this;

        self.chromecasts = $cacheFactory('chromecasts');
        self.rokus       = $cacheFactory('rokus');
        self.others      = $cacheFactory('others');

        // Start the casts discover'er by default
        start_discovering();

        return({
            'clear': clear,
            'cache': cache,
            'start': start_discovering,
            'stop': stop_discovering
        });

        // Stop the interval polling of available casts.
        function stop_discovering(){ $interval.cancel(self.interval); }

        // Start polling for available casts.
        function start_discovering(){
            self.interval = $interval.setInterval(function(){
                discover();
            }, CONSTANTS.POLLING_INTERVAL * 1000);
        }

        // Clears the local cache of discovered casts.
        function clear(){
            self.chromecasts.removeAll();
            self.rokus.removeAll();
            self.others.removeAll();
        }

        // Returns a hash map of each caches contents 
        // as a snapshot of the current cast caches.
        function cache(){
            return({
                'chromecasts': self.chromecasts,
                'rokus': self.rokus,
                'others': self.others
            });
        }

        // Tells the cast-central-service to search the 
        // network for any chromecast or roku or else? 
        // casting devices on the network.  Then query 
        // the current status of the device keeping the 
        // results in a cache.
        function discover(){
            $log.debug('discovering casting devices');

            // Chromecast
            CastCentralServiceFactory.list('chromecast', {
                'protocol': 'MDNS' // TODO: Also use SSDP?
            }, function(data, error){ handle_discover('chromecasts', data, error); });
        }

        // Handles the cast-central-service GET list response and 
        // adds the casts returned to the appropriate cache.
        function handle_discover(type, data, error){
            if(typeof error === 'undefined' || error === null || data.success){
                var casts = data[type];
                var cache = self[type];

                for(var cast in casts){
                    if(typeof cache.get(casts[cast].name === 'undefined')){
                        cache.put(casts[cast].name, casts[cast]);
                    }else{
                        cache.remove(casts[cast].name);
                        cache.put(casts[cast].name, casts[cast]);
                    }
                }
            }else{
                $log.error('Error:', data.message);
            }
        }
    }
})();
