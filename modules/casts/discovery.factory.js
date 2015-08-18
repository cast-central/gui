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
        $log.log('DiscoveryFactory - initializing');

        // Stop the interval polling of available casts.
        var stop_discovering = function(){ $interval.cancel(self.interval); };

        // Start polling for available casts.
        var start_discovering = function(){
            interval = $interval(function(){
                $log.debug('DiscoveryFactory - discovering');
                discover();
                $log.debug('DiscoveryFactory - discovered:', cache);
            }, CONSTANTS.POLLING_INTERVAL * 1000);
        };

        // Clears the local cache of discovered casts.
        var clear = function(){
            cache.chromecast = {};
        };

        // Tells the cast-central-service to search the 
        // network for any chromecast or roku or else? 
        // casting devices on the network.  Then query 
        // the current status of the device keeping the 
        // results in a cache.
        var discover = function(){
            // Chromecast
            CastCentralServiceFactory.list('chromecast', {
                'protocol': 'mdns'
            }).then(function(results){
                handle_discover('chromecast', results);
            }, function(error){
                $log.error(error);
            });
        };

        // Handles the cast-central-service GET list response and 
        // adds the casts returned to the appropriate cache after 
        // obtaining the casting devices status.
        var handle_discover = function(type, data){
            $log.debug(data);
            if(data.success === true){
                var casts = data[type];
                cache[type] = {};

                // Loop through and get the current status of each 
                // cast.
                for(var cast in casts){
                    cache[type][casts[cast].name] = casts[cast];

                    // Get the current status of the cast
                    CastCentralServiceFactory.status(type, {
                        'name': casts[cast].name
                    }).then(function(status){
                        if(status.success === true){
                            cache[type][casts[cast].name].status = status;
                        }else{
                            cache[type][casts[cast].name].status = status.message;
                        }
                    }, function(error){
                        $log.error(error);
                    });
                }
            }else{
                $log.error(data.message);
            }
        };

        // Data tied to controllers
        var cache = {
            'chromecast': {}
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
