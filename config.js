'use-strict';

(function(){
  angular
  	.module('cast-central-web')
    .constant('CONSTANTS', {
    	'DEV': true,
    	'API_URL': 'localhost:8000/v1',
    	'POLLING_INTERVAL': 1 // Seconds
    });
})();
