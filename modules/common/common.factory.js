// COMMON
// ------

// Contains common variables that 
// will be available throughout the 
// entire context of the application.

(function(){
    'use-strict';

    angular
        .module('cast-central-web.common')
        .factory('CommonFactory', [ CommonFactory ]);

    function CommonFactory(){
        var connected = false;
        var timestamp = new Date();

        function set_connected(val){ connected = val; }
        function set_timestamp(val){ timestamp = val; }

        return({
            'connected': connected,
            'set_connected': set_connected,
            'timestamp': timestamp,
            'set_timestamp': set_timestamp
        });
    };
})();
