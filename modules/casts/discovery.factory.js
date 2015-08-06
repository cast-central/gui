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
            '$log', '$interval', 'CONSTANTS', 
            'CastCentralServiceFactory', DiscoveryFactory
        ]);

    function DiscoveryFactory($log, $interval, CONSTANTS, CastCentralServiceFactory){
        var self = this;

        // Caches - TODO: Age the casts off if haven't been updated after x seconds
        self.chromecasts = {};

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
            self.chromecasts = {};
        }

        // Returns a hash map of each caches contents 
        // as a snapshot of the current cast caches.
        function cache(){
            return({
                'chromecasts': self.chromecasts
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
            CastCentralServiceFactory.list('chromecast', {}, function(data, error){
                handle_discover('chromecasts', data, error);
            });
        }

        // Handles the cast-central-service GET list response and 
        // adds the casts returned to the appropriate cache.  Send 
        // the appropriate event to the added subscribers.
        function handle_discover(type, data, error){
            if(typeof error === 'undefined' || error === null && data.success){
                var casts = data[type];
                var cache = self[type];

                for(var cast in casts){
                    if(typeof cache[casts[cast].name] === 'undefined')){
                        cache[casts[cast].name] = casts[cast];
                    }else{
                        cache[casts[cast].name] = casts[cast];
                    }
                }
            }else{
                $log.error('Error:', data.message);
            }
        }
    }
})();
