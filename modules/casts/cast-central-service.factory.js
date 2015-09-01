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
            '$log', '$http', '$q', '$interval', 'CONSTANTS', 
            'CommonFactory', CastCentralServiceFactory
        ]);

    function CastCentralServiceFactory($log, $http, $q, $interval, CONSTANTS, CommonFactory){
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
        function list(type, options){      return(query(get_url(type, 'list', options))); }
        function launch(type, options){    return(query(get_url(type, 'launch', options))); }
        function load(type, options){      return(query(get_url(type, 'load', options))); }
        function setVolume(type, options){ return(query(get_url(type, 'setVolume', options))); }
        function setMute(type, options){   return(query(get_url(type, 'setMute', options))); }
        function seek(type, options){      return(query(get_url(type, 'seek', options))); }
        function stop(type, options){      return(query(get_url(type, 'stop', options))); }
        function status(type, options){    return(query(get_url(type, 'status', options))); }
        function connect(type, options){   return(query(get_url(type, 'connect', options))); }

        // Standard ASYNC call to RESTful server calling 
        // callback with data or error responses.
        function query(url){
            return($q(function(resolve, reject){
                $http({
                    method: 'GET',
                    url: url
                }).then(function(data){
                    CommonFactory.set_connected(true);
                    CommonFactory.set_timestamp(new Date());
                    resolve(data.data);
                }, function(error){
                    CommonFactory.set_connected(false);
                    reject(error);
                });
            }));
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
