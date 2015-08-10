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
            '$rootScope', '$log', '$interval', 'CONSTANTS',
            'CastCentralServiceFactory', DiscoveryFactory
        ]);

    function DiscoveryFactory($rootScope, $log, $interval, CONSTANTS, CastCentralServiceFactory){
        $log.log('DiscoveryFactory - initializing');

        // Stop the interval polling of available casts.
        var stop_discovering = function(){ $interval.cancel(self.interval); };

        // Start polling for available casts.
        var start_discovering = function(){
            interval = $interval(function(){
                $log.debug('DiscoveryFactory - discovering');
                discover();
                $log.debug('DiscoveryFactory -', cache);
            }, CONSTANTS.POLLING_INTERVAL * 1000);
        };

        // Clears the local cache of discovered casts.
        var clear = function(){
            cache.chromecasts = {};
        };

        // Tells the cast-central-service to search the 
        // network for any chromecast or roku or else? 
        // casting devices on the network.  Then query 
        // the current status of the device keeping the 
        // results in a cache.
        var discover = function(){
            $log.debug('discovering casting devices');

            // Chromecast
            CastCentralServiceFactory.list('chromecast', {}, function(data, error){
                handle_discover('chromecasts', data, error);
            });
        };

        // Handles the cast-central-service GET list response and 
        // adds the casts returned to the appropriate cache.  Send 
        // the appropriate event to the added subscribers.
        var handle_discover = function(type, data, error){
            if((typeof error === 'undefined' || error === null) && data.success === true){
                var casts = data[type];
                cache[type] = {};

                // Update cache
                for(var cast in casts){
                    cache[type][casts[cast].name] = casts[cast];
                }

                // Notify subscribers
                $rootScope.$emit('discovery', cache);
            }else{
                $log.error('Error:', error);
            }
        };

        // Data tied to views
        var cache = {
            'chromecasts': {}
        };

        // Start the casts discover'er by default
        var interval = null;
        start_discovering();

        return({
            'clear': clear,
            'start': start_discovering,
            'stop': stop_discovering,
            'cache': cache
        });

        $log.log('DiscoveryFactory - initialized');
    };
})();
