// CASTS FACTORY
// -------------

// The base factory for communicating with the 
// cast-central-service.  Gives the ability to 
// specify 'DEV' mode such that testing can 
// be done where the cast-central-service may 
// not be available.

(function(){
    'use-strict';

    angular
        .module('cast-central-web.casts')
        .factory('CastCentralServiceFactory', [
            '$log', '$http', '$interval', 'CONSTANTS', CastCentralServiceFactory
        ]);

    function CastCentralServiceFactory($log, $http, $interval, CONSTANTS){
        // 'Real' service interaction
        var service = {
            'list': list,
            'launch': launch,
            'load': load,
            'setVolume': setVolume,
            'setMute': setMute,
            'seek': seek,
            'stop': stop,
            'status': status,
            'connect': connect
        };

        return(service);

        // Core services of cast-central-service
        function list(type, options, cb){ query(get_url(type, 'list', options), cb); }
        function launch(type, options, cb){ query(get_url(type, 'launch', options), cb); }
        function load(type, options, cb){ query(get_url(type, 'load', options), cb); }
        function setVolume(type, options, cb){ query(get_url(type, 'setVolume', options), cb); }
        function setMute(type, options, cb){ query(get_url(type, 'setMute', options), cb); }
        function seek(type, options, cb){ query(get_url(type, 'seek', options), cb); }
        function stop(type, options, cb){ query(get_url(type, 'stop', options), cb); }
        function status(type, options, cb){ query(get_url(type, 'status', options), cb); }
        function connect(type, options, cb){ query(get_url(type, 'connect', options), cb); }

        // Standard ASYNC call to RESTful server calling 
        // callback with data or error responses.
        function query(url, cb){
            $http({
                method: 'GET',
                url: url
            }).then(function(data){
                cb(data.data, null);
            }, function(error){
                cb(null, error);
            });
        }

        // Formats the proper GET URL for the cast-central-service 
        // to understand it.
        function get_url(type, action, options){
            return(
                CONSTANTS.API_URL +
                '/' + type +
                '/' + action +
                serialize(options)
            );
        }

        // Serializes a hashed object into query 
        // fields for GET requests.
        function serialize(options){
            var current = 0;
            var length = options.length;
            var serialized = "";

            for(var key in options){
                if(typeof options[key] !== 'undefined' && options[key] !== null){
                    if(current === 0){ // First
                        serialized += "?";
                    }else if(current !== length){ // Not last
                        serialized += "&";
                    }
                    serialized += key+"="+options[key];
                    current++;
                }
            }

            $log.debug('serialized', options, 'to "', serialized, '"');
            return(serialized);
        }
    }
})();
