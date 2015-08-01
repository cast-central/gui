'use-strict';

(function(){
    angular
        .module('cast-central-web')
        .factory('CastFactory', [
            '$log', '$http', 'CONSTANTS', CastFactory
        ]);

    function CastFactory($log, $http, CONSTANTS){
        // 'Real' service interaction
        var service = {
            'list': list,
            'launch': launch,
            'load': load,
            'setVolume': setVolume,
            'setMute': setMute,
            'seek': seek,
            'stop': stop
        };

        // Canned responses
        var devService = {
            'list': devList,
            'launch': dev,
            'load': dev,
            'setVolume': dev,
            'setMute': dev,
            'seek': dev,
            'stop': dev
        };

        return(CONSTANTS.DEV? devService: service);

        function list(url, params, cb){  }
        function launch(url, params, cb){  }
        function load(url, params, cb){  }
        function setVolume(url, params, cb){  }
        function setMute(url, params, cb){  }
        function seek(url, params, cb){  }
        function stop(url, params, cb){  }

        // Universal method for DEV mode which switches 
        // between error responses and success responses.
        function devList(url, params, cb){ dev(url, params, cb, true); }
        function dev(url, params, cb, list){
            if(Math.floor(Math.random() * 10) > 2){
                if(list || false){
                    query('/data/chromecasts_list.json', "", cb);
                }else{
                    query('/data/api_success.json', "", cb);
                }
            }else{
                query('/data/api_error.json', "", cb);
            }
        }

        // Standard ASYNC call to RESTful server calling 
        // callback with data or error responses.
        function query(url, params, cb){
            $http({
                method: 'GET',
                url: url,
                params: params
            }).then(function(data){
                cb(data.data, null);
            }, function(error){
                cb(null, error);
            });
        }
    }
})();
